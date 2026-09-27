'use client'

import {
	ArrowDownRight,
	ArrowUpRight,
	CheckCircle2,
	Clock,
	CreditCard,
	DollarSign,
	Download,
	Filter,
	MoreHorizontal,
	Search,
	XCircle,
} from 'lucide-react'
import { useState } from 'react'

// Moliya ko'rsatkichlari (Mock Data)
const STATS = [
	{
		title: 'Jami tushum',
		amount: '$45,231.89',
		trend: '+12.5%',
		isPositive: true,
	},
	{
		title: 'Kutilayotgan',
		amount: '$3,240.00',
		trend: '+2.1%',
		isPositive: true,
	},
	{
		title: 'Qaytarilgan (Refund)',
		amount: '$840.00',
		trend: '-1.4%',
		isPositive: false,
	},
	{
		title: 'Sof foyda',
		amount: '$41,151.89',
		trend: '+14.2%',
		isPositive: true,
	},
]

// Tranzaksiyalar tarixi (Mock Data)
const PAYMENTS_DATA = [
	{
		id: 'TXN-9823741',
		orderId: 'ORD-7352',
		customer: 'Temurbek Samatov',
		method: 'Visa',
		last4: '4242',
		amount: '+$299.00',
		status: 'Muvaffaqiyatli',
		date: '27 Sen, 2026, 10:42',
	},
	{
		id: 'TXN-9823740',
		orderId: 'ORD-7351',
		customer: 'Alisher Usmonov',
		method: 'Mastercard',
		last4: '8812',
		amount: '+$1,299.00',
		status: 'Kutilmoqda',
		date: '26 Sen, 2026, 15:30',
	},
	{
		id: 'TXN-9823739',
		orderId: 'ORD-7350',
		customer: 'Sardor Rahimxon',
		method: 'Apple Pay',
		last4: '',
		amount: '+$49.00',
		status: 'Xatolik',
		date: '26 Sen, 2026, 09:15',
	},
	{
		id: 'TXN-9823738',
		orderId: 'ORD-7349',
		customer: 'Javohir Tojiyev',
		method: 'Visa',
		last4: '1123',
		amount: '+$349.00',
		status: 'Muvaffaqiyatli',
		date: '25 Sen, 2026, 18:05',
	},
	{
		id: 'TXN-9823737',
		orderId: 'ORD-7348',
		customer: 'Malika Azizova',
		method: 'Mastercard',
		last4: '0098',
		amount: '-$150.00',
		status: 'Qaytarildi',
		date: '24 Sen, 2026, 11:20',
	},
	{
		id: 'TXN-9823736',
		orderId: 'ORD-7347',
		customer: 'Doston Ergashov',
		method: 'Uzcard',
		last4: '8600',
		amount: '+$45.00',
		status: 'Muvaffaqiyatli',
		date: '23 Sen, 2026, 14:10',
	},
]

const TABS = [
	'Barchasi',
	'Muvaffaqiyatli',
	'Kutilmoqda',
	'Xatolik',
	'Qaytarildi',
]

export default function PaymentsPage() {
	const [activeTab, setActiveTab] = useState('Barchasi')

	// Filtrlash
	const filteredPayments = PAYMENTS_DATA.filter(payment =>
		activeTab === 'Barchasi' ? true : payment.status === activeTab,
	)

	// Holatga qarab ikonka va rang tanlash funksiyasi
	const getStatusDisplay = (status: string) => {
		switch (status) {
			case 'Muvaffaqiyatli':
				return {
					color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
					icon: <CheckCircle2 className='w-3 h-3 mr-1.5' />,
				}
			case 'Kutilmoqda':
				return {
					color: 'text-amber-700 bg-amber-50 border-amber-200',
					icon: <Clock className='w-3 h-3 mr-1.5' />,
				}
			case 'Xatolik':
				return {
					color: 'text-red-700 bg-red-50 border-red-200',
					icon: <XCircle className='w-3 h-3 mr-1.5' />,
				}
			case 'Qaytarildi':
				return {
					color: 'text-gray-700 bg-gray-100 border-gray-300',
					icon: <ArrowDownRight className='w-3 h-3 mr-1.5' />,
				}
			default:
				return { color: 'text-gray-700 bg-gray-50 border-gray-200', icon: null }
		}
	}

	return (
		<div className='flex flex-col gap-6 pb-10 pt-4'>
			{/* Sarlavha qismi */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
						To'lovlar
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Barcha moliyaviy tranzaksiyalar va to'lov holatlarini kuzatib
						boring.
					</p>
				</div>
				<div className='flex items-center gap-3'>
					<button className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-black shadow-sm'>
						<Download className='h-4 w-4' />
						CSV yuklash
					</button>
				</div>
			</div>

			{/* KPI Ko'rsatkichlar (Stats) */}
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{STATS.map((stat, index) => (
					<div
						key={index}
						className='flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-gray-300'
					>
						<div className='flex items-center justify-between'>
							<span className='text-sm font-medium text-gray-500'>
								{stat.title}
							</span>
							<DollarSign className='h-4 w-4 text-gray-400' />
						</div>
						<div className='mt-4 flex items-baseline gap-2'>
							<h2 className='text-2xl font-bold tracking-tight text-gray-900'>
								{stat.amount}
							</h2>
							<span
								className={`text-xs font-medium px-1.5 py-0.5 rounded-md flex items-center ${
									stat.isPositive
										? 'text-emerald-700 bg-emerald-50'
										: 'text-red-700 bg-red-50'
								}`}
							>
								{stat.isPositive ? (
									<ArrowUpRight className='w-3 h-3 mr-0.5' />
								) : (
									<ArrowDownRight className='w-3 h-3 mr-0.5' />
								)}
								{stat.trend}
							</span>
						</div>
					</div>
				))}
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
								placeholder='Tranzaksiya yoki Mijoz...'
								className='w-full rounded-lg border border-gray-200 py-1.5 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400'
							/>
						</div>
						<button className='flex items-center justify-center rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-black md:hidden'>
							<Filter className='h-5 w-5' />
						</button>
					</div>
				</div>

				{/* Jadval */}
				<div className='overflow-x-auto'>
					<table className='w-full text-left text-sm'>
						<thead className='border-b border-gray-100 bg-gray-50/50 text-gray-500'>
							<tr>
								<th className='px-6 py-3.5 font-medium'>Tranzaksiya ID</th>
								<th className='px-6 py-3.5 font-medium'>Mijoz / Buyurtma</th>
								<th className='hidden sm:table-cell px-6 py-3.5 font-medium'>
									To'lov turi
								</th>
								<th className='px-6 py-3.5 font-medium text-right'>Summa</th>
								<th className='hidden lg:table-cell px-6 py-3.5 font-medium text-right'>
									Sana
								</th>
								<th className='px-6 py-3.5 font-medium text-right'></th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100'>
							{filteredPayments.length > 0 ? (
								filteredPayments.map(payment => {
									const statusStyle = getStatusDisplay(payment.status)
									const isRefund = payment.amount.startsWith('-')

									return (
										<tr
											key={payment.id}
											className='transition-colors hover:bg-gray-50/50 group'
										>
											{/* Tranzaksiya ID */}
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex flex-col'>
													<span className='font-mono text-xs font-semibold text-gray-900'>
														{payment.id}
													</span>
													<span
														className={`inline-flex items-center w-fit mt-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusStyle.color}`}
													>
														{statusStyle.icon}
														{payment.status}
													</span>
												</div>
											</td>

											{/* Mijoz va Order */}
											<td className='px-6 py-4'>
												<div className='font-medium text-gray-900 block truncate max-w-[120px] md:max-w-[200px]'>
													{payment.customer}
												</div>
												<div className='mt-0.5 font-mono text-xs text-gray-500 hover:text-blue-600 cursor-pointer transition-colors'>
													{payment.orderId}
												</div>
											</td>

											{/* To'lov turi (Kichik ekranlarda yashiriladi) */}
											<td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center gap-2'>
													<div className='flex items-center justify-center h-6 w-9 rounded border border-gray-200 bg-gray-50'>
														<CreditCard className='w-3.5 h-3.5 text-gray-500' />
													</div>
													<div className='flex flex-col'>
														<span className='text-xs font-medium text-gray-900'>
															{payment.method}
														</span>
														{payment.last4 && (
															<span className='font-mono text-[10px] text-gray-500'>
																•••• {payment.last4}
															</span>
														)}
													</div>
												</div>
											</td>

											{/* Summa (Qaytarilgan bo'lsa qizil, tushgan bo'lsa oddiy) */}
											<td className='px-6 py-4 text-right whitespace-nowrap'>
												<span
													className={`font-mono text-sm font-semibold ${isRefund ? 'text-gray-900' : 'text-gray-900'}`}
												>
													{payment.amount}
												</span>
											</td>

											{/* Sana (Faqat katta ekranlarda) */}
											<td className='hidden lg:table-cell px-6 py-4 text-right whitespace-nowrap'>
												<span className='text-xs text-gray-500'>
													{payment.date}
												</span>
											</td>

											{/* Harakatlar */}
											<td className='px-6 py-4 text-right whitespace-nowrap'>
												<button className='inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-black'>
													<MoreHorizontal className='h-5 w-5' />
												</button>
											</td>
										</tr>
									)
								})
							) : (
								<tr>
									<td
										colSpan={6}
										className='px-6 py-12 text-center text-sm text-gray-500'
									>
										Ushbu holat bo'yicha tranzaksiyalar topilmadi.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
