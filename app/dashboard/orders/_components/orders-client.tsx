'use client'

import { useUser } from '@clerk/nextjs'
import {
	ChevronLeft,
	ChevronRight,
	Download,
	Filter,
	Search,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Buyurtma tipi
interface OrderItem {
	_id: string
	name: string
	brand: string
	price: number
	quantity: number
	image: string
}

interface OrderData {
	_id: string
	items: OrderItem[]
	total: number
	paymentStatus: string
	orderStatus: string
	createdAt: string
}

// 1. YANGILANGAN TABS: Yangi 5 bosqichli mantiq asosida
const TABS = [
	'Barchasi',
	'Qabul qilindi',
	"To'landi",
	'Qadoqlanmoqda',
	"Yo'lda",
	'Yetkazib berildi',
	'Bekor qilingan',
]

const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`
}

// 2. YANGILANGAN RANGLAR: Holatga qarab chiroyli badgelar
const getStatusColor = (status: string) => {
	switch (status) {
		case 'Qabul qilindi':
			return 'border-gray-200 bg-gray-50 text-gray-700'
		case "To'landi":
			return 'border-blue-200 bg-blue-50 text-blue-700'
		case 'Qadoqlanmoqda':
			return 'border-orange-200 bg-orange-50 text-orange-700'
		case "Yo'lda":
			return 'border-indigo-200 bg-indigo-50 text-indigo-700'
		case 'Yetkazib berildi':
			return 'border-emerald-200 bg-emerald-50 text-emerald-700'
		case 'Bekor qilingan':
			return 'border-red-200 bg-red-50 text-red-700'
		default:
			return 'border-gray-200 bg-gray-50 text-gray-700'
	}
}

export default function OrdersClient({
	initialOrders,
}: {
	initialOrders: OrderData[]
}) {
	const { user } = useUser()
	const [activeTab, setActiveTab] = useState('Barchasi')
	const [searchQuery, setSearchQuery] = useState('')
	const router = useRouter()

	// 3. ESKI BAZA BILAN MOSLASHTIRISH
	// Kelajakda xato chiqmasligi uchun eski statuslarni ekranga chiqarishdan oldin o'zgartiramiz
	const mappedOrders = initialOrders.map(order => {
		let status = order.orderStatus
		if (status === 'Yangi') status = 'Qabul qilindi'
		if (status === 'Tayyorlanmoqda') status = 'Qadoqlanmoqda'
		return { ...order, orderStatus: status }
	})

	// Filtrlash (endi to'g'irlangan ma'lumotlar 'mappedOrders' ustida ishlaymiz)
	const filteredOrders = mappedOrders.filter(order => {
		const matchesTab =
			activeTab === 'Barchasi' ? true : order.orderStatus === activeTab
		const searchLower = searchQuery.toLowerCase()
		const matchesSearch =
			order._id.toLowerCase().includes(searchLower) ||
			order.items.some(item => item.name.toLowerCase().includes(searchLower))

		return matchesTab && matchesSearch
	})

	return (
		<div className='flex flex-col gap-6 pb-10 pt-4 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto'>
			{/* Sarlavha qismi */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
						Mening buyurtmalarim
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Barcha xaridlar va ularning yetkazib berish holatini kuzating.
					</p>
				</div>
				<div className='flex items-center gap-3'>
					<button className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-black shadow-sm'>
						<Download className='h-4 w-4' />
						Eksport
					</button>
				</div>
			</div>

			{/* Asosiy Oq Oyna (Card) */}
			<div className='flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm'>
				{/* Yuqori Panel: Tablar va Qidiruv */}
				<div className='flex flex-col border-b border-gray-100 p-4 gap-4 md:flex-row md:items-center md:justify-between'>
					<div className='flex items-center gap-1 rounded-lg bg-gray-50/80 p-1 border border-gray-100 overflow-x-auto hide-scrollbar'>
						{TABS.map(tab => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
									activeTab === tab
										? 'bg-white text-black shadow-sm border border-gray-200/50'
										: 'text-gray-500 hover:text-gray-900'
								}`}
							>
								{tab}
							</button>
						))}
					</div>

					<div className='flex items-center gap-2'>
						<div className='relative flex-1 md:w-64'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
							<input
								type='text'
								placeholder='ID yoki mahsulot qidirish...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='w-full rounded-lg border border-gray-200 py-1.5 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400'
							/>
						</div>
						<button className='flex items-center justify-center rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-black md:hidden'>
							<Filter className='h-5 w-5' />
						</button>
					</div>
				</div>

				{/* Jadval */}
				<div className='overflow-x-auto w-full'>
					<table className='w-full text-left text-sm'>
						<thead className='border-b border-gray-100 bg-gray-50/50 text-gray-500'>
							<tr>
								<th className='hidden sm:table-cell px-3 md:px-6 py-3.5 font-medium'>
									ID
								</th>
								<th className='px-3 md:px-6 py-3.5 font-medium'>Mahsulot</th>
								<th className='hidden lg:table-cell px-3 md:px-6 py-3.5 font-medium'>
									Mijoz
								</th>
								<th className='hidden md:table-cell px-3 md:px-6 py-3.5 font-medium'>
									Sana
								</th>
								<th className='px-3 md:px-6 py-3.5 font-medium'>Holati</th>
								<th className='px-3 md:px-6 py-3.5 font-medium text-right'>
									Summa
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100'>
							{filteredOrders.length > 0 ? (
								filteredOrders.map(order => (
									<tr
										key={order._id}
										onClick={() =>
											router.push(`/dashboard/orders/${order._id}`)
										}
										className='transition-colors hover:bg-gray-50/50 group cursor-pointer'
									>
										{/* ID */}
										<td className='hidden sm:table-cell px-3 md:px-6 py-4'>
											<div className='font-mono text-xs font-semibold text-gray-900'>
												ORD-{order._id.slice(-6).toUpperCase()}
											</div>
										</td>

										{/* Mahsulot */}
										<td className='px-3 md:px-6 py-4'>
											<div className='flex items-center gap-3'>
												<div className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white overflow-hidden'>
													{/* eslint-disable-next-line @next/next/no-img-element */}
													<img
														src={order.items[0]?.image || '/placeholder.png'}
														alt={order.items[0]?.name || 'Mahsulot'}
														className='h-full w-full object-cover transition-transform group-hover:scale-105'
														onError={e => {
															;(e.target as HTMLImageElement).src =
																'/placeholder.png'
														}}
													/>
												</div>
												<div className='flex flex-col flex-1 min-w-0'>
													<span className='font-medium text-gray-900 block truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px] xl:max-w-[300px] group-hover:text-blue-600 transition-colors'>
														{order.items[0]?.name || "Noma'lum mahsulot"}
													</span>
													{order.items.length > 1 && (
														<span className='text-xs text-gray-500 mt-0.5 whitespace-nowrap'>
															+ {order.items.length - 1} ta mahsulot
														</span>
													)}
												</div>
											</div>
										</td>

										{/* Mijoz */}
										<td className='hidden lg:table-cell px-3 md:px-6 py-4'>
											<div className='flex flex-col min-w-0'>
												<span className='font-medium text-gray-900 block truncate max-w-[120px] xl:max-w-[180px]'>
													{user?.fullName || 'Foydalanuvchi'}
												</span>
												<span className='mt-0.5 text-xs text-gray-500 block truncate max-w-[120px] xl:max-w-[180px]'>
													{user?.primaryEmailAddress?.emailAddress || ''}
												</span>
											</div>
										</td>

										{/* Sana */}
										<td className='hidden md:table-cell px-3 md:px-6 py-4 font-mono text-xs text-gray-600 whitespace-nowrap'>
											{formatDate(order.createdAt)}
										</td>

										{/* Holati */}
										<td className='px-3 md:px-6 py-4'>
											<span
												className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${getStatusColor(order.orderStatus)}`}
											>
												{order.orderStatus}
											</span>
										</td>

										{/* Summa */}
										<td className='px-3 md:px-6 py-4 text-right font-mono text-sm font-semibold text-gray-900'>
											${order.total.toFixed(2)}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className='px-3 md:px-6 py-12 text-center text-sm text-gray-500'
									>
										Ushbu bo'limda buyurtmalar topilmadi.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Paginatsiya qismi */}
				<div className='flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-6 py-3'>
					<span className='text-xs font-medium text-gray-500'>
						Jami {filteredOrders.length} ta buyurtma
					</span>
					<div className='flex items-center gap-2'>
						<button className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-black disabled:opacity-50'>
							<ChevronLeft className='h-4 w-4' />
						</button>
						<button className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-black disabled:opacity-50'>
							<ChevronRight className='h-4 w-4' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
