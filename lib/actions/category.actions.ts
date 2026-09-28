'use server'

import { revalidatePath } from 'next/cache'
import { connection } from 'next/server'
import Category from '../models/category.model'
import { connectToDatabase } from '../mongoose'

export interface ICategory {
	_id: string
	title: string
	slug: string
	image: string | null
	productCount: number
	status: 'Faol' | 'Faol emas'
}

// 1. Yangi kategoriya yaratish (Sizda bor)
export async function createCategory(data: Partial<ICategory>) {
	try {
		await connectToDatabase()
		const newCategory = await Category.create(data)
		revalidatePath('/admin/categories')
		return JSON.parse(JSON.stringify(newCategory))
	} catch (error: any) {
		throw new Error(`Kategoriya yaratishda xatolik: ${error.message}`)
	}
}

// 2. Kategoriyani tahrirlash (Sizda bor)
export async function updateCategory(id: string, data: Partial<ICategory>) {
	try {
		await connectToDatabase()
		const updatedCategory = await Category.findByIdAndUpdate(id, data, {
			new: true,
		})
		revalidatePath('/admin/categories')
		return JSON.parse(JSON.stringify(updatedCategory))
	} catch (error: any) {
		throw new Error(`Kategoriya tahrirlashda xatolik: ${error.message}`)
	}
}

// 3. YANGLIK: Barcha kategoriyalarni olish (Qidiruv imkoniyati bilan)
export async function getCategories({ query = '' }: { query?: string }) {
	try {
		await connection() // Next.js 16 dynamic render
		await connectToDatabase()

		const searchFilter = query
			? {
					$or: [
						{ title: { $regex: query, $options: 'i' } },
						{ slug: { $regex: query, $options: 'i' } },
					],
				}
			: {}

		const categories = await Category.find(searchFilter).sort({ createdAt: -1 })

		return JSON.parse(JSON.stringify(categories)) as ICategory[]
	} catch (error) {
		console.error('Kategoriyalarni olishda xatolik:', error)
		return []
	}
}

// 4. YANGLIK: Kategoriyani o'chirish
export async function deleteCategory(id: string) {
	try {
		await connectToDatabase()
		await Category.findByIdAndDelete(id)
		revalidatePath('/admin/categories')
	} catch (error: any) {
		throw new Error(`Kategoriya o'chirishda xatolik: ${error.message}`)
	}
}
