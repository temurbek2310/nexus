'use client'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import {
	createCoupon,
	ICoupon,
	updateCoupon,
} from '@/lib/actions/coupon.actions'
import { RefreshCw, Ticket } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface CouponSheetProps {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	initialData?: ICoupon | null
}

export default function CouponSheet({
	isOpen,
	setIsOpen,
	initialData,
}: CouponSheetProps) {
	const isEditing = !!initialData
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [code, setCode] = useState('')
	const [type, setType] = useState<'Foyiz' | 'Summa'>('Foyiz')
	const [value, setValue] = useState<number | ''>('')
	const [usageLimit, setUsageLimit] = useState<number | ''>('')
	const [expiryDate, setExpiryDate] = useState('')
	const [status, setStatus] = useState<'Faol' | "To'xtatilgan">('Faol')

	useEffect(() => {
		if (isOpen) {
			setError(null)
			if (initialData) {
				setCode(initialData.code)
				setType(initialData.type)
				setValue(initialData.value)
				setUsageLimit(initialData.usageLimit || '')

				// Databasedan kelgan vaqtni "YYYY-MM-DD" formatiga o'tkazish
				const dateObj = new Date(initialData.expiryDate)
				setExpiryDate(dateObj.toISOString().split('T')[0])

				setStatus(
					initialData.status === "Muddat o'tgan"
						? "To'xtatilgan"
						: initialData.status,
				)
			} else {
				setCode('')
				setType('Foyiz')
				setValue('')
				setUsageLimit('')
				setExpiryDate('')
				setStatus('Faol')
			}
		}
	}, [isOpen, initialData])

	const generateCode = () => {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		let result = ''
		for (let i = 0; i < 8; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		setCode(result)
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		const payload = {
			code,
			type,
			value: Number(value),
			usageLimit: usageLimit ? Number(usageLimit) : null,
			expiryDate,
			status,
		}

		try {
			if (isEditing && initialData) {
				await updateCoupon(initialData._id, payload)
			} else {
				await createCoupon(payload)
			}
			setIsOpen(false)
		} catch (err: any) {
			setError(err.message || 'Xatolik yuz berdi')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent className='w-full sm:max-w-xl! font-montserrat border-l border-gray-200 bg-white p-0 flex flex-col h-full'>
				<SheetHeader className='p-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10'>
					<SheetTitle className='font-space-grotesk text-2xl font-bold text-gray-900 flex items-center gap-2'>
						<Ticket className='w-6 h-6 text-black' />
						{isEditing ? 'Kuponni tahrirlash' : 'Yangi kupon'}
					</SheetTitle>
					<SheetDescription className='text-sm text-gray-500 font-medium'>
						{isEditing
							? "Chegirma miqdori yoki muddatini o'zgartiring."
							: 'Mijozlar uchun yangi chegirma kodi yarating.'}
					</SheetDescription>
				</SheetHeader>

				<div className='flex-1 overflow-y-auto px-6 py-8 custom-scrollbar'>
					<form
						id='coupon-form'
						onSubmit={onSubmit}
						className='flex flex-col space-y-8'
					>
						{error && (
							<div className='bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold border border-red-100'>
								{error}
							</div>
						)}
						<div className='flex flex-col space-y-5'>
							<div className='flex flex-col gap-1.5'>
								<label className='text-sm font-semibold text-gray-700'>
									Kupon kodi
								</label>
								<div className='flex items-center gap-2'>
									<input
										required
										value={code}
										onChange={e => setCode(e.target.value.toUpperCase())}
										type='text'
										placeholder='SUMMER26'
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-space-grotesk font-bold tracking-widest uppercase outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm'
									/>
									<button
										type='button'
										onClick={generateCode}
										className='shrink-0 h-[46px] px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:text-black hover:border-black transition-all shadow-sm flex items-center justify-center cursor-pointer'
									>
										<RefreshCw className='w-4 h-4' />
									</button>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-1.5'>
									<label className='text-sm font-semibold text-gray-700'>
										Chegirma turi
									</label>
									<select
										value={type}
										onChange={e => setType(e.target.value as 'Foyiz' | 'Summa')}
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer'
									>
										<option value='Foyiz'>Foiz (%)</option>
										<option value='Summa'>Aniq summa ($)</option>
									</select>
								</div>
								<div className='flex flex-col gap-1.5'>
									<label className='text-sm font-semibold text-gray-700'>
										Miqdor
									</label>
									<div className='relative'>
										<span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold'>
											{type === 'Foyiz' ? '%' : '$'}
										</span>
										<input
											required
											value={value}
											onChange={e => setValue(Number(e.target.value))}
											type='number'
											min='1'
											max={type === 'Foyiz' ? '100' : undefined}
											placeholder={type === 'Foyiz' ? '20' : '50'}
											className='w-full rounded-xl border border-gray-200 py-3 pl-8 pr-3 text-sm font-mono outline-none focus:border-black focus:ring-1 focus:ring-black'
										/>
									</div>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-1.5'>
									<label className='text-sm font-semibold text-gray-700'>
										Foydalanish limiti
									</label>
									<input
										value={usageLimit}
										onChange={e => setUsageLimit(Number(e.target.value))}
										type='number'
										min='1'
										placeholder='Cheksiz'
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-mono outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:font-montserrat'
									/>
								</div>
								<div className='flex flex-col gap-1.5'>
									<label className='text-sm font-semibold text-gray-700'>
										Tugash muddati
									</label>
									<input
										required
										value={expiryDate}
										onChange={e => setExpiryDate(e.target.value)}
										type='date'
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black'
									/>
								</div>
							</div>

							<div className='flex flex-col gap-1.5 mt-2'>
								<label className='text-sm font-semibold text-gray-700'>
									Holati
								</label>
								<select
									value={status}
									onChange={e =>
										setStatus(e.target.value as 'Faol' | "To'xtatilgan")
									}
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer'
								>
									<option value='Faol'>Faol (Ishlatish mumkin)</option>
									<option value="To'xtatilgan">To'xtatilgan (Yashirin)</option>
								</select>
							</div>
						</div>
					</form>
				</div>

				<div className='p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 shrink-0'>
					<button
						type='button'
						onClick={() => setIsOpen(false)}
						className='px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm cursor-pointer'
					>
						Bekor qilish
					</button>
					<button
						type='submit'
						form='coupon-form'
						disabled={isLoading}
						className='px-6 py-2.5 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 cursor-pointer'
					>
						{isLoading ? 'Saqlanmoqda...' : isEditing ? 'Saqlash' : 'Yaratish'}
					</button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
