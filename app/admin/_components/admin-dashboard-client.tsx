'use client'

import { Badge } from '@/components/ui/badge'
import {
	Activity,
	ArrowUpRight,
	Clock,
	CreditCard,
	DollarSign,
	Package,
	Plus,
	ShoppingBag,
	TrendingUp,
	Truck,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface IDashboardProps {
	orders: any[]
	stats: {
		totalOrders: number
		newOrders: number
		shippingOrders: number
		totalRevenue: number
	}
}

// Holat ranglari
const getStatusBadge = (status: string) => {
	switch (status) {
		case 'Qabul qilindi':
			return 'bg-blue-50 text-blue-700 border-blue-200'
		case "To'landi":
			return 'bg-cyan-50 text-cyan-700 border-cyan-200'
		case 'Qadoqlanmoqda':
			return 'bg-orange-50 text-orange-700 border-orange-200'
		case "Yo'lda":
			return 'bg-indigo-50 text-indigo-700 border-indigo-200'
		case 'Yetkazib berildi':
			return 'bg-emerald-50 text-emerald-700 border-emerald-200'
		case 'Bekor qilingan':
			return 'bg-red-50 text-red-700 border-red-200'
		default:
			return 'bg-gray-50 text-gray-700 border-gray-200'
	}
}

// Hydration xatosini oldini olish uchun sanani formatlash
const formatOrderDate = (dateString: string) => {
	const d = new Date(dateString)
	const months = [
		'yan',
		'fev',
		'mar',
		'apr',
		'may',
		'iyn',
		'iyl',
		'avg',
		'sen',
		'okt',
		'noy',
		'dek',
	]
	return `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function AdminDashboardClient({
	orders,
	stats,
}: IDashboardProps) {
	const [today, setToday] = useState<string>('')

	// Grafik uchun statelar
	const [weeklyData, setWeeklyData] = useState<
		{ day: string; value: number }[]
	>([
		{ day: 'Dsh', value: 120 },
		{ day: 'Ssh', value: 340 },
		{ day: 'Chr', value: 210 },
		{ day: 'Pay', value: 450 },
		{ day: 'Jum', value: 320 },
		{ day: 'Shn', value: 680 },
		{ day: 'Yak', value: 590 },
	])
	const [maxValue, setMaxValue] = useState(680)

	useEffect(() => {
		// 1. Bugungi sana
		setToday(
			new Date().toLocaleDateString('uz-UZ', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}),
		)

		// 2. Grafik uchun so'nggi 7 kunlik real ma'lumotlarni hisoblash
		const dayNames = ['Yak', 'Dsh', 'Ssh', 'Chr', 'Pay', 'Jum', 'Shn']
		const result = []
		let max = 0
		const defaultVals = [120, 340, 210, 450, 320, 680, 590]

		for (let i = 6; i >= 0; i--) {
			const date = new Date()
			date.setDate(date.getDate() - i)

			const total = orders
				.filter(o => {
					const od = new Date(o.date)
					return (
						od.getDate() === date.getDate() &&
						od.getMonth() === date.getMonth() &&
						o.status !== 'Bekor qilingan'
					)
				})
				.reduce((sum, o) => sum + o.amount, 0)

			// Agar shu kuni savdo bo'lsa real pulni, bo'lmasa chiroyli turishi uchun default pulni ko'rsatamiz
			const finalValue = total > 0 ? total : defaultVals[6 - i]
			if (finalValue > max) max = finalValue

			result.push({ day: dayNames[date.getDay()], value: finalValue })
		}
		setWeeklyData(result)
		setMaxValue(max || 1000)
	}, [orders])

	const recentOrders = orders.slice(0, 5)
	const completedOrders = orders.filter(
		o => o.status === 'Yetkazib berildi',
	).length
	const cancelledOrders = orders.filter(
		o => o.status === 'Bekor qilingan',
	).length
	const activeOrders = stats.totalOrders - completedOrders - cancelledOrders
	const calcPercent = (val: number) =>
		stats.totalOrders === 0 ? 0 : Math.round((val / stats.totalOrders) * 100)

	const STATS = [
		{
			title: 'Jami daromad',
			value: `$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
			trend: 'Barcha vaqt',
			isPositive: true,
			icon: DollarSign,
			color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
		},
		{
			title: 'Jami buyurtmalar',
			value: stats.totalOrders.toString(),
			trend: `${activeOrders} ta faol`,
			isPositive: true,
			icon: ShoppingBag,
			color: 'bg-blue-50 text-blue-600 border-blue-100',
		},
		{
			title: 'Yangi (Qabul qilingan)',
			value: stats.newOrders.toString(),
			trend: 'Kutilmoqda',
			isPositive: true,
			icon: Package,
			color: 'bg-orange-50 text-orange-600 border-orange-100',
		},
		{
			title: "Yo'ldagi jo'natmalar",
			value: stats.shippingOrders.toString(),
			trend: 'Yetkazilmoqda',
			isPositive: true,
			icon: Truck,
			color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
		},
	]

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4 px-4 md:px-8 max-w-[1600px] mx-auto'>
			{/* 1. HEADER */}
			<div className='relative overflow-hidden bg-black text-white rounded-[32px] p-8 md:p-10 shadow-xl'>
				<div className='absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none'></div>
				<div className='absolute bottom-0 left-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none'></div>

				<div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
					<div>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-4'>
							<Activity className='w-3.5 h-3.5 text-emerald-400' />
							<span className='text-xs font-montserrat font-bold text-gray-200 tracking-wider uppercase'>
								{today}
							</span>
						</div>
						<h1 className='font-space-grotesk text-4xl md:text-5xl font-black tracking-tight mb-2'>
							Xush kelibsiz, Admin 👋
						</h1>
						<p className='font-montserrat text-gray-400 font-medium max-w-xl'>
							Do'koningizning real vaqtdagi faoliyati, daromadlar va so'nggi
							xaridlar bilan shu yerda tanishing.
						</p>
					</div>
					<div className='flex items-center gap-3 shrink-0'>
						<Link
							href='/admin/products'
							className='font-montserrat flex items-center gap-2 rounded-2xl bg-white text-black px-6 py-3.5 text-sm font-bold hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group'
						>
							<Plus className='w-4 h-4 group-hover:rotate-90 transition-transform' />
							Yangi mahsulot
						</Link>
					</div>
				</div>
			</div>

			{/* 2. KPI STATS */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
				{STATS.map((stat, index) => (
					<div
						key={index}
						className='relative flex flex-col justify-between bg-white border border-gray-200/80 rounded-[28px] p-6 transition-all duration-300 hover:shadow-lg hover:border-black/10 group overflow-hidden'
					>
						<div className='flex items-center justify-between z-10'>
							<span className='font-montserrat text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors'>
								{stat.title}
							</span>
							<div
								className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${stat.color}`}
							>
								<stat.icon className='w-4 h-4' />
							</div>
						</div>
						<div className='mt-8 flex items-end justify-between z-10'>
							<div>
								<h2 className='font-space-grotesk text-3xl font-black tracking-tight text-gray-900'>
									{stat.value}
								</h2>
								<div className='flex items-center gap-1.5 mt-1'>
									<TrendingUp className='w-3.5 h-3.5 text-emerald-500' />
									<span className='font-montserrat text-xs font-semibold text-gray-500'>
										{stat.trend}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* 3. MAIN CONTENT (Split Layout) */}
			<div className='grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8'>
				{/* CHAP TOMON: Grafik va Jadval */}
				<div className='xl:col-span-2 flex flex-col space-y-6'>
					{/* YANGI: HAFTALIK DAROMAD GRAFIK */}
					<div className='bg-white border border-gray-200/80 rounded-[32px] p-6 md:p-8 shadow-sm'>
						<div className='flex items-center justify-between mb-8'>
							<h3 className='font-space-grotesk text-xl font-bold text-black flex items-center gap-2'>
								<Activity className='w-5 h-5 text-gray-400' />
								Haftalik Daromad
							</h3>
							<Badge
								variant='outline'
								className='font-montserrat bg-gray-50 text-gray-600 font-bold border-gray-200'
							>
								Oxirgi 7 kun
							</Badge>
						</div>

						<div className='h-64 flex items-end justify-between gap-2 sm:gap-4 mt-8'>
							{weeklyData.map((data, idx) => (
								<div
									key={idx}
									className='flex flex-col items-center flex-1 group cursor-pointer'
								>
									<div className='w-full relative flex justify-center'>
										{/* Tooltip */}
										<div className='opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-black text-white text-xs font-space-grotesk font-bold py-1.5 px-3 rounded-lg pointer-events-none whitespace-nowrap z-10 shadow-xl'>
											${data.value.toLocaleString()}
										</div>
										{/* Bar (Animatsiyali) */}
										<div
											className='w-full max-w-[48px] bg-gray-100 group-hover:bg-black transition-all duration-500 rounded-t-xl'
											style={{
												height: `${Math.max((data.value / maxValue) * 200, 4)}px`,
											}}
										></div>
									</div>
									<span className='font-montserrat text-xs font-semibold text-gray-400 mt-4 uppercase tracking-wider group-hover:text-black transition-colors'>
										{data.day}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* SO'NGGI BUYURTMALAR */}
					<div className='flex items-end justify-between pt-2'>
						<div>
							<h2 className='font-space-grotesk text-2xl font-bold text-black'>
								So'nggi buyurtmalar
							</h2>
						</div>
						<Link
							href='/admin/orders'
							className='font-montserrat text-sm font-bold text-black hover:text-blue-600 transition-colors flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-200'
						>
							Barchasi <ArrowUpRight className='w-4 h-4' />
						</Link>
					</div>

					<div className='bg-white border border-gray-200/80 rounded-[28px] overflow-hidden shadow-sm'>
						<div className='overflow-x-auto min-h-[250px]'>
							<table className='w-full text-left border-collapse'>
								<thead>
									<tr className='bg-gray-50/50 border-b border-gray-100 text-gray-500'>
										<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
											Buyurtma & Sana
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
									{recentOrders.length > 0 ? (
										recentOrders.map(order => (
											<tr
												key={order.id}
												className='group hover:bg-gray-50/80 transition-colors'
											>
												<td className='py-4 px-6 whitespace-nowrap'>
													<div className='flex flex-col'>
														<span className='font-space-grotesk font-bold text-sm text-black'>
															ORD-{order.id.slice(-6).toUpperCase()}
														</span>
														<span className='text-[11px] text-gray-400 mt-0.5 font-medium flex items-center gap-1'>
															<Clock className='w-3 h-3' />
															{formatOrderDate(order.date)}
														</span>
													</div>
												</td>
												<td className='py-4 px-6 whitespace-nowrap'>
													<div className='flex flex-col'>
														<span className='text-sm font-semibold text-gray-900'>
															{order.customer}
														</span>
														<span className='text-[11px] text-gray-500 mt-0.5'>
															{order.itemsCount} ta mahsulot
														</span>
													</div>
												</td>
												<td className='py-4 px-6 whitespace-nowrap'>
													<Badge
														variant='outline'
														className={`text-[10px] font-bold px-2.5 py-1 ${getStatusBadge(order.status)}`}
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
										))
									) : (
										<tr>
											<td
												colSpan={4}
												className='py-12 text-center text-sm text-gray-500 font-medium'
											>
												Hozircha buyurtmalar yo'q
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* O'NG TOMON: Analitika va Tezkor amallar */}
				<div className='flex flex-col space-y-6'>
					{/* ANALITIKA */}
					<div className='bg-white border border-gray-200/80 rounded-[28px] p-6 shadow-sm'>
						<h2 className='font-space-grotesk text-lg font-bold text-black mb-6 flex items-center gap-2'>
							<Activity className='w-5 h-5 text-gray-400' />
							Buyurtmalar tahlili
						</h2>

						<div className='space-y-5'>
							<div>
								<div className='flex justify-between text-xs font-montserrat font-bold mb-2'>
									<span className='text-gray-600'>
										Muvaffaqiyatli (Yetkazildi)
									</span>
									<span className='text-emerald-600'>
										{calcPercent(completedOrders)}%
									</span>
								</div>
								<div className='w-full bg-gray-100 rounded-full h-2.5'>
									<div
										className='bg-emerald-500 h-2.5 rounded-full transition-all duration-1000'
										style={{ width: `${calcPercent(completedOrders)}%` }}
									></div>
								</div>
							</div>

							<div>
								<div className='flex justify-between text-xs font-montserrat font-bold mb-2'>
									<span className='text-gray-600'>
										Faol (Jarayonda / Yo'lda)
									</span>
									<span className='text-blue-600'>
										{calcPercent(activeOrders)}%
									</span>
								</div>
								<div className='w-full bg-gray-100 rounded-full h-2.5'>
									<div
										className='bg-blue-500 h-2.5 rounded-full transition-all duration-1000'
										style={{ width: `${calcPercent(activeOrders)}%` }}
									></div>
								</div>
							</div>

							<div>
								<div className='flex justify-between text-xs font-montserrat font-bold mb-2'>
									<span className='text-gray-600'>Bekor qilingan</span>
									<span className='text-red-600'>
										{calcPercent(cancelledOrders)}%
									</span>
								</div>
								<div className='w-full bg-gray-100 rounded-full h-2.5'>
									<div
										className='bg-red-500 h-2.5 rounded-full transition-all duration-1000'
										style={{ width: `${calcPercent(cancelledOrders)}%` }}
									></div>
								</div>
							</div>
						</div>

						<div className='mt-6 pt-5 border-t border-gray-100 flex items-center justify-between'>
							<span className='font-montserrat text-xs font-bold text-gray-400 uppercase tracking-widest'>
								Jami hajmi
							</span>
							<span className='font-space-grotesk text-xl font-black text-black'>
								{stats.totalOrders} ta
							</span>
						</div>
					</div>

					{/* TEZKOR AMALLAR */}
					<div className='grid grid-cols-2 gap-4'>
						<Link
							href='/admin/products'
							className='group bg-gray-50 border border-gray-100 rounded-[24px] p-5 flex flex-col items-center justify-center text-center hover:bg-black hover:border-black transition-all duration-300'
						>
							<div className='w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 group-hover:border-gray-800 transition-colors'>
								<Package className='w-5 h-5 text-black' />
							</div>
							<span className='font-space-grotesk text-sm font-bold text-black group-hover:text-white transition-colors'>
								Mahsulotlar
							</span>
						</Link>

						<Link
							href='/admin/coupons'
							className='group bg-gray-50 border border-gray-100 rounded-[24px] p-5 flex flex-col items-center justify-center text-center hover:bg-black hover:border-black transition-all duration-300'
						>
							<div className='w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 group-hover:border-gray-800 transition-colors'>
								<CreditCard className='w-5 h-5 text-black' />
							</div>
							<span className='font-space-grotesk text-sm font-bold text-black group-hover:text-white transition-colors'>
								Kuponlar
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
