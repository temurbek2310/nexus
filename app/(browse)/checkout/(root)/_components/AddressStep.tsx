'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createAddress } from '@/lib/actions/address.actions'
import { cn } from '@/lib/utils'
import { Check, Plus } from 'lucide-react'
import { useState, useTransition } from 'react'
import { IMaskInput } from 'react-imask'

interface Address {
	_id: string
	type: string
	recipient: string
	phone: string
	region: string
	fullAddress: string
	isDefault: boolean
}

interface AddressStepProps {
	addresses: Address[]
	selectedAddressId: string
	onSelectAddress: (id: string) => void
	onNext: () => void
}

export default function AddressStep({
	addresses,
	selectedAddressId,
	onSelectAddress,
	onNext,
}: AddressStepProps) {
	const [addressList, setAddressList] = useState<Address[]>(addresses)
	const [isAddingNew, setIsAddingNew] = useState(addresses.length === 0)
	const [isPending, startTransition] = useTransition()
	const [errorMsg, setErrorMsg] = useState('')

	const [formData, setFormData] = useState({
		recipient: '',
		phone: '',
		region: '',
		fullAddress: '',
		type: 'Uy',
		isDefault: addresses.length === 0,
	})

	const handleCreateAddress = (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMsg('')

		startTransition(async () => {
			try {
				const newAddress = await createAddress(formData)
				if (formData.isDefault) {
					setAddressList(prev => prev.map(a => ({ ...a, isDefault: false })))
				}
				setAddressList(prev => [newAddress, ...prev])
				onSelectAddress(newAddress._id)
				setIsAddingNew(false)
				setFormData({
					recipient: '',
					phone: '',
					region: '',
					fullAddress: '',
					type: 'Uy',
					isDefault: false,
				})
			} catch (err: unknown) {
				setErrorMsg(
					err instanceof Error ? err.message : 'Manzilni saqlashda xatolik',
				)
			}
		})
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-space-grotesk font-bold'>
						1
					</div>
					<h2 className='font-space-grotesk text-xl font-bold text-black'>
						Yetkazib berish manzili
					</h2>
				</div>

				{!isAddingNew && addressList.length > 0 && (
					<Button
						onClick={() => setIsAddingNew(true)}
						variant='outline'
						size='sm'
						className='rounded-xl font-montserrat text-xs flex items-center gap-1.5'
					>
						<Plus className='w-4 h-4' />
						Yangi manzil qo'shish
					</Button>
				)}
			</div>

			{errorMsg && (
				<div className='p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-montserrat'>
					{errorMsg}
				</div>
			)}

			{isAddingNew ? (
				<form
					onSubmit={handleCreateAddress}
					className='flex flex-col gap-6 animate-in fade-in duration-300'
				>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 font-montserrat'>
						<div className='flex flex-col gap-2'>
							<label className='text-xs font-semibold uppercase text-gray-500'>
								Qabul qiluvchi F.I.O
							</label>
							<Input
								required
								placeholder='Alisher Valiyev'
								value={formData.recipient}
								onChange={e =>
									setFormData({ ...formData, recipient: e.target.value })
								}
								className='h-12 rounded-xl bg-gray-50/50 border-gray-200'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label className='text-xs font-semibold uppercase text-gray-500'>
								Telefon raqam
							</label>
							<IMaskInput
								mask='+998 00 000 00 00'
								required
								placeholder='+998 90 123 45 67'
								value={formData.phone}
								onAccept={val => setFormData({ ...formData, phone: val })}
								className='flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm font-montserrat focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black'
							/>
						</div>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 font-montserrat'>
						<div className='flex flex-col gap-2'>
							<label className='text-xs font-semibold uppercase text-gray-500'>
								Viloyat / Shahar
							</label>
							<Input
								required
								placeholder='Toshkent shahri'
								value={formData.region}
								onChange={e =>
									setFormData({ ...formData, region: e.target.value })
								}
								className='h-12 rounded-xl bg-gray-50/50 border-gray-200'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label className='text-xs font-semibold uppercase text-gray-500'>
								Manzil turi
							</label>
							<div className='flex items-center gap-2 h-12'>
								{['Uy', 'Ishxona', 'Boshqa'].map(t => (
									<button
										type='button'
										key={t}
										onClick={() => setFormData({ ...formData, type: t })}
										className={cn(
											'flex-1 h-full rounded-xl border text-sm font-medium transition-all',
											formData.type === t
												? 'bg-black text-white border-black'
												: 'bg-gray-50 text-gray-600 border-gray-200',
										)}
									>
										{t}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className='flex flex-col gap-2 font-montserrat'>
						<label className='text-xs font-semibold uppercase text-gray-500'>
							To'liq manzil
						</label>
						<Input
							required
							placeholder="Amir Temur ko'chasi, 15-uy"
							value={formData.fullAddress}
							onChange={e =>
								setFormData({ ...formData, fullAddress: e.target.value })
							}
							className='h-12 rounded-xl bg-gray-50/50 border-gray-200'
						/>
					</div>

					{/* ASOSIY MANZIL Qilib Belgilash Checkboxi QO'SHILDI */}
					<div className='flex items-center gap-3 font-montserrat'>
						<input
							type='checkbox'
							id='isDefault'
							checked={formData.isDefault}
							onChange={e =>
								setFormData({ ...formData, isDefault: e.target.checked })
							}
							className='w-4 h-4 rounded border-gray-300 accent-black cursor-pointer'
						/>
						<label
							htmlFor='isDefault'
							className='text-sm text-gray-700 cursor-pointer select-none'
						>
							Asosiy manzil sifatida belgilash
						</label>
					</div>

					<div className='flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-2'>
						<Button
							type='submit'
							disabled={isPending}
							className='w-full h-12 bg-black text-white rounded-xl font-montserrat font-semibold'
						>
							{isPending ? 'Saqlanmoqda...' : 'Manzilni saqlash'}
						</Button>
						{addressList.length > 0 && (
							<Button
								type='button'
								variant='outline'
								onClick={() => setIsAddingNew(false)}
								className='h-12 px-6 rounded-xl'
							>
								Bekor qilish
							</Button>
						)}
					</div>
				</form>
			) : (
				<div className='flex flex-col gap-4 animate-in fade-in duration-300'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{addressList.map(addr => {
							const isSelected = selectedAddressId === addr._id
							return (
								<div
									key={addr._id}
									onClick={() => onSelectAddress(addr._id)}
									className={cn(
										'p-5 rounded-2xl border-2 cursor-pointer transition-all',
										isSelected
											? 'border-black bg-gray-50/50 shadow-sm'
											: 'border-gray-200 bg-white',
									)}
								>
									<div className='flex items-center justify-between mb-3'>
										<div className='flex items-center gap-2'>
											<span className='font-space-grotesk font-bold text-xs px-2.5 py-1 rounded-md bg-black text-white uppercase'>
												{addr.type}
											</span>
											{addr.isDefault && (
												<span className='font-montserrat text-[11px] font-medium text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded'>
													Asosiy
												</span>
											)}
										</div>
										<div
											className={cn(
												'w-5 h-5 rounded-full border flex items-center justify-center',
												isSelected
													? 'bg-black border-black text-white'
													: 'border-gray-300',
											)}
										>
											{isSelected && <Check className='w-3 h-3 stroke-3' />}
										</div>
									</div>
									<div className='flex flex-col font-montserrat gap-1'>
										<span className='font-bold text-gray-900'>
											{addr.recipient}
										</span>
										<span className='text-xs text-gray-500'>{addr.phone}</span>
										<span className='text-sm text-gray-700 mt-1'>
											{addr.region}, {addr.fullAddress}
										</span>
									</div>
								</div>
							)
						})}
					</div>

					<div className='mt-6 pt-6 border-t border-gray-100 flex justify-stretch sm:justify-end'>
						<Button
							disabled={!selectedAddressId}
							onClick={onNext}
							className='w-full sm:w-auto h-14 px-8 bg-black text-white hover:bg-gray-800 rounded-2xl font-montserrat font-semibold'
						>
							Keyingi qadam (To'lov)
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
