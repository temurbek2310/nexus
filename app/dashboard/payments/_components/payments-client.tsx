'use client'

import { Badge } from '@/components/ui/badge'
import {
	ArrowUpRight,
	CheckCircle2,
	Clock,
	Download,
	Receipt,
	Search,
} from 'lucide-react'
import { useState } from 'react'

interface ITransaction {
	id: string
	date: string
	amount: number
	status: string
	description: string
	receiptUrl: string
}

interface IPaymentsProps {
	transactions: ITransaction[]
	stats: {
		totalRevenue: number
		pendingAmount: number
		refundedAmount: number
		netProfit: number
	}
}

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

export default function PaymentsClient({
	transactions,
	stats,
}: IPaymentsProps) {
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

	const STATS = [
		{
			title: 'Jami tushum',
			amount: `$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
			trend: 'Barcha vaqt',
			isPositive: true,
		},
		{
			title: 'Kutilayotgan',
			amount: `$${stats.pendingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
			trend: 'Real vaqt',
			isPositive: true,
		},
		{
			title: 'Qaytarilgan (Refund)',
			amount: `$${stats.refundedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
			trend: 'Jami',
			isPositive: false,
		},
		{
			title: 'Sof foyda',
			amount: `$${stats.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
			trend: 'Sof',
			isPositive: true,
		},
	]

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4 px-4 md:px-8 max-w-[1600px] mx-auto'>
			{/* 1. HEADER */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						To'lovlar va Hisob
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						Barcha tranzaksiyalar tarixi va moliyaviy ko'rsatkichlarni kuzating.
					</p>
				</div>
			</div>

			{/* 2. KPI STATS CARDS (Vercel / Apple Minimalist Style) */}
			<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
				{STATS.map((stat, index) => (
					<div
						key={index}
						className='relative flex flex-col justify-between rounded-[28px] border border-gray-200/60 bg-white p-7 shadow-[0_2px_20px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-black/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group'
					>
						{/* Yuqori qism: Sarlavha va Trend badge */}
						<div className='flex items-center justify-between mb-4'>
							<span className='font-montserrat text-xs font-bold text-gray-400 uppercase tracking-wider'>
								{stat.title}
							</span>
							<span
								className={`font-montserrat text-[11px] font-semibold px-2.5 py-1 rounded-full ${
									stat.isPositive
										? 'text-emerald-700 bg-emerald-50/80'
										: 'text-gray-600 bg-gray-100'
								}`}
							>
								{stat.trend}
							</span>
						</div>

						{/* Pastki qism: Katta raqam */}
						<div>
							<h2 className='font-space-grotesk text-3xl font-extrabold tracking-tight text-black'>
								{stat.amount}
							</h2>
						</div>

						{/* Subtil gradient bezak (Hover paytida ochiladi) */}
						<div className='absolute -bottom-10 -right-10 w-28 h-28 bg-gray-100/50 rounded-full blur-2xl group-hover:bg-black/[0.03] transition-all duration-500 pointer-events-none' />
					</div>
				))}
			</div>

			{/* 3. TRANZAKSIYALAR TARIXI */}
			<div className='flex flex-col space-y-6'>
				<div>
					<h2 className='font-space-grotesk text-xl font-bold text-black'>
						Tranzaksiyalar tarixi
					</h2>
					<p className='font-montserrat text-xs text-gray-500 mt-1'>
						Barcha to'lovlar va qaytarmalar ro'yxati (Real ma'lumotlar
						bazasidan)
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
								placeholder="ID yoki tavsif bo'yicha qidirish..."
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
													{txn.receiptUrl ? (
														<a
															href={txn.receiptUrl}
															target='_blank'
															rel='noreferrer'
															className='inline-flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm cursor-pointer'
															title='Chekni yuklab olish'
														>
															<Download className='w-4 h-4' />
														</a>
													) : null}
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
