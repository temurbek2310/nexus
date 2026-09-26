'use server'

import User from '@/lib/models/user.model'
import { connectToDatabase } from '@/lib/mongoose'

// Yangi foydalanuvchi yaratish
export async function createUser(user: any) {
	try {
		await connectToDatabase()
		const newUser = await User.create(user)
		return JSON.parse(JSON.stringify(newUser))
	} catch (error) {
		console.log(error)
	}
}

// Foydalanuvchi ma'lumotlarini yangilash
export async function updateUser(clerkId: string, user: any) {
	try {
		await connectToDatabase()
		const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
			new: true,
		})
		return JSON.parse(JSON.stringify(updatedUser))
	} catch (error) {
		console.log(error)
	}
}

// Foydalanuvchini o'chirish
export async function deleteUser(clerkId: string) {
	try {
		await connectToDatabase()
		const userToDelete = await User.findOne({ clerkId })

		if (!userToDelete) {
			throw new Error('Foydalanuvchi topilmadi')
		}

		const deletedUser = await User.findByIdAndDelete(userToDelete._id)
		return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
	} catch (error) {
		console.log(error)
	}
}
