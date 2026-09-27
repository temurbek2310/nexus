'use server'

import Address from '@/lib/models/address.model'
import User from '@/lib/models/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

// 1. Ma'lumotlar strukturasi uchun qat'iy Type/Interface
export interface AddressParams {
	type: string
	recipient: string
	phone: string
	region: string
	fullAddress: string
	isDefault: boolean
}

// Yordamchi funksiya: Autentifikatsiyadan o'tgan Mongo User ni aniqlash
async function getAuthenticatedUser(providedClerkId?: string) {
	const { userId } = await auth()
	const clerkId = userId || providedClerkId

	if (!clerkId) {
		throw new Error('Avtorizatsiyadan oʻtilmagan. Iltimos, tizimga kiring.')
	}

	const user = await User.findOne({ clerkId })
	if (!user) {
		throw new Error('Foydalanuvchi maʼlumotlar bazasidan topilmadi')
	}

	return user
}

// Server tomondagi validatsiya
function validateAddressData(data: AddressParams) {
	const recipient = data.recipient?.trim()
	const phone = data.phone?.trim()
	const region = data.region?.trim()
	const fullAddress = data.fullAddress?.trim()
	const type = ['Uy', 'Ishxona', 'Boshqa'].includes(data.type)
		? data.type
		: 'Uy'

	if (!recipient) {
		throw new Error('Qabul qiluvchi ismi kiritilishi shart')
	}
	if (!phone) {
		throw new Error('Telefon raqam kiritilishi shart')
	}
	if (!region) {
		throw new Error('Viloyat yoki shahar kiritilishi shart')
	}
	if (!fullAddress) {
		throw new Error("To'liq manzil kiritilishi shart")
	}

	return {
		recipient,
		phone,
		region,
		fullAddress,
		type,
		isDefault: Boolean(data.isDefault),
	}
}

export async function createAddress(
	addressData: AddressParams,
	clerkId?: string,
) {
	try {
		await connectToDatabase()
		const user = await getAuthenticatedUser(clerkId)
		const cleanData = validateAddressData(addressData)

		// Agar ushbu manzil asosiy deb belgilansa, avvalgi manzillarni asosiy emas holatga o'tkazish
		if (cleanData.isDefault) {
			await Address.updateMany({ user: user._id }, { isDefault: false })
		} else {
			// Agar foydalanuvchida birorta ham manzil bo'lmasa, birinchi manzilni avtomatik asosiy qilish
			const count = await Address.countDocuments({ user: user._id })
			if (count === 0) {
				cleanData.isDefault = true
			}
		}

		const newAddress = await Address.create({
			...cleanData,
			user: user._id,
		})

		revalidatePath('/dashboard/addresses')

		return JSON.parse(JSON.stringify(newAddress))
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: 'Manzil yaratishda xatolik yuz berdi'
		throw new Error(message)
	}
}

export async function updateAddress(
	addressId: string,
	addressData: AddressParams,
	clerkId?: string,
) {
	try {
		await connectToDatabase()
		const user = await getAuthenticatedUser(clerkId)
		const cleanData = validateAddressData(addressData)

		if (cleanData.isDefault) {
			await Address.updateMany({ user: user._id }, { isDefault: false })
		}

		// Xavfsizlik: Foydalanuvchi faqat o'ziga tegishli manzilni yangilay olishini ta'minlash
		const updatedAddress = await Address.findOneAndUpdate(
			{ _id: addressId, user: user._id },
			cleanData,
			{ returnDocument: 'after' },
		)

		if (!updatedAddress) {
			throw new Error(
				'Manzil topilmadi yoki uni tahrirlash huquqiga ega emassiz',
			)
		}

		revalidatePath('/dashboard/addresses')

		return JSON.parse(JSON.stringify(updatedAddress))
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: 'Manzilni yangilashda xatolik yuz berdi'
		throw new Error(message)
	}
}

export async function getUserAddresses(clerkId?: string) {
	try {
		await connectToDatabase()
		const user = await getAuthenticatedUser(clerkId)

		// Asosiy manzil birinchi chiqishi uchun isDefault bo'yicha ham tartiblash
		const addresses = await Address.find({ user: user._id }).sort({
			isDefault: -1,
			createdAt: -1,
		})

		return JSON.parse(JSON.stringify(addresses))
	} catch {
		return []
	}
}

export async function setAsDefaultAddress(id: string, clerkId?: string) {
	try {
		await connectToDatabase()
		const user = await getAuthenticatedUser(clerkId)

		// Tekshirish: Manzil haqiqatan shu user ga tegishlimi
		const address = await Address.findOne({ _id: id, user: user._id })
		if (!address) {
			throw new Error('Manzil topilmadi yoki sizga tegishli emas')
		}

		await Address.updateMany({ user: user._id }, { isDefault: false })
		await Address.findByIdAndUpdate(id, { isDefault: true })
		revalidatePath('/dashboard/addresses')

		return { success: true }
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: 'Asosiy manzilni oʻzgartirishda xatolik'
		throw new Error(message)
	}
}

export async function deleteAddress(id: string, clerkId?: string) {
	try {
		await connectToDatabase()
		const user = await getAuthenticatedUser(clerkId)

		// Xavfsizlik: Faqat o'z manzilini o'chira olishi kerak
		const deletedAddress = await Address.findOneAndDelete({
			_id: id,
			user: user._id,
		})

		if (!deletedAddress) {
			throw new Error("Manzil topilmadi yoki o'chirishga ruxsat yo'q")
		}

		// Agar o'chirilgan manzil asosiy bo'lgan bo'lsa, qolgan eng so'nggi manzilni asosiy qilib belgilash
		if (deletedAddress.isDefault) {
			const remainingAddress = await Address.findOne({ user: user._id }).sort({
				createdAt: -1,
			})
			if (remainingAddress) {
				remainingAddress.isDefault = true
				await remainingAddress.save()
			}
		}

		revalidatePath('/dashboard/addresses')

		return { success: true }
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "O'chirishda xatolik yuz berdi"
		throw new Error(message)
	}
}
