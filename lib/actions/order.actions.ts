'use server'

import Order from '@/lib/models/order.model'
import Transaction from '@/lib/models/transaction.model'
import User from '@/lib/models/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

// Stripe API versiyasi uchun xavfsiz yechim
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apiVersion: '2026-08-26.dahlia' as any,
})

// Savatdagi mahsulotlar uchun maxsus interfeys yaratildi (any o'rniga)
interface OrderCartItem {
	id: string
	name: string
	brand: string
	price: number
	quantity: number
	image: string
}

export async function createPaymentIntent({
	addressId,
	cartItems,
	subtotal,
	tax,
	shipping,
	total,
	savings,
}: {
	addressId: string
	cartItems: OrderCartItem[]
	subtotal: number
	tax: number
	shipping: number
	total: number
	savings: number
}) {
	try {
		await connectToDatabase()
		const { userId } = await auth()
		if (!userId) throw new Error("Autentifikatsiyadan o'tilmagan")

		const user = await User.findOne({ clerkId: userId })
		if (!user) throw new Error('Foydalanuvchi topilmadi')

		const newOrder = await Order.create({
			user: user._id,
			address: addressId,
			items: cartItems.map(item => ({
				product: item.id,
				name: item.name,
				brand: item.brand,
				price: item.price,
				quantity: item.quantity,
				image: item.image,
			})),
			subtotal,
			tax,
			shipping,
			total,
			savings,
			paymentStatus: 'Kutilmoqda',
			orderStatus: 'Yangi',
		})

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(total * 100),
			currency: 'usd',
			metadata: {
				orderId: newOrder._id.toString(),
				userId: user._id.toString(),
			},
			automatic_payment_methods: {
				enabled: true,
			},
		})

		newOrder.stripeSessionId = paymentIntent.id
		await newOrder.save()

		return {
			clientSecret: paymentIntent.client_secret,
			orderId: newOrder._id.toString(),
		}
	} catch (error: unknown) {
		// error: any o'rniga error: unknown ishlatildi
		console.error('PaymentIntent xatoligi:', error)
		const msg =
			error instanceof Error
				? error.message
				: "To'lovni boshlashda xatolik yuz berdi"
		throw new Error(msg)
	}
}

export async function completeOrder(orderId: string) {
	try {
		await connectToDatabase()
		const order = await Order.findById(orderId)
		if (!order) throw new Error('Buyurtma topilmadi')

		let transaction = await Transaction.findOne({ order: order._id })

		if (order.paymentStatus !== "To'landi") {
			let receiptUrl = ''
			let cardBrand = ''
			let cardLast4 = ''

			if (order.stripeSessionId) {
				// Expand yordamida to'lov ma'lumotlarini to'liq olamiz
				const paymentIntent = await stripe.paymentIntents.retrieve(
					order.stripeSessionId,
					{
						expand: ['latest_charge'],
					},
				)

				// TypeScript xatosi hal qilindi (charges xatosi olib tashlandi, faqat latest_charge qoldi)
				const charge = paymentIntent.latest_charge as
					| Stripe.Charge
					| string
					| null
					| undefined

				// Agar charge obyekt bo'lsa (string bo'lmasa), uning ichidan kvitansiyani olamiz
				if (charge && typeof charge !== 'string') {
					receiptUrl = charge.receipt_url || ''
					cardBrand = charge.payment_method_details?.card?.brand || ''
					cardLast4 = charge.payment_method_details?.card?.last4 || ''
				}
			}

			order.paymentStatus = "To'landi"
			order.orderStatus = 'Tayyorlanmoqda'
			await order.save()

			transaction = await Transaction.create({
				order: order._id,
				user: order.user,
				stripePaymentIntentId: order.stripeSessionId || 'manual_intent',
				amount: order.total,
				currency: 'usd',
				status: 'success',
				receiptUrl: receiptUrl,
				cardBrand: cardBrand,
				cardLast4: cardLast4,
			})
		}

		return {
			order: JSON.parse(JSON.stringify(order)),
			transaction: JSON.parse(JSON.stringify(transaction)),
		}
	} catch (error: unknown) {
		// error: any o'rniga error: unknown ishlatildi
		console.error('Buyurtmani yakunlashda xatolik:', error)
		const msg =
			error instanceof Error ? error.message : 'Buyurtmani tasdiqlashda xatolik'
		throw new Error(msg)
	}
}
