'use client'

import { updateOrderStatusAdmin } from '@/lib/actions/order.actions'
import {
	ArrowUpRight,
	CheckCircle2,
	Clock,
	CreditCard,
	Download,
	Eye,
	Loader2,
	Package,
	Search,
	ShoppingBag,
	Truck,
	XCircle,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

// SHADCN UI SELECT KOMPONENTLARI
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface IOrder {
	id: string
	customer: string
	email: string
	date: string
	status: string
	paymentStatus: string
	itemsCount: number
	amount: number
}

const TABS = [
	'Barchasi',
	'Qabul qilindi',
	"To'landi",
	'Qadoqlanmoqda',
	"Yo'lda",
	'Yetkazib berildi',
	'Bekor qilingan',
]

const getOrderStatusConfig = (status: string) => {
	switch (status) {
		case 'Qabul qilindi':
			return {
				color: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
				icon: Package,
			}
		case "To'landi":
			return {
				color: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
				icon: CreditCard,
			}
		case 'Qadoqlanmoqda':
			return {
				color: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
				icon: Clock,
			}
		case "Yo'lda":
			return {
				color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
				icon: Truck,
			}
		case 'Yetkazib berildi':
			return {
				color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
				icon: CheckCircle2,
			}
		case 'Bekor qilingan':
			return { color: 'bg-red-50 text-red-700 hover:bg-red-100', icon: XCircle }
		default:
			return {
				color: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
				icon: ShoppingBag,
			}
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

const formatDate = (isoString: string) => {
	const d = new Date(isoString)
	return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function AdminOrdersClient({
	initialOrders,
	stats,
}: {
	initialOrders: IOrder[]
	stats: any
}) {
	const router = useRouter()
	const [activeTab, setActiveTab] = React.useState<string>('Barchasi')
	const [searchTerm, setSearchTerm] = React.useState<string>('')

	const [orders, setOrders] = React.useState<IOrder[]>(initialOrders)
	const [loadingId, setLoadingId] = React.useState<string | null>(null)

	const handleStatusChange = async (orderId: string, newStatus: string) => {
		setLoadingId(orderId)

		setOrders(prev =>
			prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)),
		)

		const res = await updateOrderStatusAdmin(orderId, newStatus)
		if (!res.success) {
			alert("Xatolik: Status o'zgarmadi")
			router.refresh()
		}
		setLoadingId(null)
	}

	const filteredOrders = orders.filter(order => {
		const matchesTab =
			activeTab === 'Barchasi' ? true : order.status === activeTab
		const searchLower = searchTerm.toLowerCase()
		const matchesSearch =
			order.id.toLowerCase().includes(searchLower) ||
			order.customer.toLowerCase().includes(searchLower)
		return matchesTab && matchesSearch
	})

	const STATS = [
		{
			title: 'Jami buyurtmalar',
			value: stats?.totalOrders || 0,
			trend: 'Hamma vaqt',
			isPositive: true,
			icon: ShoppingBag,
		},
		{
			title: 'Qabul qilindi',
			value: stats?.newOrders || 0,
			trend: 'Kutilmoqda',
			isPositive: true,
			icon: Package,
		},
		{
			title: "Yo'lda",
			value: stats?.shippingOrders || 0,
			trend: 'Yetkazilmoqda',
			isPositive: true,
			icon: Truck,
		},
		{
			title: 'Daromad (Umumiy)',
			value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
			trend: 'Muvaffaqiyatli',
			isPositive: true,
			icon: CheckCircle2,
		},
	]

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4 px-4 md:px-8 max-w-[1600px] mx-auto'>
			{/* 1. HEADER */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						Buyurtmalar boshqaruvi
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						Do'koningizdagi barcha xaridlarni nazorat qiling va statuslarini
						o'zgartiring.
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
									className={`font-montserrat text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center text-emerald-700 bg-emerald-50`}
								>
									<ArrowUpRight className='w-3 h-3 mr-0.5' />
									{stat.trend}
								</span>
							</div>
						</div>
					)
				})}
			</div>

			{/* 3. ASOSIY JADVAL */}
			<div className='flex flex-col rounded-[24px] border border-gray-200/80 bg-white shadow-sm overflow-hidden'>
				<div className='flex flex-col border-b border-gray-100 p-5 gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-50/30'>
					<div className='flex items-center gap-1 rounded-xl bg-gray-100/80 p-1 border border-gray-200/60 overflow-x-auto hide-scrollbar'>
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
									Holat (O'zgartirish)
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
						<tbody className='divide-y divide-gray-100 font-montserrat'>
							{filteredOrders.length > 0 ? (
								filteredOrders.map(order => {
									const { color: statusColor, icon: StatusIcon } =
										getOrderStatusConfig(order.status)
									const paymentColor = getPaymentStatusColor(
										order.paymentStatus,
									)
									const isUpdating = loadingId === order.id

									return (
										<tr
											key={order.id}
											className='group hover:bg-gray-50/50 transition-colors'
										>
											<td className='py-4 px-6 whitespace-nowrap'>
												<div className='flex items-center space-x-3'>
													<div className='p-2 bg-gray-50 rounded-xl group-hover:bg-white border border-gray-100 transition-all shadow-sm'>
														<ShoppingBag className='w-4 h-4 text-gray-500' />
													</div>
													<div className='flex flex-col'>
														<span className='font-space-grotesk text-sm font-bold text-black'>
															ORD-{order.id.slice(-6).toUpperCase()}
														</span>
														<span className='text-[11px] text-gray-400 mt-0.5 font-medium'>
															{formatDate(order.date)}
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

											{/* SHADCN SELECT BILAN STATUS O'ZGARTIRISH */}
											<td className='py-4 px-6 whitespace-nowrap'>
												<Select
													value={order.status}
													onValueChange={val =>
														handleStatusChange(order.id, val)
													}
													disabled={isUpdating}
												>
													<SelectTrigger
														className={`h-8 w-fit px-3 py-1 text-xs font-bold rounded-lg border-none shadow-sm transition-all focus:ring-2 focus:ring-black/20 focus:ring-offset-1 flex items-center gap-2 ${statusColor}${isUpdating ? 'opacity-50' : ''}`}
													>
														{isUpdating ? (
															<Loader2 className='w-3.5 h-3.5 animate-spin' />
														) : (
															<StatusIcon className='w-3.5 h-3.5' />
														)}
														<SelectValue placeholder='Holatni tanlang' />
													</SelectTrigger>
													<SelectContent className='font-montserrat rounded-xl shadow-xl border-gray-100 p-1'>
														<SelectItem
															value='Qabul qilindi'
															className='text-xs font-semibold py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50'
														>
															📦 Qabul qilindi
														</SelectItem>
														<SelectItem
															value="To'landi"
															className='text-xs font-semibold py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50'
														>
															💳 To'landi
														</SelectItem>
														<SelectItem
															value='Qadoqlanmoqda'
															className='text-xs font-semibold py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50'
														>
															📦 Qadoqlanmoqda
														</SelectItem>
														<SelectItem
															value="Yo'lda"
															className='text-xs font-semibold py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50'
														>
															🚚 Yo'lda
														</SelectItem>
														<SelectItem
															value='Yetkazib berildi'
															className='text-xs font-semibold py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50'
														>
															✅ Yetkazib berildi
														</SelectItem>
														<SelectItem
															value='Bekor qilingan'
															className='text-xs font-semibold py-2 px-3 rounded-md cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700'
														>
															❌ Bekor qilingan
														</SelectItem>
													</SelectContent>
												</Select>
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
												<button
													onClick={() =>
														router.push(`/admin/orders/${order.id}`)
													}
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
