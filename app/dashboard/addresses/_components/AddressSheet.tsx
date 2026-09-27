'use client'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { createAddress, updateAddress } from '@/lib/actions/address.actions'
import React, { useEffect, useState } from 'react'
import { IMaskInput } from 'react-imask' // IMask import qilindi

export interface IAddress {
	_id: string
	user: string
	type: string
	recipient: string
	phone: string
	region: string
	fullAddress: string
	isDefault: boolean
	createdAt?: string
	updatedAt?: string
}

interface AddressSheetProps {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	clerkId: string
	initialData?: IAddress | null
}

export default function AddressSheet({
	isOpen,
	setIsOpen,
	clerkId,
	initialData,
}: AddressSheetProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	// Telefon raqami uchun state (IMask bilan to'g'ri ishlashi uchun boshqariladi)
	const [phoneValue, setPhoneValue] = useState(initialData?.phone || '+998')

	const isEditing = !!initialData

	// Oyna ochilganda ma'lumotlarni tozalash/to'ldirish
	useEffect(() => {
		if (isOpen) {
			setErrorMessage(null)
			// Agar tahrirlash bo'lsa eski raqamni qo'yadi, yo'qsa +998 dan boshlaydi
			setPhoneValue(initialData?.phone || '+998')
		}
	}, [isOpen, initialData])

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMessage(null)
		setIsLoading(true)

		const formData = new FormData(e.currentTarget)

		const recipient = (formData.get('recipient') as string)?.trim()
		const region = (formData.get('region') as string)?.trim()
		const fullAddress = (formData.get('fullAddress') as string)?.trim()
		const type = (formData.get('type') as string) || 'Uy'
		const isDefault = formData.get('isDefault') === 'on'

		// Telefon raqam to'liq kiritilganligini tekshirish (uzunligi 17 ta belgi bo'lishi kerak)
		if (phoneValue.length < 17) {
			setErrorMessage("Telefon raqamni to'liq kiriting")
			setIsLoading(false)
			return
		}

		if (!recipient || !region || !fullAddress) {
			setErrorMessage("Barcha majburiy maydonlarni to'ldiring")
			setIsLoading(false)
			return
		}

		const addressData = {
			type,
			recipient,
			phone: phoneValue, // State'dagi tayyor formatlangan raqamni olamiz
			region,
			fullAddress,
			isDefault,
		}

		try {
			if (isEditing && initialData?._id) {
				await updateAddress(initialData._id, addressData, clerkId)
			} else {
				await createAddress(addressData, clerkId)
			}
			setIsOpen(false)
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'Manzilni saqlashda xatolik yuz berdi'
			setErrorMessage(message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent className='w-full sm:max-w-xl! font-montserrat border-l border-gray-200 bg-white overflow-y-auto'>
				<SheetHeader className='text-left space-y-1 pb-6 border-b border-gray-100'>
					<SheetTitle className='text-xl font-semibold text-gray-900'>
						{isEditing ? 'Manzilni tahrirlash' : "Yangi manzil qo'shish"}
					</SheetTitle>
					<SheetDescription className='text-sm text-gray-500'>
						{isEditing
							? "Manzil ma'lumotlariga o'zgartirish kiriting."
							: 'Buyurtmalaringiz yetkazib beriladigan manzilni kiriting.'}
					</SheetDescription>
				</SheetHeader>

				<form
					key={initialData?._id || 'new'}
					onSubmit={onSubmit}
					className='flex flex-col gap-5 px-6 pt-6'
				>
					{errorMessage && (
						<div className='rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-start gap-2'>
							<span className='font-semibold'>Xatolik:</span>
							<span>{errorMessage}</span>
						</div>
					)}

					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-1.5'>
							<label className='text-sm font-medium text-gray-700'>
								Manzil turi
							</label>
							<select
								name='type'
								defaultValue={initialData?.type || 'Uy'}
								className='rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all bg-white cursor-pointer'
							>
								<option value='Uy'>Uy</option>
								<option value='Ishxona'>Ishxona</option>
								<option value='Boshqa'>Boshqa</option>
							</select>
						</div>
						<div className='flex flex-col gap-1.5'>
							<label className='text-sm font-medium text-gray-700'>
								Qabul qiluvchi
							</label>
							<input
								required
								name='recipient'
								defaultValue={initialData?.recipient}
								type='text'
								placeholder='Ism familiya'
								className='rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all'
							/>
						</div>
					</div>

					<div className='flex flex-col gap-1.5'>
						<label className='text-sm font-medium text-gray-700'>
							Telefon raqam
						</label>
						<IMaskInput
							mask='+998 (00) 000-00-00'
							value={phoneValue}
							unmask={false} // Formati bilan birga (e.g., +998 (90) 123-45-67) saqlaydi
							onAccept={value => setPhoneValue(value)}
							placeholder='+998 (__) ___-__-__'
							className='rounded-lg border border-gray-200 p-2.5 text-sm font-mono outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all'
						/>
					</div>

					<div className='flex flex-col gap-1.5'>
						<label className='text-sm font-medium text-gray-700'>
							Viloyat va shahar
						</label>
						<input
							required
							name='region'
							defaultValue={initialData?.region}
							type='text'
							placeholder='Toshkent sh., Yunusobod t.'
							className='rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all'
						/>
					</div>

					<div className='flex flex-col gap-1.5'>
						<label className='text-sm font-medium text-gray-700'>
							To'liq manzil
						</label>
						<textarea
							required
							name='fullAddress'
							defaultValue={initialData?.fullAddress}
							rows={3}
							placeholder="Ko'cha, uy, xonadon va mo'ljal..."
							className='rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all resize-none'
						></textarea>
					</div>

					<label className='flex items-center gap-2 cursor-pointer mt-1'>
						<input
							type='checkbox'
							name='isDefault'
							defaultChecked={initialData?.isDefault}
							className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer'
						/>
						<span className='text-sm text-gray-700'>
							Asosiy manzil qilib belgilash
						</span>
					</label>

					<button
						type='submit'
						disabled={isLoading}
						className='mt-4 w-full rounded-lg bg-black p-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50 shadow-sm cursor-pointer'
					>
						{isLoading
							? 'Saqlanmoqda...'
							: isEditing
								? "O'zgarishlarni saqlash"
								: 'Saqlash'}
					</button>
				</form>
			</SheetContent>
		</Sheet>
	)
}
