'use client'

import { Badge } from '@/components/ui/badge'
import { ICoupon, deleteCoupon } from '@/lib/actions/coupon.actions'
import {
	CheckCircle2,
	Clock,
	Pencil,
	PercentCircle,
	Plus,
	Scissors,
	Search,
	Ticket,
	Trash2,
	XCircle,
} from 'lucide-react'
import * as React from 'react'
import CouponSheet from './CouponSheet'

interface CouponsClientProps {
	initialCoupons: ICoupon[]
}

const TABS = ['Barchasi', 'Faol', "Muddat o'tgan", "To'xtatilgan"]

const getStatusConfig = (status: string) => {
	switch (status) {
		case 'Faol':
			return { color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 }
		case "Muddat o'tgan":
			return { color: 'bg-red-50 text-red-700', icon: Clock }
		case "To'xtatilgan":
			return { color: 'bg-gray-100 text-gray-600', icon: XCircle }
		default:
			return { color: 'bg-gray-50 text-gray-600', icon: Ticket }
	}
}

export default function CouponsClient({ initialCoupons }: CouponsClientProps) {
	const [activeTab, setActiveTab] = React.useState<string>('Barchasi')
	const [searchTerm, setSearchTerm] = React.useState<string>('')

	const [isSheetOpen, setIsSheetOpen] = React.useState(false)
	const [editingCoupon, setEditingCoupon] = React.useState<ICoupon | null>(null)

	const filteredCoupons = initialCoupons.filter(coupon => {
		const matchesTab =
			activeTab === 'Barchasi' ? true : coupon.status === activeTab
		const matchesSearch = coupon.code
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
		return matchesTab && matchesSearch
	})

	const handleAddNew = () => {
		setEditingCoupon(null)
		setIsSheetOpen(true)
	}

	const handleEdit = (coupon: ICoupon) => {
		setEditingCoupon(coupon)
		setIsSheetOpen(true)
	}

	const handleDelete = async (id: string) => {
		if (confirm("Haqiqatan ham bu kuponni o'chirishni xohlaysizmi?")) {
			try {
				await deleteCoupon(id)
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4'>
			<CouponSheet
				isOpen={isSheetOpen}
				setIsOpen={setIsSheetOpen}
				initialData={editingCoupon}
			/>

			{/* HEADER */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						Kuponlar
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						Mijozlaringiz uchun chegirma kodlarini yarating va kuzating.
					</p>
				</div>
				<div>
					<button
						onClick={handleAddNew}
						className='font-montserrat flex items-center gap-2 rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-all shadow-sm cursor-pointer'
					>
						<Plus className='w-4 h-4' />
						Yangi kupon
					</button>
				</div>
			</div>

			{/* KPI STATS */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6'>
				<div className='bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex items-center gap-5 hover:border-black/20 transition-all'>
					<div className='w-14 h-14 rounded-[18px] bg-gray-50 flex items-center justify-center border border-gray-100'>
						<Ticket className='w-6 h-6 text-gray-600' />
					</div>
					<div>
						<p className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
							Jami Kuponlar
						</p>
						<h3 className='font-space-grotesk text-3xl font-bold text-black'>
							{initialCoupons.length} ta
						</h3>
					</div>
				</div>
				<div className='bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex items-center gap-5 hover:border-black/20 transition-all'>
					<div className='w-14 h-14 rounded-[18px] bg-emerald-50 flex items-center justify-center border border-emerald-100'>
						<PercentCircle className='w-6 h-6 text-emerald-600' />
					</div>
					<div>
						<p className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
							Faol kuponlar
						</p>
						<h3 className='font-space-grotesk text-3xl font-bold text-black'>
							{initialCoupons.filter(c => c.status === 'Faol').length} ta
						</h3>
					</div>
				</div>
				<div className='bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex items-center gap-5 hover:border-black/20 transition-all'>
					<div className='w-14 h-14 rounded-[18px] bg-indigo-50 flex items-center justify-center border border-indigo-100'>
						<Scissors className='w-6 h-6 text-indigo-500' />
					</div>
					<div>
						<p className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
							Jami ishlatilgan
						</p>
						<h3 className='font-space-grotesk text-3xl font-bold text-black'>
							{initialCoupons.reduce((acc, c) => acc + c.usageCount, 0)} marta
						</h3>
					</div>
				</div>
			</div>

			{/* JADVAL */}
			<div className='flex flex-col rounded-[24px] border border-gray-200/80 bg-white shadow-sm overflow-hidden'>
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
							placeholder='Kupon kodini qidirish...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm font-montserrat uppercase placeholder:normal-case'
						/>
					</div>
				</div>

				<div className='overflow-x-auto min-h-[420px] flex flex-col justify-between'>
					<table className='w-full text-left border-collapse'>
						<thead>
							<tr className='bg-gray-50/50 border-b border-gray-100 text-gray-500'>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Kupon Kodi
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Chegirma
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Foydalanish
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Muddat
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Holat
								</th>
								<th className='py-4 px-6 text-right'></th>
							</tr>
						</thead>
						<tbody
							key={activeTab}
							className='divide-y divide-gray-100 font-montserrat animate-in fade-in-50 duration-300'
						>
							{filteredCoupons.length > 0 ? (
								filteredCoupons.map(coupon => {
									const { color, icon: StatusIcon } = getStatusConfig(
										coupon.status,
									)
									const isPercentage = coupon.type === 'Foyiz'
									const formattedDate = new Date(
										coupon.expiryDate,
									).toLocaleDateString('uz-UZ', {
										day: '2-digit',
										month: 'short',
										year: 'numeric',
									})

									return (
										<tr
											key={coupon._id}
											className='group hover:bg-gray-50/50 transition-colors'
										>
											<td className='py-4 px-6 whitespace-nowrap'>
												<div className='flex items-center space-x-3'>
													<div className='p-2 bg-gray-50 rounded-xl group-hover:bg-white border border-gray-100 group-hover:border-gray-200 transition-all shadow-sm'>
														<Ticket className='w-4 h-4 text-gray-500' />
													</div>
													<span className='font-space-grotesk text-sm font-bold text-black tracking-widest'>
														{coupon.code}
													</span>
												</div>
											</td>
											<td className='py-4 px-6 whitespace-nowrap'>
												<span className='font-space-grotesk text-base font-black text-black'>
													{isPercentage
														? `${coupon.value}%`
														: `$${coupon.value.toLocaleString()}`}
												</span>
											</td>
											<td className='py-4 px-6 whitespace-nowrap'>
												<div className='flex flex-col'>
													<span className='text-sm font-semibold text-gray-900'>
														{coupon.usageCount} marta
													</span>
													<span className='text-[11px] text-gray-400 font-medium mt-0.5'>
														{coupon.usageLimit
															? `Limit: ${coupon.usageLimit} ta`
															: 'Cheksiz'}
													</span>
												</div>
											</td>
											<td className='py-4 px-6 whitespace-nowrap'>
												<span className='text-sm font-medium text-gray-600'>
													{formattedDate}
												</span>
											</td>
											<td className='py-4 px-6 whitespace-nowrap'>
												<Badge
													variant='outline'
													className={`text-[10px] font-bold px-2.5 py-1 border-none flex items-center gap-1.5 w-max ${color}`}
												>
													<StatusIcon className='w-3 h-3' />
													{coupon.status}
												</Badge>
											</td>
											<td className='py-4 px-6 text-right whitespace-nowrap'>
												<div className='flex items-center justify-end gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
													<button
														onClick={() => handleEdit(coupon)}
														className='flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 hover:text-black hover:border-black bg-white shadow-sm transition-colors cursor-pointer'
													>
														<Pencil className='w-3.5 h-3.5' />
													</button>
													<button
														onClick={() => handleDelete(coupon._id)}
														className='flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 bg-white shadow-sm transition-colors cursor-pointer'
													>
														<Trash2 className='w-3.5 h-3.5' />
													</button>
												</div>
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
										Kuponlar topilmadi.
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
