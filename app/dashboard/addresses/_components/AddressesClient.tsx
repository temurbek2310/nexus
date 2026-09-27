'use client'

import {
	deleteAddress,
	setAsDefaultAddress,
} from '@/lib/actions/address.actions'
import {
	Briefcase,
	Building,
	Check,
	Home,
	MapPin,
	Pencil,
	Phone,
	Plus,
	Search,
	Trash2,
} from 'lucide-react'
import { useState } from 'react'
import AddressSheet, { IAddress } from './AddressSheet'

interface AddressesClientProps {
	initialAddresses: IAddress[]
	clerkId: string
}

export default function AddressesClient({
	initialAddresses,
	clerkId,
}: AddressesClientProps) {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)
	const [editingAddress, setEditingAddress] = useState<IAddress | null>(null)

	const [isDeleting, setIsDeleting] = useState<string | null>(null)
	const [isSettingDefault, setIsSettingDefault] = useState<string | null>(null)

	const filteredAddresses = initialAddresses.filter(
		addr =>
			addr.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
			addr.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
			addr.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'Uy':
				return <Home className='w-4 h-4 text-gray-500' />
			case 'Ishxona':
				return <Briefcase className='w-4 h-4 text-gray-500' />
			default:
				return <Building className='w-4 h-4 text-gray-500' />
		}
	}

	const handleAddNew = () => {
		setEditingAddress(null)
		setIsSheetOpen(true)
	}

	const handleEdit = (address: IAddress) => {
		setEditingAddress(address)
		setIsSheetOpen(true)
	}

	const handleDelete = async (id: string) => {
		if (!confirm("Ushbu manzilni o'chirib tashlamoqchimisiz?")) return

		setIsDeleting(id)
		try {
			await deleteAddress(id)
		} catch (error) {
			console.error(error)
		} finally {
			setIsDeleting(null)
		}
	}

	const handleSetDefault = async (id: string) => {
		setIsSettingDefault(id)
		try {
			await setAsDefaultAddress(id, clerkId)
		} catch (error) {
			console.error(error)
		} finally {
			setIsSettingDefault(null)
		}
	}

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4'>
			<AddressSheet
				isOpen={isSheetOpen}
				setIsOpen={setIsSheetOpen}
				clerkId={clerkId}
				initialData={editingAddress}
			/>

			{/* Sarlavha va Qidiruv */}
			<div className='flex flex-col lg:flex-row lg:items-end justify-between gap-6'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						Manzillar
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						Yetkazib berish va hisob-kitob manzillaringizni boshqaring.
					</p>
				</div>

				<div className='flex flex-col sm:flex-row items-center gap-3'>
					<div className='relative w-full sm:w-64'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<input
							type='text'
							placeholder='Manzil qidirish...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm font-montserrat'
						/>
					</div>

					<button
						onClick={handleAddNew}
						className='w-full sm:w-auto font-montserrat flex items-center justify-center rounded-xl bg-black text-white hover:bg-gray-800 transition-all shadow-sm h-[42px] px-6 whitespace-nowrap'
					>
						<Plus className='w-4 h-4 mr-2' />
						Yangi manzil
					</button>
				</div>
			</div>

			{/* Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
				{filteredAddresses.map(address => {
					const isProcessing =
						isDeleting === address._id || isSettingDefault === address._id

					return (
						<div
							key={address._id}
							className={`group relative bg-white border border-gray-200/80 rounded-[24px] p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/20 flex flex-col overflow-hidden ${
								isProcessing ? 'opacity-50 pointer-events-none' : ''
							}`}
						>
							{address.isDefault && (
								<div className='absolute top-0 right-0 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-bl-xl font-montserrat flex items-center shadow-sm'>
									<Check className='w-3 h-3 mr-1' />
									Asosiy
								</div>
							)}

							<div className='flex items-center space-x-3 mb-6'>
								<div className='w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center'>
									{getTypeIcon(address.type)}
								</div>
								<h3 className='font-space-grotesk text-lg font-bold text-black'>
									{address.type}
								</h3>
							</div>

							<div className='flex-1 flex flex-col space-y-1.5 mb-8'>
								<p className='font-space-grotesk font-bold text-black text-base mb-1 flex items-center gap-2'>
									{address.recipient}
								</p>

								<div className='font-montserrat text-sm text-gray-500 leading-relaxed max-w-[90%] flex items-start gap-2'>
									<MapPin className='w-4 h-4 mt-0.5 shrink-0 text-gray-400' />
									<div>
										<span className='font-medium text-gray-900 block mb-0.5'>
											{address.region}
										</span>
										{address.fullAddress}
									</div>
								</div>
							</div>

							<div className='flex items-center justify-between pt-4 border-t border-gray-100 mt-auto'>
								<div className='flex items-center text-gray-500'>
									<Phone className='w-3.5 h-3.5 mr-2' />
									<span className='font-montserrat text-xs font-semibold tracking-wide'>
										{address.phone}
									</span>
								</div>

								<div className='flex items-center space-x-2 opacity-100 md:opacity-0 md:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
									<button
										onClick={() => handleEdit(address)}
										className='w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black hover:bg-gray-50 transition-colors shadow-sm'
									>
										<Pencil className='w-3.5 h-3.5' />
									</button>

									<button
										onClick={() => handleDelete(address._id)}
										className='w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors shadow-sm'
									>
										<Trash2 className='w-3.5 h-3.5' />
									</button>
								</div>
							</div>

							{/* MATN KO'RINISHIDAGI "ASOSIY QILIB BELGILASH" FOOTER */}
							{!address.isDefault && (
								<div className='border-t border-gray-100 bg-gray-50/50 py-3 px-6 flex justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100 mt-5 -mx-6 -mb-6'>
									<button
										onClick={() => handleSetDefault(address._id)}
										className='text-xs font-montserrat font-semibold text-gray-500 hover:text-black transition-colors'
									>
										Asosiy qilib belgilash
									</button>
								</div>
							)}
						</div>
					)
				})}

				<button
					onClick={handleAddNew}
					className='group bg-transparent border-2 border-dashed border-gray-200 rounded-[24px] p-6 flex flex-col items-center justify-center text-center min-h-[280px] hover:border-black hover:bg-gray-50/50 transition-all duration-300'
				>
					<div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-black group-hover:scale-110 transition-all duration-300 shadow-sm'>
						<Plus className='w-5 h-5 text-gray-500 group-hover:text-white transition-colors' />
					</div>
					<span className='font-space-grotesk text-lg font-bold text-black mb-1'>
						Yangi manzil qo'shish
					</span>
					<span className='font-montserrat text-xs text-gray-500 font-medium mt-1 group-hover:text-black transition-colors'>
						Yangi manzil kiritish uchun bosing
					</span>
				</button>
			</div>
		</div>
	)
}
