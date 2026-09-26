'use server'

import User from '@/lib/models/user.model'
import { connectToDatabase } from '@/lib/mongoose'

export type CreateUserParams = {
	clerkId: string
	email: string
	username: string | null
	firstName: string | null
	lastName: string | null
	photo: string
}

export type UpdateUserParams = {
	username: string | null
	firstName: string | null
	lastName: string | null
	photo: string
}

// Yangi foydalanuvchi yaratish
export async function createUser(user: CreateUserParams) {
	try {
		await connectToDatabase()
		const newUser = await User.create(user)
		return JSON.parse(JSON.stringify(newUser))
	} catch (error: unknown) {
		console.error('MONGODB GA YOZISHDA XATOLIK:', error)
		throw new Error(
			`Foydalanuvchini yaratishda xatolik: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}

// Foydalanuvchi ma'lumotlarini yangilash
export async function updateUser(clerkId: string, user: UpdateUserParams) {
	try {
		await connectToDatabase()
		const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
			new: true,
		})
		return JSON.parse(JSON.stringify(updatedUser))
	} catch (error: unknown) {
		console.error('MONGODB NI YANGILASHDA XATOLIK:', error)
		throw new Error(
			`Foydalanuvchini yangilashda xatolik: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}

// Foydalanuvchini o'chirish (Tuzatildi: Agar topilmasa xato tashlamaydi)
export async function deleteUser(clerkId: string) {
	try {
		await connectToDatabase()
		const userToDelete = await User.findOne({ clerkId })

		if (!userToDelete) {
			console.log(
				"O'chiriladigan foydalanuvchi bazadan topilmadi (allaqachon o'chirilgan):",
				clerkId,
			)
			return null
		}

		const deletedUser = await User.findByIdAndDelete(userToDelete._id)
		return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
	} catch (error: unknown) {
		console.error("MONGODB DAN O'CHIRISHDA XATOLIK:", error)
		throw new Error(
			`Foydalanuvchini o'chirishda xatolik: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}
