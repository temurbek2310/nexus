'use server'

import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import { connection } from 'next/server'
import Coupon from '../models/coupon.model'
import { connectToDatabase } from '../mongoose'

export interface ICoupon {
	_id: string
	code: string
	type: 'Foyiz' | 'Summa'
	value: number
	usageCount: number
	usageLimit: number | null
	expiryDate: string // ISO format
	status: 'Faol' | "Muddat o'tgan" | "To'xtatilgan"
}

// Barcha kuponlarni olish
export async function getCoupons(): Promise<ICoupon[]> {
	noStore() // 2. Bu yerda chaqiramiz: Next.js endi bu qismni keshlamaydi va prerender qilmaydi!

	try {
		await connection()
		await connectToDatabase()
		const coupons = await Coupon.find().sort({ createdAt: -1 })

		// Sanani tekshirib, muddati o'tganlarni avtomatik belgilash logikasi
		const now = new Date()
		for (let coupon of coupons) {
			if (new Date(coupon.expiryDate) < now && coupon.status === 'Faol') {
				coupon.status = "Muddat o'tgan"
				await coupon.save()
			}
		}

		return JSON.parse(JSON.stringify(coupons))
	} catch (error) {
		console.error('Kuponlarni olishda xatolik:', error)
		return []
	}
}

// Yangi kupon yaratish
export async function createCoupon(data: Partial<ICoupon>) {
	try {
		await connectToDatabase()
		const newCoupon = await Coupon.create(data)
		revalidatePath('/admin/coupons')
		return JSON.parse(JSON.stringify(newCoupon))
	} catch (error: unknown) {
		throw new Error(`Kupon yaratishda xatolik: ${error instanceof Error ? error.message : String(error)}`)
	}
}

// Kuponni tahrirlash
export async function updateCoupon(id: string, data: Partial<ICoupon>) {
	try {
		await connectToDatabase()
		const updatedCoupon = await Coupon.findByIdAndUpdate(id, data, {
			new: true,
		})
		revalidatePath('/admin/coupons')
		return JSON.parse(JSON.stringify(updatedCoupon))
	} catch (error: unknown) {
		throw new Error(`Kupon tahrirlashda xatolik: ${error instanceof Error ? error.message : String(error)}`)
	}
}

// Kuponni o'chirish
export async function deleteCoupon(id: string) {
	try {
		await connectToDatabase()
		await Coupon.findByIdAndDelete(id)
		revalidatePath('/admin/coupons')
	} catch (error: unknown) {
		throw new Error(`Kupon o'chirishda xatolik: ${error instanceof Error ? error.message : String(error)}`)
	}
}
