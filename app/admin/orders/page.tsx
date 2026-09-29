'use client'

import { Badge } from '@/components/ui/badge'
import {
	ArrowUpRight,
	CheckCircle2,
	Clock,
	Download,
	Eye,
	Package,
	Search,
	ShoppingBag,
	Truck,
	XCircle,
} from 'lucide-react'
import * as React from 'react'

// --- TYPESCRIPT INTERFACES ---
interface StatItem {
	title: string
	value: string
	trend: string
	isPositive: boolean
	icon: React.ComponentType<{ className?: string }>
}

interface IOrder {
	id: string
	customer: string
	email: string
	date: string
	status:
		| 'Yangi'
		| 'Jarayonda'
		| 'Yetkazilmoqda'
		| 'Yakunlangan'
		| 'Bekor qilingan'
	paymentStatus: "To'langan" | 'Kutilmoqda' | 'Qaytarildi'
	itemsCount: number
	amount: number
}

// --- MOCK DATA ---
const STATS: StatItem[] = [
	{
		title: 'Jami buyurtmalar',
		value: '2,458',
		trend: '+12.5%',
		isPositive: true,
		icon: ShoppingBag,
	},
	{
		title: 'Yangi',
		value: '45',
		trend: '+5.2%',
		isPositive: true,
		icon: Package,
	},
	{
		title: 'Yetkazilmoqda',
		value: '128',
		trend: '-2.4%',
		isPositive: false,
		icon: Truck,
	},
	{
		title: 'Daromad (Oylik)',
		value: '$45,231.00',
		trend: '+14.2%',
		isPositive: true,
		icon: CheckCircle2,
	},
]

const ORDERS_DATA: IOrder[] = [
	{
		id: 'ORD-7835',
		customer: 'Temurbek Samatov',
		email: 'temur@example.com',
		date: '28 Sen, 2026, 14:30',
		status: 'Yangi',
		paymentStatus: "To'langan",
		itemsCount: 3,
		amount: 1299.0,
	},
	{
		id: 'ORD-7834',
		customer: 'Malika Azizova',
		email: 'malika.a@example.com',
		date: '28 Sen, 2026, 11:15',
		status: 'Jarayonda',
		paymentStatus: "To'langan",
		itemsCount: 1,
		amount: 349.0,
	},
	{
		id: 'ORD-7833',
		customer: 'Alisher Usmonov',
		email: 'alisher99@example.com',
		date: '27 Sen, 2026, 16:45',
		status: 'Yetkazilmoqda',
		paymentStatus: "To'langan",
		itemsCount: 4,
		amount: 2450.0,
	},
	{
		id: 'ORD-7832',
		customer: 'Sardor Rahimxon',
		email: 'sardor.r@example.com',
		date: '27 Sen, 2026, 09:20',
		status: 'Yakunlangan',
		paymentStatus: "To'langan",
		itemsCount: 2,
		amount: 89.0,
	},
	{
		id: 'ORD-7831',
		customer: 'Doston Ergashov',
		email: 'doston.e@example.com',
		date: '26 Sen, 2026, 18:10',
		status: 'Bekor qilingan',
		paymentStatus: 'Qaytarildi',
		itemsCount: 1,
		amount: 2199.0,
	},
	{
		id: 'ORD-7830',
		customer: 'Javohir Tojiyev',
		email: 'jav.t@example.com',
		date: '26 Sen, 2026, 12:05',
		status: 'Yakunlangan',
		paymentStatus: "To'langan",
		itemsCount: 5,
		amount: 450.0,
	},
]

const TABS = [
	'Barchasi',
	'Yangi',
	'Jarayonda',
	'Yetkazilmoqda',
	'Yakunlangan',
	'Bekor qilingan',
]

// Holat ranglari va ikonkalari uchun yordamchi funksiyalar
const getOrderStatusConfig = (status: string) => {
	switch (status) {
		case 'Yangi':
			return { color: 'bg-blue-50 text-blue-700', icon: Package }
		case 'Jarayonda':
			return { color: 'bg-amber-50 text-amber-700', icon: Clock }
		case 'Yetkazilmoqda':
			return { color: 'bg-indigo-50 text-indigo-700', icon: Truck }
		case 'Yakunlangan':
			return { color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 }
		case 'Bekor qilingan':
			return { color: 'bg-red-50 text-red-700', icon: XCircle }
		default:
			return { color: 'bg-gray-100 text-gray-700', icon: ShoppingBag }
	}
}

const getPaymentStatusColor = (status: string) => {
	switch (status) {
		case "To'langan":
			return 'text-emerald-600 bg-emerald-50/50 border border-emerald-100'
		case 'Kutilmoqda':
			return 'text-amber-600 bg-amber-50/50 border border-amber-100'
		case 'Qaytarildi':
			return 'text-gray-500 bg-gray-50 border border-gray-200'
		default:
			return 'text-gray-500 bg-gray-50 border border-gray-200'
	}
}

export default function AdminOrdersPage() {
	const [activeTab, setActiveTab] = React.useState<string>('Barchasi')
	const [searchTerm, setSearchTerm] = React.useState<string>('')

	// Filtrlash mantiqi
	const filteredOrders = ORDERS_DATA.filter(order => {
		const matchesTab =
			activeTab === 'Barchasi' ? true : order.status === activeTab
		const matchesSearch =
			order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.customer.toLowerCase().includes(searchTerm.toLowerCase())
		return matchesTab && matchesSearch
	})

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4'>
			{/* 1. HEADER */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						Buyurtmalar
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						Do'koningizdagi barcha xaridlarni nazorat qiling va boshqaring.
					</p>
				</div>
				<div>
					<button className='font-montserrat flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-black shadow-sm cursor-pointer'>
						<Download className='h-4 w-4' />
						Eksport CSV
					</button>
				</div>
			</div>

			{/* 2. KPI STATS CARDS */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
				{STATS.map((stat, index) => {
					const Icon = stat.icon
					return (
						<div
							key={index}
							className='flex flex-col justify-between bg-white border border-gray-200/80 rounded-[24px] p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/20 group'
						>
							<div className='flex items-center justify-between'>
								<span className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors'>
									{stat.title}
								</span>
								<div className='w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
									<Icon className='w-4 h-4 text-gray-600' />
								</div>
							</div>
							<div className='mt-6 flex items-baseline gap-3'>
								<h2 className='font-space-grotesk text-3xl font-black tracking-tight text-gray-900'>
									{stat.value}
								</h2>
								<span
									className={`font-montserrat text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center ${
										stat.isPositive
											? 'text-emerald-700 bg-emerald-50'
											: 'text-red-700 bg-red-50'
									}`}
								>
									{stat.isPositive ? (
										<ArrowUpRight className='w-3 h-3 mr-0.5' />
									) : (
										<ArrowUpRight className='w-3 h-3 mr-0.5 rotate-90' />
									)}
									{stat.trend}
								</span>
							</div>
						</div>
					)
				})}
			</div>

			{/* 3. ASOSIY JADVAL */}
			<div className='flex flex-col rounded-[24px] border border-gray-200/80 bg-white shadow-sm overflow-hidden'>
				{/* Yuqori Panel: Tablar va Qidiruv */}
				<div className='flex flex-col border-b border-gray-100 p-5 gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-50/30'>
					<div className='flex items-center gap-1 rounded-xl bg-gray-100/80 p-1 border border-gray-200/60 overflow-x-auto custom-scrollbar'>
						{TABS.map(tab => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`font-montserrat whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
									activeTab === tab
										? 'bg-white text-black shadow-sm border border-gray-200/60 scale-[1.02]'
										: 'text-gray-500 hover:text-gray-900'
								}`}
							>
								{tab}
							</button>
						))}
					</div>

					<div className='relative w-full lg:w-72 shrink-0'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<input
							type='text'
							placeholder='ID yoki mijoz ismini qidirish...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm font-montserrat'
						/>
					</div>
				</div>

				{/* Jadval qismi: min-h-[480px] orqali Layout Shift'ning oldi olindi */}
				<div className='overflow-x-auto min-h-[480px]'>
					<table className='w-full text-left border-collapse'>
						<thead>
							<tr className='bg-gray-50/50 border-b border-gray-100 text-gray-500'>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Buyurtma
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Mijoz
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Holat
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									To'lov
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6 text-right'>
									Summa
								</th>
								<th className='py-4 px-6'></th>
							</tr>
						</thead>
						<tbody
							key={activeTab}
							className='divide-y divide-gray-100 font-montserrat animate-in fade-in-50 duration-300'
						>
							{filteredOrders.length > 0 ? (
								filteredOrders.map(order => {
									const { color: statusColor, icon: StatusIcon } =
										getOrderStatusConfig(order.status)
									const paymentColor = getPaymentStatusColor(
										order.paymentStatus,
									)

									return (
										<tr
											key={order.id}
											className='group hover:bg-gray-50/50 transition-colors'
										>
											<td className='py-4 px-6 whitespace-nowrap'>
												<div className='flex items-center space-x-3'>
													<div className='p-2 bg-gray-50 rounded-xl group-hover:bg-white border border-gray-100 group-hover:border-gray-200 transition-all shadow-sm'>
														<ShoppingBag className='w-4 h-4 text-gray-500' />
													</div>
													<div className='flex flex-col'>
														<span className='font-space-grotesk text-sm font-bold text-black'>
															{order.id}
														</span>
														<span className='text-[11px] text-gray-400 mt-0.5 font-medium'>
															{order.date}
														</span>
													</div>
												</div>
											</td>

											<td className='py-4 px-6 whitespace-nowrap'>
												<div className='flex flex-col'>
													<span className='text-sm font-semibold text-gray-900'>
														{order.customer}
													</span>
													<span className='text-[11px] text-gray-500 mt-0.5'>
														{order.email}
													</span>
												</div>
											</td>

											<td className='py-4 px-6 whitespace-nowrap'>
												<Badge
													variant='outline'
													className={`text-[10px] font-bold px-2.5 py-1 border-none flex items-center gap-1.5 w-max ${statusColor}`}
												>
													<StatusIcon className='w-3 h-3' />
													{order.status}
												</Badge>
											</td>

											<td className='py-4 px-6 whitespace-nowrap'>
												<span
													className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${paymentColor}`}
												>
													{order.paymentStatus}
												</span>
											</td>

											<td className='py-4 px-6 text-right whitespace-nowrap'>
												<div className='flex flex-col items-end'>
													<span className='font-space-grotesk text-sm font-bold text-black'>
														$
														{order.amount.toLocaleString(undefined, {
															minimumFractionDigits: 2,
														})}
													</span>
													<span className='text-[11px] text-gray-400 mt-0.5 font-medium'>
														{order.itemsCount} ta mahsulot
													</span>
												</div>
											</td>

											<td className='py-4 px-6 text-right whitespace-nowrap'>
												{/* Hoverda chiqadigan ko'rish tugmasi (Eye icon) */}
												<button
													className='inline-flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm cursor-pointer'
													title='Batafsil ko`rish'
												>
													<Eye className='w-4 h-4' />
												</button>
											</td>
										</tr>
									)
								})
							) : (
								<tr>
									<td
										colSpan={6}
										className='py-20 text-center text-sm text-gray-500 font-medium'
									>
										Ushbu qidiruv yoki filtr bo'yicha buyurtmalar topilmadi.
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
