'use client'

import {
	ArrowRight,
	ArrowUpRight,
	Clock,
	CreditCard,
	Heart,
	LifeBuoy,
	MapPin,
	Package,
	ShieldCheck,
	ShoppingBag,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface IUserDashboardProps {
	orders: any[]
	stats: {
		totalSpent: number
		activeOrders: number
		completedOrders: number
		totalSaved: number
	}
	firstName: string
}

// Holat ranglari
const getStatusBadge = (status: string) => {
	switch (status) {
		case 'Yangi':
		case 'Qabul qilindi':
		case 'Jarayonda':
			return 'bg-blue-50 text-blue-700 border-blue-200'
		case "To'landi":
			return 'bg-cyan-50 text-cyan-700 border-cyan-200'
		case 'Tayyorlanmoqda':
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

// Hydration uchun xavfsiz sana
const formatSafeDate = (dateString: string) => {
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
	return `${d.getDate().toString().padStart(2, '0')}-${months[d.getMonth()]}, ${d.getFullYear()}`
}

export default function UserDashboardClient({
	orders,
	stats,
	firstName,
}: IUserDashboardProps) {
	const [greeting, setGreeting] = useState<string>('Xush kelibsiz')

	useEffect(() => {
		const hour = new Date().getHours()
		if (hour < 12) setGreeting('Xayrli tong')
		else if (hour < 18) setGreeting('Xayrli kun')
		else setGreeting('Xayrli kech')
	}, [])

	// So'nggi 5 ta buyurtmani olamiz
	const recentOrders = orders.slice(0, 5)

	// Foydalanuvchining oxirgi kiritgan manzilini eng so'nggi buyurtmadan olamiz
	const latestAddress = orders.find(o => o.address)?.address

	const USER_STATS = [
		{
			title: 'Umumiy xarajat',
			value: `$${stats.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
			subtitle: 'Barcha vaqt davomida',
			icon: CreditCard,
			color: 'bg-blue-50 text-blue-600 border-blue-100',
		},
		{
			title: 'Faol buyurtmalar',
			value: `${stats.activeOrders} ta`,
			subtitle: "Yo'lda va jarayonda",
			icon: Package,
			color: 'bg-orange-50 text-orange-600 border-orange-100',
		},
		{
			title: 'Xarid qilinganlar',
			value: `${stats.completedOrders} ta`,
			subtitle: 'Muvaffaqiyatli yetkazilgan',
			icon: ShoppingBag,
			color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
		},
		{
			title: 'Saqlanganlar',
			value: `${stats.totalSaved} ta`,
			subtitle: 'Istaklar ro‘yxatida (Tez kunda)',
			icon: Heart,
			color: 'bg-rose-50 text-rose-600 border-rose-100',
		},
	]

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4 px-4 md:px-8 max-w-[1400px] mx-auto'>
			{/* 1. HEADER */}
			<div className='relative overflow-hidden bg-white border border-gray-200/80 rounded-[32px] p-8 md:p-10 shadow-sm'>
				<div className='absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-gray-100 to-transparent rounded-full opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none'></div>

				<div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
					<div>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-4'>
							<ShieldCheck className='w-3.5 h-3.5 text-emerald-500' />
							<span className='text-xs font-montserrat font-bold text-gray-600 tracking-wider uppercase'>
								Tasdiqlangan Mijoz
							</span>
						</div>
						<h1 className='font-space-grotesk text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-2'>
							{greeting}, {firstName} 👋
						</h1>
						<p className='font-montserrat text-gray-500 font-medium max-w-xl'>
							Shaxsiy kabinetingizga xush kelibsiz. Bu yerda xaridlaringizni
							kuzatishingiz va hisobingizni boshqarishingiz mumkin.
						</p>
					</div>
					<div className='flex items-center gap-3 shrink-0'>
						<Link
							href='/products'
							className='font-montserrat flex items-center gap-2 rounded-2xl bg-black text-white px-6 py-3.5 text-sm font-bold hover:bg-gray-800 transition-all shadow-md group'
						>
							Yangi xarid
							<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
						</Link>
					</div>
				</div>
			</div>

			{/* 2. STATS CARDS */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
				{USER_STATS.map((stat, index) => {
					const Icon = stat.icon
					return (
						<div
							key={index}
							className='relative flex flex-col justify-between bg-white border border-gray-200/80 rounded-[28px] p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/20 group'
						>
							<div className='flex items-center justify-between'>
								<span className='font-montserrat text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors'>
									{stat.title}
								</span>
								<div
									className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${stat.color}`}
								>
									<Icon className='w-4 h-4' />
								</div>
							</div>
							<div className='mt-8 flex flex-col gap-1'>
								<h2 className='font-space-grotesk text-3xl font-black tracking-tight text-gray-900'>
									{stat.value}
								</h2>
								<span className='font-montserrat text-xs font-medium text-gray-400'>
									{stat.subtitle}
								</span>
							</div>
						</div>
					)
				})}
			</div>

			{/* 3. ASOSIY KONTENT */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
				{/* CHAP TOMON: Mening Buyurtmalarim */}
				<div className='lg:col-span-2 flex flex-col space-y-6'>
					<div className='flex items-end justify-between px-1'>
						<div>
							<h2 className='font-space-grotesk text-2xl font-bold text-black'>
								Mening buyurtmalarim
							</h2>
							<p className='font-montserrat text-sm text-gray-500 font-medium mt-1'>
								Oxirgi amalga oshirilgan xaridlaringiz
							</p>
						</div>
						<Link
							href='/dashboard/orders'
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
											ID & Sana
										</th>
										<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
											Mahsulotlar
										</th>
										<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
											Holati
										</th>
										<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6 text-right'>
											Summa
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-100 font-montserrat'>
									{recentOrders.length > 0 ? (
										recentOrders.map(order => {
											const status = order.orderStatus || 'Yangi'
											const itemsCount =
												order.items?.reduce(
													(acc: number, item: any) => acc + item.quantity,
													0,
												) || 0

											return (
												<tr
													key={order._id}
													className='group hover:bg-gray-50/80 transition-colors cursor-pointer'
												>
													<td className='py-4 px-6 whitespace-nowrap'>
														<div className='flex flex-col'>
															<span className='font-space-grotesk font-bold text-sm text-black'>
																ORD-{order._id.slice(-6).toUpperCase()}
															</span>
															<span className='text-[11px] text-gray-400 mt-0.5 font-medium flex items-center gap-1'>
																<Clock className='w-3 h-3' />
																{formatSafeDate(order.createdAt)}
															</span>
														</div>
													</td>
													<td className='py-4 px-6 whitespace-nowrap'>
														<span className='text-sm font-semibold text-gray-900'>
															{itemsCount} ta buyum
														</span>
													</td>
													<td className='py-4 px-6 whitespace-nowrap'>
														<span
															className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold border ${getStatusBadge(status)}`}
														>
															{status === 'Yangi' ? 'Qabul qilindi' : status}
														</span>
													</td>
													<td className='py-4 px-6 text-right whitespace-nowrap'>
														<span className='font-space-grotesk text-sm font-bold text-black'>
															$
															{order.total.toLocaleString(undefined, {
																minimumFractionDigits: 2,
															})}
														</span>
													</td>
												</tr>
											)
										})
									) : (
										<tr>
											<td
												colSpan={4}
												className='py-12 text-center text-sm text-gray-500 font-medium'
											>
												Sizda hali hech qanday buyurtma yo'q
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* O'NG TOMON: Profil ma'lumotlari & Tezkor yordam */}
				<div className='flex flex-col space-y-6'>
					{/* Asosiy Manzil (Real Bazadan) */}
					<div className='bg-white border border-gray-200/80 rounded-[28px] p-6 shadow-sm flex flex-col gap-4'>
						<div className='flex items-center justify-between border-b border-gray-100 pb-4'>
							<h3 className='font-semibold text-gray-900 flex items-center gap-2'>
								<MapPin className='w-5 h-5 text-gray-500' />
								Asosiy manzil
							</h3>
						</div>

						{latestAddress ? (
							<div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
								<span className='text-[10px] font-bold uppercase tracking-widest text-black bg-gray-200 px-2 py-0.5 rounded-md mb-2 inline-block'>
									{latestAddress.type || 'Uy'}
								</span>
								<p className='font-bold text-sm text-gray-900 mt-1'>
									{latestAddress.recipient}
								</p>
								<p className='text-xs text-gray-600 leading-relaxed mt-1'>
									<strong className='font-medium text-gray-800'>
										{latestAddress.region},
									</strong>{' '}
									{latestAddress.fullAddress}
								</p>
								<p className='font-mono text-xs font-medium text-gray-500 mt-2'>
									{latestAddress.phone}
								</p>
							</div>
						) : (
							<div className='bg-gray-50 rounded-xl p-6 border border-gray-100 text-center flex flex-col items-center gap-2'>
								<MapPin className='w-6 h-6 text-gray-300' />
								<p className='text-xs text-gray-500 font-medium'>
									Hozircha manzil qo'shilmagan
								</p>
							</div>
						)}
					</div>

					{/* Yordam markazi */}
					<div className='bg-black border border-gray-800 rounded-[28px] p-6 shadow-sm text-white relative overflow-hidden'>
						<div className='absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none'></div>

						<h3 className='font-space-grotesk text-xl font-bold flex items-center gap-2 mb-2 relative z-10'>
							<LifeBuoy className='w-5 h-5 text-gray-300' />
							Yordam kerakmi?
						</h3>
						<p className='font-montserrat text-xs text-gray-400 font-medium leading-relaxed mb-6 relative z-10'>
							Buyurtmangiz bo'yicha savollaringiz bo'lsa yoki qaytarish
							rasmiylashtirmoqchi bo'lsangiz, biz bilan bog'laning.
						</p>

						<Link
							href='/support'
							className='w-full inline-flex justify-center items-center gap-2 rounded-xl bg-white text-black px-4 py-3 text-sm font-bold hover:bg-gray-100 transition-colors relative z-10'
						>
							Qo'llab-quvvatlash xizmati
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
