'use server'

import { revalidatePath } from 'next/cache'
import { connection } from 'next/server'
import User from '../models/user.model'
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

interface CreateUserParams {
	clerkId: string
	email: string
	username?: string
	firstName?: string
	lastName?: string
	photo?: string
}

interface UpdateUserParams {
	username?: string
	firstName?: string
	lastName?: string
	photo?: string
	email?: string
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
		await connection()
		await connectToDatabase()

		const skip = (page - 1) * limit

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
	} catch (error: unknown) {
		console.error('Foydalanuvchilarni olishda xatolik:', error)
		return { users: [], totalPages: 1, currentPage: 1, totalUsers: 0 }
	}
}

export async function toggleUserRole(id: string, currentRole: string) {
	try {
		await connectToDatabase()
		const newRole = currentRole === 'admin' ? 'user' : 'admin'
		await User.findByIdAndUpdate(id, { role: newRole })
		revalidatePath('/admin/users')
	} catch (error: unknown) {
		throw new Error(
			`Rolni o'zgartirishda xatolik: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}

export async function createUser(user: CreateUserParams): Promise<IUser> {
	try {
		await connectToDatabase()
		const newUser = await User.create(user)
		return JSON.parse(JSON.stringify(newUser))
	} catch (error: unknown) {
		console.error('User yaratishda xatolik:', error)
		throw new Error(
			`User yaratishda xatolik: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}

export async function updateUser(
	clerkId: string,
	user: UpdateUserParams,
): Promise<IUser> {
	try {
		await connectToDatabase()
		const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
			new: true,
		})
		if (!updatedUser) throw new Error('User update failed')
		return JSON.parse(JSON.stringify(updatedUser))
	} catch (error: unknown) {
		console.error('User yangilashda xatolik:', error)
		throw new Error(
			`User yangilashda xatolik: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}

export async function deleteUser(clerkId: string): Promise<IUser | null> {
	try {
		await connectToDatabase()
		const userToDelete = await User.findOne({ clerkId })
		if (!userToDelete) throw new Error('User not found')
		const deletedUser = await User.findByIdAndDelete(userToDelete._id)
		revalidatePath('/')
		return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
	} catch (error: unknown) {
		console.error("User o'chirishda xatolik:", error)
		throw new Error(
			`User o'chirishda xatolik: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}
