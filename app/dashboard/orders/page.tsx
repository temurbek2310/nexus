'use client'

import {
	ChevronLeft,
	ChevronRight,
	Download,
	Filter,
	MoreHorizontal,
	Search,
} from 'lucide-react'
import { useState } from 'react'

// Vaqtinchalik mock ma'lumotlar (Rasmlar bilan)
const ORDERS_DATA = [
	{
		id: 'ORD-7352',
		customer: 'Temurbek Samatov',
		email: 'temurbek@example.com',
		status: 'Yetkazib berildi',
		date: '2026-09-27',
		amount: '$299.00',
		products: [
			{
				name: 'Sony WH-1000XM5',
				image:
					'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&q=80',
			},
			{
				name: 'AirPods Case',
				image:
					'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=150&q=80',
			},
		],
	},
	{
		id: 'ORD-7351',
		customer: 'Alisher Usmonov',
		email: 'alisher.u@example.com',
		status: 'Jarayonda',
		date: '2026-09-26',
		amount: '$1,299.00',
		products: [
			{
				name: 'MacBook Air M2',
				image:
					'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&q=80',
			},
		],
	},
	{
		id: 'ORD-7350',
		customer: 'Sardor Rahimxon',
		email: 'sardor@example.com',
		status: 'Bekor qilindi',
		date: '2026-09-26',
		amount: '$49.00',
		products: [
			{
				name: 'Logitech Mouse',
				image:
					'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&q=80',
			},
		],
	},
	{
		id: 'ORD-7349',
		customer: 'Javohir Tojiyev',
		email: 'javohir@example.com',
		status: 'Yetkazib berildi',
		date: '2026-09-25',
		amount: '$349.00',
		products: [
			{
				name: 'Apple Watch S8',
				image:
					'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=150&q=80',
			},
			{
				name: 'Strap',
				image:
					'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=150&q=80',
			},
			{
				name: 'Screen Protector',
				image:
					'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=150&q=80',
			},
		],
	},
	{
		id: 'ORD-7348',
		customer: 'Malika Azizova',
		email: 'malika.a@example.com',
		status: 'Jarayonda',
		date: '2026-09-24',
		amount: '$150.00',
		products: [
			{
				name: 'Mexanik Klaviatura',
				image:
					'https://images.unsplash.com/photo-1595225476474-87563907a212?w=150&q=80',
			},
		],
	},
]

const TABS = ['Barchasi', 'Jarayonda', 'Yetkazib berildi', 'Bekor qilindi']

export default function OrdersPage() {
	const [activeTab, setActiveTab] = useState('Barchasi')

	const filteredOrders = ORDERS_DATA.filter(order =>
		activeTab === 'Barchasi' ? true : order.status === activeTab,
	)

	return (
		<div className='flex flex-col gap-6 pb-10 pt-4'>
			{/* Sarlavha qismi */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
						Buyurtmalar
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Barcha xaridlar va ularning yetkazib berish holatini boshqaring.
					</p>
				</div>
				<div className='flex items-center gap-3'>
					<button className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-black shadow-sm'>
						<Download className='h-4 w-4' />
						Eksport
					</button>
					<button className='rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 shadow-sm'>
						Yangi buyurtma
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
								placeholder='ID, ism yoki email...'
								className='w-full rounded-lg border border-gray-200 py-1.5 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400'
							/>
						</div>
						<button className='flex items-center justify-center rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-black md:hidden'>
							<Filter className='h-5 w-5' />
						</button>
					</div>
				</div>

				{/* Jadval */}
				{/* Jadval */}
				<div className='overflow-x-auto'>
					{/* O'ZGARISH: whitespace-nowrap ni olib tashladik */}
					<table className='w-full text-left text-sm'>
						<thead className='border-b border-gray-100 bg-gray-50/50 text-gray-500'>
							<tr>
								{/* ID ustuni faqat kattaroq ekranlarda chiqadi */}
								<th className='hidden sm:table-cell px-6 py-3.5 font-medium'>
									ID
								</th>
								<th className='px-6 py-3.5 font-medium'>Mahsulot</th>
								<th className='px-6 py-3.5 font-medium'>Mijoz</th>
								{/* Sana ustuni faqat desktopda chiqadi */}
								<th className='hidden md:table-cell px-6 py-3.5 font-medium'>
									Sana
								</th>
								<th className='px-6 py-3.5 font-medium'>Holati</th>
								<th className='px-6 py-3.5 font-medium text-right'>Summa</th>
								<th className='px-6 py-3.5 font-medium text-right'></th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100'>
							{filteredOrders.length > 0 ? (
								filteredOrders.map(order => (
									<tr
										key={order.id}
										className='transition-colors hover:bg-gray-50/50 group'
									>
										{/* ID */}
										<td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap'>
											<div className='font-mono text-xs font-semibold text-gray-900'>
												{order.id}
											</div>
										</td>

										{/* Mahsulot (Rasm va nom) */}
										<td className='px-6 py-4'>
											<div className='flex items-center gap-3'>
												<div className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white overflow-hidden'>
													{/* eslint-disable-next-line @next/next/no-img-element */}
													<img
														src={order.products[0].image}
														alt={order.products[0].name}
														className='h-full w-full object-cover transition-transform group-hover:scale-105'
													/>
												</div>
												<div className='flex flex-col min-w-[120px]'>
													{/* O'ZGARISH: block va truncate klasslari orqali uzun nomlar oxiri ... bilan tugaydi */}
													<span className='font-medium text-gray-900 block truncate max-w-[150px] lg:max-w-[200px]'>
														{order.products[0].name}
													</span>
													{order.products.length > 1 && (
														<span className='text-xs text-gray-500 mt-0.5'>
															+ {order.products.length - 1} ta mahsulot
														</span>
													)}
												</div>
											</div>
										</td>

										{/* Mijoz */}
										<td className='px-6 py-4'>
											<div className='font-medium text-gray-900 block truncate max-w-[120px] lg:max-w-[180px]'>
												{order.customer}
											</div>
											<div className='mt-0.5 text-xs text-gray-500 block truncate max-w-[120px] lg:max-w-[180px]'>
												{order.email}
											</div>
										</td>

										{/* Sana */}
										<td className='hidden md:table-cell px-6 py-4 font-mono text-xs text-gray-600 whitespace-nowrap'>
											{order.date}
										</td>

										{/* Holati */}
										<td className='px-6 py-4 whitespace-nowrap'>
											<span
												className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${
													order.status === 'Yetkazib berildi'
														? 'border-emerald-200 bg-emerald-50 text-emerald-700'
														: order.status === 'Jarayonda'
															? 'border-blue-200 bg-blue-50 text-blue-700'
															: 'border-red-200 bg-red-50 text-red-700'
												}`}
											>
												{order.status}
											</span>
										</td>

										{/* Summa */}
										<td className='px-6 py-4 text-right font-mono text-sm font-semibold text-gray-900 whitespace-nowrap'>
											{order.amount}
										</td>

										{/* Action tugma */}
										<td className='px-6 py-4 text-right whitespace-nowrap'>
											<button className='inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-black'>
												<MoreHorizontal className='h-5 w-5' />
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={7}
										className='px-6 py-12 text-center text-sm text-gray-500'
									>
										Ushbu bo'limda buyurtmalar topilmadi.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Paginatsiya (Vercel Footer Style) */}
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
