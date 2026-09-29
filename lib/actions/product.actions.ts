'use server'

import { revalidatePath } from 'next/cache'
import Category from '../models/category.model'
import Product from '../models/product.model'
import { connectToDatabase } from '../mongoose'

export interface IProduct {
	_id: string
	title: string
	category: string // Kategoriya ID si keladi
	price: number
	discountPrice: number | null
	stock: number // YANGLIK
	description: string
	images: string[]
	specs: { key: string; value: string }[]
	status: 'Faol' | 'Qolmagan' | 'Qoralama'
}

// 1. Yangi mahsulot yaratish
export async function createProduct(data: Partial<IProduct>) {
	try {
		await connectToDatabase()
		const newProduct = await Product.create(data)

		// Kafolatlangan Kategoriya yangilanishi
		if (data.category) {
			const categoryId = data.category.toString() // ID ekanligiga ishonch hosil qilamiz
			await Category.findByIdAndUpdate(
				categoryId,
				{ $inc: { productCount: 1 } },
				{ new: true }, // Yangilangan holatini kutamiz
			)
		}

		revalidatePath('/admin/products')
		revalidatePath('/admin/categories') // Kategoriyalar jadvalini yangilash

		return JSON.parse(JSON.stringify(newProduct))
	} catch (error: any) {
		throw new Error(`Mahsulot yaratishda xatolik: ${error.message}`)
	}
}

// 2. Mahsulotni tahrirlash
export async function updateProduct(id: string, data: Partial<IProduct>) {
	try {
		await connectToDatabase()

		// 1. Tahrirlashdan oldin eski mahsulot ma'lumotini topib olamiz
		const oldProduct = await Product.findById(id)

		// 2. Ma'lumotlarni yangilaymiz
		const updatedProduct = await Product.findByIdAndUpdate(id, data, {
			new: true,
		})

		// 3. Agar kategoriya O'ZGARGAN bo'lsa, eskisidan 1 ni olib, yangisiga 1 qo'shamiz
		if (
			oldProduct &&
			data.category &&
			oldProduct.category.toString() !== data.category.toString()
		) {
			// Eskisini kamaytiramiz
			await Category.findByIdAndUpdate(oldProduct.category, {
				$inc: { productCount: -1 },
			})

			// Yangisiga qo'shamiz
			await Category.findByIdAndUpdate(data.category, {
				$inc: { productCount: 1 },
			})
		}

		revalidatePath('/admin/products')
		revalidatePath('/admin/categories')

		return JSON.parse(JSON.stringify(updatedProduct))
	} catch (error: any) {
		throw new Error(`Mahsulot tahrirlashda xatolik: ${error.message}`)
	}
}

// 3. Barcha mahsulotlarni qidiruv bilan olish
export async function getProducts({ query = '' }: { query?: string }) {
	try {
		await connectToDatabase()

		const searchFilter = query
			? { title: { $regex: query, $options: 'i' } }
			: {}

		const products = await Product.find(searchFilter)
			.populate({ path: 'category', select: 'title slug' })
			.sort({ createdAt: -1 })

		return JSON.parse(JSON.stringify(products))
	} catch (error) {
		console.error('Mahsulotlarni olishda xatolik:', error)
		return []
	}
}

// 4. Mahsulotni o'chirish
export async function deleteProduct(id: string) {
	try {
		await connectToDatabase()

		const productToDelete = await Product.findById(id)

		if (!productToDelete) {
			throw new Error('Mahsulot topilmadi!')
		}

		// Kafolatlangan kamaytirish
		if (productToDelete.category) {
			const categoryId = productToDelete.category.toString()
			// $max operatori orqali productCount hech qachon 0 dan pastga tushib ketmasligini ta'minlaymiz (minus bo'lib ketmasligi uchun)
			await Category.findByIdAndUpdate(categoryId, {
				$inc: { productCount: -1 },
			})

			// Xavfsizlik: 0 dan kichik bo'lsa 0 qilib qo'yish
			await Category.updateOne(
				{ _id: categoryId, productCount: { $lt: 0 } },
				{ $set: { productCount: 0 } },
			)
		}

		await Product.findByIdAndDelete(id)

		revalidatePath('/admin/products')
		revalidatePath('/admin/categories')
	} catch (error: any) {
		throw new Error(`Mahsulot o'chirishda xatolik: ${error.message}`)
	}
}
