'use server'

import { revalidatePath } from 'next/cache'
import { connection } from 'next/server'
import User from '../models/user.model' // Siz bergan User modeli
import { connectToDatabase } from '../mongoose'

export interface IUser {
	_id: string
	clerkId: string
	email: string
	username?: string
	firstName?: string
	lastName?: string
	photo?: string
	role: 'user' | 'admin'
	createdAt: string
}

export async function getUsers({
	query = '',
	page = 1,
	limit = 10,
}: {
	query?: string
	page?: number
	limit?: number
}) {
	try {
		await connection() // Next.js 16 dinamik render
		await connectToDatabase()

		const skip = (page - 1) * limit

		// Qidiruv mantiqi (Ism, familiya, email yoki username bo'yicha qidiradi)
		const searchFilter = query
			? {
					$or: [
						{ firstName: { $regex: query, $options: 'i' } },
						{ lastName: { $regex: query, $options: 'i' } },
						{ email: { $regex: query, $options: 'i' } },
						{ username: { $regex: query, $options: 'i' } },
					],
				}
			: {}

		const users = await User.find(searchFilter)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)

		const totalUsers = await User.countDocuments(searchFilter)
		const totalPages = Math.ceil(totalUsers / limit)

		return {
			users: JSON.parse(JSON.stringify(users)) as IUser[],
			totalPages,
			currentPage: page,
			totalUsers,
		}
	} catch (error) {
		console.error('Foydalanuvchilarni olishda xatolik:', error)
		return { users: [], totalPages: 1, currentPage: 1, totalUsers: 0 }
	}
}

// User rolini o'zgartirish (Admin qilish yoki User ga qaytarish)
export async function toggleUserRole(id: string, currentRole: string) {
	try {
		await connectToDatabase()
		const newRole = currentRole === 'admin' ? 'user' : 'admin'
		await User.findByIdAndUpdate(id, { role: newRole })
		revalidatePath('/admin/users')
	} catch (error: any) {
		throw new Error(`Rolni o'zgartirishda xatolik: ${error.message}`)
	}
}
