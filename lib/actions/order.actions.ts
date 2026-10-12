'use server'

import '@/lib/models/address.model'
import Order from '@/lib/models/order.model'
import Transaction from '@/lib/models/transaction.model'
import User from '@/lib/models/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apiVersion: '2026-08-26.dahlia' as any,
})

// ---------------------------------------------
// FOYDALANUVCHILAR (USERS) UCHUN FUNKSIYALAR
// ---------------------------------------------

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
				const paymentIntent = await stripe.paymentIntents.retrieve(
					order.stripeSessionId,
					{ expand: ['latest_charge'] },
				)

				const charge = paymentIntent.latest_charge as
					| Stripe.Charge
					| string
					| null
					| undefined

				if (charge && typeof charge !== 'string') {
					receiptUrl = charge.receipt_url || ''
					cardBrand = charge.payment_method_details?.card?.brand || ''
					cardLast4 = charge.payment_method_details?.card?.last4 || ''
				}
			}

			order.paymentStatus = "To'landi"
			// TO'G'RILANDI: orderStatus uchun Mongoose enum ro'yxatida bor qiymat berildi
			order.orderStatus = 'Qabul qilindi'
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
		console.error('Buyurtmani yakunlashda xatolik:', error)
		const msg =
			error instanceof Error ? error.message : 'Buyurtmani tasdiqlashda xatolik'
		throw new Error(msg)
	}
}

export async function getUserOrders() {
	try {
		await connectToDatabase()
		const { userId } = await auth()

		if (!userId) throw new Error("Autentifikatsiyadan o'tilmagan")

		const user = await User.findOne({ clerkId: userId })
		if (!user) throw new Error('Foydalanuvchi topilmadi')

		const orders = await Order.find({ user: user._id })
			.sort({ createdAt: -1 })
			.populate('address')
			.lean()

		return JSON.parse(JSON.stringify(orders))
	} catch (error) {
		console.error('Buyurtmalarni yuklashda xatolik:', error)
		return []
	}
}

export async function getOrderById(orderId: string) {
	try {
		await connectToDatabase()
		const { userId } = await auth()
		if (!userId) throw new Error("Autentifikatsiyadan o'tilmagan")

		const user = await User.findOne({ clerkId: userId })
		if (!user) throw new Error('Foydalanuvchi topilmadi')

		// Buyurtmani va unga ulangan manzilni (address) olib kelamiz
		const order = await Order.findOne({ _id: orderId, user: user._id })
			.populate('address')
			.populate('user')
			.lean()

		if (!order) return null

		// Buyurtmaga tegishli to'lov cheki va karta ma'lumotlarini olamiz
		const transaction = await Transaction.findOne({ order: order._id }).lean()

		return {
			order: JSON.parse(JSON.stringify(order)),
			transaction: transaction ? JSON.parse(JSON.stringify(transaction)) : null,
		}
	} catch (error) {
		console.error('Buyurtma tafsilotlarini yuklashda xatolik:', error)
		return null
	}
}

// ---------------------------------------------
// ADMINLAR (ADMIN DASHBOARD) UCHUN FUNKSIYALAR
// ---------------------------------------------

export async function getAllOrdersAdmin() {
	try {
		await connectToDatabase()

		const orders = await Order.find()
			.populate('user') // Mijoz ma'lumotlarini olish uchun
			.sort({ createdAt: -1 })
			.lean()

		// Ma'lumotlarni Client formatiga moslash
		const formattedOrders = orders.map((order: any) => {
			let status = order.orderStatus
			if (status === 'Yangi') status = 'Qabul qilindi'
			if (status === 'Tayyorlanmoqda') status = 'Qadoqlanmoqda'

			return {
				id: order._id.toString(),
				customer:
					order.user?.fullName || order.user?.firstName || "Noma'lum mijoz",
				email:
					order.user?.email ||
					order.user?.primaryEmailAddress?.emailAddress ||
					"Noma'lum email",
				date: order.createdAt.toISOString(),
				status: status,
				paymentStatus:
					order.paymentStatus === "To'landi"
						? "To'langan"
						: order.paymentStatus,
				itemsCount: order.items.reduce(
					(acc: number, item: any) => acc + item.quantity,
					0,
				),
				amount: order.total,
			}
		})

		// Statistikalarni hisoblash
		const totalOrders = formattedOrders.length
		const newOrders = formattedOrders.filter(
			o => o.status === 'Qabul qilindi',
		).length
		const shippingOrders = formattedOrders.filter(
			o => o.status === "Yo'lda",
		).length
		const totalRevenue = formattedOrders.reduce(
			(acc, o) => acc + (o.paymentStatus === "To'langan" ? o.amount : 0),
			0,
		)

		return {
			success: true,
			orders: JSON.parse(JSON.stringify(formattedOrders)),
			stats: { totalOrders, newOrders, shippingOrders, totalRevenue },
		}
	} catch (error) {
		console.error('Admin buyurtmalarni yuklashda xatolik:', error)
		return {
			success: false,
			orders: [],
			stats: {
				totalOrders: 0,
				newOrders: 0,
				shippingOrders: 0,
				totalRevenue: 0,
			},
		}
	}
}

export async function updateOrderStatusAdmin(
	orderId: string,
	newStatus: string,
) {
	try {
		await connectToDatabase()

		await Order.findByIdAndUpdate(orderId, { orderStatus: newStatus })

		// UI avtomat yangilanishi uchun keshlarni tozalaymiz
		revalidatePath('/admin/orders')
		revalidatePath(`/admin/orders/${orderId}`)

		return { success: true }
	} catch (error) {
		console.error('Statusni yangilashda xatolik:', error)
		return { success: false, error: "Holatni o'zgartirib bo'lmadi" }
	}
}

export async function getOrderByIdAdmin(orderId: string) {
	try {
		await connectToDatabase()

		// Admin har qanday buyurtmani ko'ra olishi kerak
		const order = await Order.findById(orderId)
			.populate('user') // Mijoz ma'lumotlarini olish
			.populate('address') // Manzil ma'lumotlarini olish
			.lean()

		if (!order) return null

		const transaction = await Transaction.findOne({ order: order._id }).lean()

		let status = order.orderStatus
		if (status === 'Yangi') status = 'Qabul qilindi'
		if (status === 'Tayyorlanmoqda') status = 'Qadoqlanmoqda'
		order.orderStatus = status

		return {
			order: JSON.parse(JSON.stringify(order)),
			transaction: transaction ? JSON.parse(JSON.stringify(transaction)) : null,
		}
	} catch (error) {
		console.error('Admin buyurtmani yuklashda xatolik:', error)
		return null
	}
}
