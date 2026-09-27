'use client'

import {
	Briefcase,
	Building,
	Check,
	Home,
	MapPin,
	MoreHorizontal,
	Phone,
	Plus,
	Search,
	User,
} from 'lucide-react'
import { useState } from 'react'

// Mock Ma'lumotlar
const ADDRESSES_DATA = [
	{
		id: 'ADDR-01',
		type: 'Uy',
		isDefault: true,
		recipient: 'Temurbek Samatov',
		phone: '+998 90 123 45 67',
		region: 'Toshkent sh., Yunusobod t.',
		fullAddress:
			"19-kvartal, 42-uy, 15-xonadon. Mo'ljal: Korzinka supermarketi.",
	},
	{
		id: 'ADDR-02',
		type: 'Ishxona',
		isDefault: false,
		recipient: 'Temurbek Samatov',
		phone: '+998 90 123 45 67',
		region: 'Toshkent sh., Mirobod t.',
		fullAddress:
			'Afrosiyob ko\'chasi, 14-uy. "IT Park" biznes markazi, 4-qavat, 401-xona.',
	},
	{
		id: 'ADDR-03',
		type: 'Boshqa',
		isDefault: false,
		recipient: 'Alisher Usmonov',
		phone: '+998 99 876 54 32',
		region: 'Samarqand v., Samarqand sh.',
		fullAddress:
			"Amir Temur ko'chasi, 55-uy. Mo'ljal: Registon maydoni yaqinida.",
	},
	{
		id: 'ADDR-04',
		type: 'Uy',
		isDefault: false,
		recipient: 'Malika Azizova',
		phone: '+998 97 111 22 33',
		region: 'Buxoro v., Buxoro sh.',
		fullAddress: "Bahauddin Naqshband ko'chasi, 128-uy.",
	},
]

export default function AddressesPage() {
	const [searchTerm, setSearchTerm] = useState('')

	// Qidiruv mantiqchasi
	const filteredAddresses = ADDRESSES_DATA.filter(
		addr =>
			addr.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
			addr.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
			addr.fullAddress.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	// Manzil turiga qarab ikonka tanlash
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

	return (
		<div className='flex flex-col gap-6 pb-10 pt-4'>
			{/* Sarlavha qismi */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
						Manzillar
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Yetkazib berish manzillarini boshqaring va yangilarini qo'shing.
					</p>
				</div>
				<div className='flex items-center gap-3'>
					<div className='relative hidden md:block'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<input
							type='text'
							placeholder='Manzil qidirish...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-64 rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 shadow-sm'
						/>
					</div>
					<button className='flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 shadow-sm whitespace-nowrap'>
						<Plus className='h-4 w-4' />
						Yangi manzil
					</button>
				</div>
			</div>

			{/* Mobil qidiruv (Faqat kichik ekranlarda ko'rinadi) */}
			<div className='relative md:hidden'>
				<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
				<input
					type='text'
					placeholder='Manzil qidirish...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 shadow-sm'
				/>
			</div>

			{/* Manzillar To'ri (Grid) */}
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
				{filteredAddresses.length > 0 ? (
					filteredAddresses.map(address => (
						<div
							key={address.id}
							className='group flex flex-col justify-between rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md'
						>
							{/* Karta Header qismi */}
							<div className='flex items-center justify-between border-b border-gray-100 p-5'>
								<div className='flex items-center gap-3'>
									<div className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50'>
										{getTypeIcon(address.type)}
									</div>
									<span className='font-semibold text-gray-900'>
										{address.type}
									</span>
									{address.isDefault && (
										<span className='inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 uppercase tracking-wider ml-1'>
											<Check className='w-3 h-3' /> Asosiy
										</span>
									)}
								</div>
								<button className='inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-black'>
									<MoreHorizontal className='h-5 w-5' />
								</button>
							</div>

							{/* Karta Body qismi */}
							<div className='flex flex-col gap-3 p-5'>
								<div className='flex items-center gap-2 text-sm'>
									<User className='h-4 w-4 text-gray-400 shrink-0' />
									<span className='font-medium text-gray-900'>
										{address.recipient}
									</span>
								</div>

								<div className='flex items-center gap-2 text-sm'>
									<Phone className='h-4 w-4 text-gray-400 shrink-0' />
									<span className='font-mono text-gray-600'>
										{address.phone}
									</span>
								</div>

								<div className='flex items-start gap-2 text-sm mt-1'>
									<MapPin className='h-4 w-4 text-gray-400 shrink-0 mt-0.5' />
									<div className='flex flex-col'>
										<span className='font-medium text-gray-900'>
											{address.region}
										</span>
										<span className='text-gray-500 mt-0.5 leading-relaxed'>
											{address.fullAddress}
										</span>
									</div>
								</div>
							</div>

							{/* Karta Footer qismi */}
							{!address.isDefault && (
								<div className='border-t border-gray-50 bg-gray-50/50 p-3 flex justify-end rounded-b-xl opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100'>
									<button className='text-xs font-medium text-gray-500 hover:text-black transition-colors'>
										Asosiy qilib belgilash
									</button>
								</div>
							)}
						</div>
					))
				) : (
					<div className='col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center'>
						<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4'>
							<MapPin className='h-6 w-6 text-gray-400' />
						</div>
						<h3 className='text-sm font-semibold text-gray-900'>
							Manzil topilmadi
						</h3>
						<p className='mt-1 text-sm text-gray-500 max-w-sm'>
							Siz qidirayotgan manzil bo'yicha hech qanday natija yo'q. Qidiruv
							so'zini o'zgartirib ko'ring yoki yangi manzil qo'shing.
						</p>
						<button className='mt-6 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-black shadow-sm'>
							<Plus className='h-4 w-4' />
							Yangi manzil qo'shish
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
