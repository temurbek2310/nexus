'use server'

import Order from '@/lib/models/order.model'
import User from '@/lib/models/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apiVersion: '2026-08-26.dahlia' as any,
})

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

		// Dastlabki "Kutilmoqda" statusli buyurtmani yaratish
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
			orderStatus: 'Qabul qilindi',
		})

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(total * 100), // <--- * 100 bo'lishi kerak
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
		console.error('PaymentIntent xatoligi:', error)
		const msg =
			error instanceof Error
				? error.message
				: "To'lovni boshlashda xatolik yuz berdi"
		throw new Error(msg)
	}
}
