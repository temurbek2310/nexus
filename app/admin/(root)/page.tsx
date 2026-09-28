'use client'

import { Badge } from '@/components/ui/badge'
import {
	Activity,
	ArrowUpRight,
	CreditCard,
	DollarSign,
	Download,
	Package,
	Plus,
	ShoppingBag,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// --- MOCK DATA ---
const STATS = [
	{
		title: 'Jami daromad',
		value: '$124,563.00',
		trend: '+14.5%',
		isPositive: true,
		icon: DollarSign,
	},
	{
		title: 'Buyurtmalar (Oylik)',
		value: '1,248',
		trend: '+8.2%',
		isPositive: true,
		icon: ShoppingBag,
	},
	{
		title: 'Faol mijozlar',
		value: '8,432',
		trend: '+12.1%',
		isPositive: true,
		icon: Users,
	},
	{
		title: 'Konversiya',
		value: '3.24%',
		trend: '-0.4%',
		isPositive: false,
		icon: Activity,
	},
]

const RECENT_ORDERS = [
	{
		id: 'ORD-7832',
		customer: 'Temurbek Samatov',
		date: '28 Sen, 2026',
		amount: 1299.0,
		status: "To'langan",
		items: 3,
	},
	{
		id: 'ORD-7831',
		customer: 'Alisher Usmonov',
		date: '28 Sen, 2026',
		amount: 349.0,
		status: 'Kutilmoqda',
		items: 1,
	},
	{
		id: 'ORD-7830',
		customer: 'Malika Azizova',
		date: '27 Sen, 2026',
		amount: 89.0,
		status: "To'langan",
		items: 2,
	},
	{
		id: 'ORD-7829',
		customer: 'Sardor Rahimxon',
		date: '27 Sen, 2026',
		amount: 2199.0,
		status: 'Bekor qilingan',
		items: 1,
	},
]

const getStatusColor = (status: string) => {
	switch (status) {
		case "To'langan":
			return 'bg-emerald-50 text-emerald-700'
		case 'Kutilmoqda':
			return 'bg-amber-50 text-amber-700'
		case 'Bekor qilingan':
			return 'bg-red-50 text-red-700'
		default:
			return 'bg-gray-50 text-gray-700'
	}
}

export default function AdminDashboardPage() {
	// Sanani saqlash uchun state (Serverda bo'sh turadi)
	const [today, setToday] = useState<string>('')

	// Faqat brauzerda ishlashi uchun useEffect qoshildi
	useEffect(() => {
		setToday(
			new Date().toLocaleDateString('uz-UZ', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}),
		)
	}, [])

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12'>
			{/* 1. HEADER */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						Xush kelibsiz, Admin 👋
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium min-h-[20px]'>
						{today ? `Bugun ${today}. ` : ''}Do'koningizdagi so'nggi ma'lumotlar
						bilan tanishing.
					</p>
				</div>
				<div className='flex items-center gap-3'>
					<Link
						href='/admin/products'
						className='font-montserrat flex items-center gap-2 rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-all shadow-sm'
					>
						<Plus className='w-4 h-4' />
						Yangi mahsulot
					</Link>
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

			{/* 3. MAIN CONTENT (Split Layout) */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10'>
				{/* Chap tomon: So'nggi Buyurtmalar (Katta qism) */}
				<div className='lg:col-span-2 flex flex-col space-y-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h2 className='font-space-grotesk text-xl font-bold text-black'>
								So'nggi buyurtmalar
							</h2>
						</div>
						<Link
							href='/admin/orders'
							className='font-montserrat text-sm font-semibold text-gray-500 hover:text-black transition-colors'
						>
							Barchasini ko'rish →
						</Link>
					</div>

					<div className='bg-white border border-gray-200/80 rounded-[24px] overflow-hidden shadow-sm'>
						<div className='overflow-x-auto'>
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
										<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6 text-right'>
											Summa
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-100 font-montserrat'>
									{RECENT_ORDERS.map(order => (
										<tr
											key={order.id}
											className='group hover:bg-gray-50/50 transition-colors cursor-pointer'
										>
											<td className='py-4 px-6 whitespace-nowrap'>
												<div className='flex flex-col'>
													<span className='font-space-grotesk font-bold text-sm text-black'>
														{order.id}
													</span>
													<span className='text-[11px] text-gray-400 mt-0.5 font-medium'>
														{order.date}
													</span>
												</div>
											</td>
											<td className='py-4 px-6 whitespace-nowrap'>
												<div className='flex flex-col'>
													<span className='text-sm font-medium text-gray-900'>
														{order.customer}
													</span>
													<span className='text-xs text-gray-500 mt-0.5'>
														{order.items} ta mahsulot
													</span>
												</div>
											</td>
											<td className='py-4 px-6 whitespace-nowrap'>
												<Badge
													variant='outline'
													className={`text-[10px] font-bold px-2.5 py-1 border-none ${getStatusColor(
														order.status,
													)}`}
												>
													{order.status}
												</Badge>
											</td>
											<td className='py-4 px-6 text-right whitespace-nowrap'>
												<span className='font-space-grotesk text-sm font-bold text-black'>
													$
													{order.amount.toLocaleString(undefined, {
														minimumFractionDigits: 2,
													})}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* O'ng tomon: Tezkor amallar (Quick Actions) */}
				<div className='flex flex-col space-y-6'>
					<div>
						<h2 className='font-space-grotesk text-xl font-bold text-black'>
							Tezkor amallar
						</h2>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
						{/* Tezkor kartochkalar */}
						<Link
							href='/admin/products'
							className='group bg-white border border-gray-200/80 rounded-[20px] p-5 flex items-center gap-4 hover:border-black/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all'
						>
							<div className='w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors'>
								<Package className='w-5 h-5 text-gray-600 group-hover:text-white' />
							</div>
							<div>
								<h3 className='font-space-grotesk font-bold text-black text-base'>
									Mahsulotlar
								</h3>
								<p className='font-montserrat text-xs text-gray-500 font-medium mt-0.5'>
									Katalogni boshqarish
								</p>
							</div>
						</Link>

						<Link
							href='/admin/coupons'
							className='group bg-white border border-gray-200/80 rounded-[20px] p-5 flex items-center gap-4 hover:border-black/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all'
						>
							<div className='w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors'>
								<CreditCard className='w-5 h-5 text-gray-600 group-hover:text-white' />
							</div>
							<div>
								<h3 className='font-space-grotesk font-bold text-black text-base'>
									Kuponlar
								</h3>
								<p className='font-montserrat text-xs text-gray-500 font-medium mt-0.5'>
									Chegirmalar yaratish
								</p>
							</div>
						</Link>

						<button className='group bg-transparent border-2 border-dashed border-gray-200 rounded-[20px] p-5 flex flex-col items-center justify-center text-center min-h-[140px] hover:border-black hover:bg-gray-50/50 transition-all duration-300 mt-2'>
							<div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-black transition-colors'>
								<Download className='w-4 h-4 text-gray-500 group-hover:text-white' />
							</div>
							<span className='font-space-grotesk text-sm font-bold text-black'>
								Hisobotni yuklash
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
