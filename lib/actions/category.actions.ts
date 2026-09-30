'use server'

import { revalidatePath } from 'next/cache'
import Category from '../models/category.model'
import { connectToDatabase } from '../mongoose'

export interface ICategory {
	_id: string
	title: string
	slug: string
	image: string | null
	description?: string // YANGLIK
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
	} catch (error: unknown) {
		throw new Error(`Kategoriya yaratishda xatolik: ${error instanceof Error ? error.message : String(error)}`)
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
	} catch (error: unknown) {
		throw new Error(`Kategoriya tahrirlashda xatolik: ${error instanceof Error ? error.message : String(error)}`)
	}
}

// 3. YANGLIK: Barcha kategoriyalarni olish (Qidiruv imkoniyati bilan)
export async function getCategories({ query = '' }: { query?: string }) {
	try {
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
	} catch (error: unknown) {
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
	} catch (error: unknown) {
		throw new Error(`Kategoriya o'chirishda xatolik: ${error instanceof Error ? error.message : String(error)}`)
	}
}
