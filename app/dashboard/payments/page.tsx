'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	ArrowUpRight,
	Check,
	CheckCircle2,
	Clock,
	DollarSign,
	Download,
	MoreHorizontal,
	Plus,
	Receipt,
	Search,
} from 'lucide-react'
import { useState } from 'react'

// --- TYPESCRIPT INTERFACES ---
interface StatItem {
	title: string
	amount: string
	trend: string
	isPositive: boolean
}

interface PaymentMethodItem {
	id: number
	type: string
	last4: string
	expiry: string
	isDefault: boolean
	brandColor: string
}

interface ITransaction {
	id: string
	date: string
	amount: number
	status: 'Muvaffaqiyatli' | 'Kutilmoqda' | 'Qaytarildi'
	description: string
}

// --- MOCK DATA ---
const STATS: StatItem[] = [
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

const paymentMethods: PaymentMethodItem[] = [
	{
		id: 1,
		type: 'Visa',
		last4: '4242',
		expiry: '12/28',
		isDefault: true,
		brandColor: 'bg-blue-600',
	},
	{
		id: 2,
		type: 'Mastercard',
		last4: '8899',
		expiry: '08/27',
		isDefault: false,
		brandColor: 'bg-orange-500',
	},
]

const transactions: ITransaction[] = [
	{
		id: 'INV-2026-081',
		date: '10 Avg, 2026',
		amount: 2199.0,
		status: 'Muvaffaqiyatli',
		description: 'DJI Mavic 3 Pro (Buyurtma #ORD-7829)',
	},
	{
		id: 'INV-2026-080',
		date: '08 Avg, 2026',
		amount: 349.0,
		status: 'Muvaffaqiyatli',
		description: 'Sony WH-1000XM5 (Buyurtma #ORD-7828)',
	},
	{
		id: 'INV-2026-079',
		date: '28 Iyul, 2026',
		amount: 125.0,
		status: 'Muvaffaqiyatli',
		description: 'PowerCore 65W & Kabellar (Buyurtma #ORD-7827)',
	},
	{
		id: 'INV-2026-078',
		date: '15 Iyul, 2026',
		amount: 599.0,
		status: 'Qaytarildi',
		description: 'Pul qaytarildi - Zhiyun Crane 4',
	},
	{
		id: 'INV-2026-077',
		date: '02 Iyul, 2026',
		amount: 1899.0,
		status: 'Muvaffaqiyatli',
		description: 'MacBook Pro M4 (Buyurtma #ORD-7825)',
	},
]

const TABS = ['Barchasi', 'Muvaffaqiyatli', 'Kutilmoqda', 'Qaytarildi']

const getStatusConfig = (status: string) => {
	switch (status) {
		case 'Muvaffaqiyatli':
			return {
				label: 'Muvaffaqiyatli',
				color: 'bg-emerald-50 text-emerald-700',
				icon: CheckCircle2,
			}
		case 'Kutilmoqda':
			return {
				label: 'Kutilmoqda',
				color: 'bg-amber-50 text-amber-700',
				icon: Clock,
			}
		case 'Qaytarildi':
			return {
				label: 'Qaytarildi',
				color: 'bg-gray-100 text-gray-600',
				icon: ArrowUpRight,
			}
		default:
			return {
				label: "Noma'lum",
				color: 'bg-gray-50 text-gray-600',
				icon: Receipt,
			}
	}
}

export default function PaymentsPage() {
	const [activeTab, setActiveTab] = useState<string>('Barchasi')
	const [searchTerm, setSearchTerm] = useState<string>('')

	// Filtrlash mantiqi
	const filteredTransactions = transactions.filter(txn => {
		const matchesTab =
			activeTab === 'Barchasi' ? true : txn.status === activeTab
		const matchesSearch =
			txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			txn.description.toLowerCase().includes(searchTerm.toLowerCase())
		return matchesTab && matchesSearch
	})

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4'>
			{/* 1. HEADER */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						To'lovlar va Hisob
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						To'lov usullarini boshqaring va barcha tranzaksiyalar tarixini
						kuzating.
					</p>
				</div>
				<div>
					<button className='font-montserrat flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-black shadow-sm cursor-pointer'>
						<Download className='h-4 w-4' />
						CSV yuklash
					</button>
				</div>
			</div>

			{/* 2. KPI STATS CARDS */}
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{STATS.map((stat, index) => (
					<div
						key={index}
						className='flex flex-col justify-between rounded-[24px] border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:border-black/20'
					>
						<div className='flex items-center justify-between'>
							<span className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider'>
								{stat.title}
							</span>
							<div className='w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center'>
								<DollarSign className='h-4 w-4 text-gray-500' />
							</div>
						</div>
						<div className='mt-4 flex items-baseline gap-2'>
							<h2 className='font-space-grotesk text-2xl font-bold tracking-tight text-gray-900'>
								{stat.amount}
							</h2>
							<span
								className={`font-montserrat text-xs font-semibold px-2 py-0.5 rounded-md flex items-center ${
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
				))}
			</div>

			{/* 3. TO'LOV USULLARI (Payment Methods) */}
			<div className='flex flex-col space-y-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='font-space-grotesk text-xl font-bold text-black'>
							To'lov usullari
						</h2>
						<p className='font-montserrat text-xs text-gray-500 mt-1'>
							Asosiy va qo'shimcha kartalaringiz
						</p>
					</div>
					<Button
						variant='outline'
						className='font-montserrat text-sm font-semibold h-10 rounded-xl border-gray-200 hover:border-black transition-colors cursor-pointer'
					>
						<Plus className='w-4 h-4 mr-2' />
						Karta qo'shish
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
					{paymentMethods.map(method => (
						<div
							key={method.id}
							className='relative group bg-white border border-gray-200/80 rounded-[24px] p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/20 overflow-hidden flex flex-col justify-between'
						>
							{method.isDefault && (
								<div className='absolute top-0 right-0 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-bl-xl font-montserrat flex items-center shadow-sm'>
									<Check className='w-3 h-3 mr-1' />
									Asosiy
								</div>
							)}

							<div className='flex items-center justify-between mb-8 mt-2'>
								<div className='flex items-center space-x-3'>
									<div
										className={`w-12 h-8 rounded-lg flex items-center justify-center ${method.brandColor} shadow-inner`}
									>
										<span className='font-space-grotesk font-black text-white text-xs italic tracking-wider'>
											{method.type}
										</span>
									</div>
									<span className='font-space-grotesk font-bold text-lg text-black tracking-widest'>
										•••• {method.last4}
									</span>
								</div>
							</div>

							<div className='flex items-end justify-between pt-4 border-t border-gray-100'>
								<div className='flex flex-col'>
									<span className='font-montserrat text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5'>
										Amal qilish muddati
									</span>
									<span className='font-space-grotesk font-bold text-sm text-black'>
										{method.expiry}
									</span>
								</div>

								<button className='text-gray-400 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 cursor-pointer'>
									<MoreHorizontal className='w-5 h-5' />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<hr className='border-gray-100' />

			{/* 4. TRANZAKSIYALAR TARIXI (Billing History Table with Tabs & Search + Example Table Behavior) */}
			<div className='flex flex-col space-y-6'>
				<div>
					<h2 className='font-space-grotesk text-xl font-bold text-black'>
						Tranzaksiyalar tarixi
					</h2>
					<p className='font-montserrat text-xs text-gray-500 mt-1'>
						Barcha to'lovlar va qaytarmalar ro'yxati
					</p>
				</div>

				<div className='bg-white border border-gray-200/80 rounded-[24px] overflow-hidden shadow-sm'>
					{/* Yuqori Panel: Tablar va Qidiruv */}
					<div className='flex flex-col border-b border-gray-100 p-5 gap-4 md:flex-row md:items-center md:justify-between bg-gray-50/30'>
						<div className='flex items-center gap-1 rounded-xl bg-gray-100/80 p-1 border border-gray-200/60 overflow-x-auto'>
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

						<div className='relative w-full md:w-72'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
							<input
								type='text'
								placeholder={`ID yoki tavsif bo\'yicha qidirish...`}
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm font-montserrat'
							/>
						</div>
					</div>

					<div className='overflow-x-auto min-h-[380px]'>
						<table className='w-full text-left border-collapse'>
							<thead>
								<tr className='bg-gray-50/50 border-b border-gray-100 text-gray-500'>
									<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
										Invoice (Chek)
									</th>
									<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
										Ta'rif / Mahsulot
									</th>
									<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
										Sana
									</th>
									<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
										Holat
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
								{filteredTransactions.length > 0 ? (
									filteredTransactions.map(txn => {
										const {
											label,
											color,
											icon: StatusIcon,
										} = getStatusConfig(txn.status)

										return (
											<tr
												key={txn.id}
												className='group hover:bg-gray-50/50 transition-colors'
											>
												<td className='py-4 px-6 whitespace-nowrap'>
													<div className='flex items-center space-x-3'>
														<div className='p-2 bg-gray-50 rounded-xl group-hover:bg-white border border-gray-100 group-hover:border-gray-200 transition-all shadow-sm'>
															<Receipt className='w-4 h-4 text-gray-500' />
														</div>
														<span className='font-space-grotesk text-sm font-bold text-black'>
															{txn.id}
														</span>
													</div>
												</td>
												<td className='py-4 px-6'>
													<span className='text-sm font-medium text-gray-700 line-clamp-1 max-w-[320px]'>
														{txn.description}
													</span>
												</td>
												<td className='py-4 px-6 whitespace-nowrap'>
													<span className='text-xs text-gray-500'>
														{txn.date}
													</span>
												</td>
												<td className='py-4 px-6 whitespace-nowrap'>
													<Badge
														variant='outline'
														className={`text-[10px] font-bold px-2.5 py-1 border-none flex items-center gap-1.5 w-max ${color}`}
													>
														<StatusIcon className='w-3 h-3' />
														{label}
													</Badge>
												</td>
												<td className='py-4 px-6 text-right whitespace-nowrap'>
													<span
														className={`font-space-grotesk text-sm font-bold ${txn.status === 'Qaytarildi' ? 'text-gray-400' : 'text-black'}`}
													>
														$
														{txn.amount.toLocaleString(undefined, {
															minimumFractionDigits: 2,
														})}
													</span>
												</td>
												<td className='py-4 px-6 text-right whitespace-nowrap'>
													{/* Yuklab olish tugmasi (Namunadagidek hoverda silliq siljib chiqib keladi) */}
													<button
														className='inline-flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm cursor-pointer'
														title='Chekni yuklab olish'
													>
														<Download className='w-4 h-4' />
													</button>
												</td>
											</tr>
										)
									})
								) : (
									<tr>
										<td
											colSpan={6}
											className='py-16 text-center text-sm text-gray-500 font-medium'
										>
											Ushbu qidiruv yoki filtr bo'yicha tranzaksiyalar
											topilmadi.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
