import {
	ArrowUpRight,
	CreditCard,
	DollarSign,
	MoreHorizontal,
	Package,
	Users,
} from 'lucide-react'
import Link from 'next/link'

// Vaqtinchalik statik ma'lumotlar (Kelajakda bularni MongoDB dan olamiz)
const STATS = [
	{
		title: 'Umumiy Tushum',
		amount: '$45,231.89',
		trend: '+20.1%',
		icon: DollarSign,
	},
	{
		title: 'Faol Buyurtmalar',
		amount: '+2350',
		trend: '+15.2%',
		icon: Package,
	},
	{
		title: 'Mijozlar',
		amount: '+12,234',
		trend: '+12.5%',
		icon: Users,
	},
	{
		title: "Kutilyotgan To'lovlar",
		amount: '$12,053',
		trend: '+4.3%',
		icon: CreditCard,
	},
]

const RECENT_ORDERS = [
	{
		id: 'ORD-7352',
		customer: 'Temurbek Samatov',
		status: 'Yetkazib berildi',
		date: '2026-09-27',
		amount: '$299.00',
	},
	{
		id: 'ORD-7351',
		customer: 'Alisher Usmonov',
		status: 'Jarayonda',
		date: '2026-09-26',
		amount: '$849.50',
	},
	{
		id: 'ORD-7350',
		customer: 'Sardor Rahimxon',
		status: 'Bekor qilindi',
		date: '2026-09-26',
		amount: '$49.00',
	},
	{
		id: 'ORD-7349',
		customer: 'Javohir Tojiyev',
		status: 'Yetkazib berildi',
		date: '2026-09-25',
		amount: '$1,299.00',
	},
]

export default function DashboardPage() {
	return (
		<div className='flex flex-col gap-8 pb-10 pt-4'>
			{/* Sarlavha qismi */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
						Umumiy ko'rinish
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Do'koningizning so'nggi 30 kunlik ko'rsatkichlari.
					</p>
				</div>
				<button className='flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80'>
					Hisobot yuklash
					<ArrowUpRight className='h-4 w-4 text-gray-400' />
				</button>
			</div>

			{/* 4 ta Statistika Kartalari (Vercel Card uslubida) */}
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{STATS.map((stat, index) => {
					const Icon = stat.icon
					return (
						<div
							key={index}
							className='flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300'
						>
							<div className='flex items-center justify-between'>
								<span className='text-sm font-medium text-gray-500'>
									{stat.title}
								</span>
								<Icon className='h-4 w-4 text-gray-400' />
							</div>
							<div className='mt-4 flex items-baseline gap-2'>
								<h2 className='text-2xl font-bold tracking-tight text-gray-900'>
									{stat.amount}
								</h2>
								<span className='text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md'>
									{stat.trend}
								</span>
							</div>
						</div>
					)
				})}
			</div>

			{/* Asosiy ma'lumotlar jadvallari */}
			<div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
				{/* So'nggi buyurtmalar (2 ta ustun joyni oladi) */}
				<div className='col-span-1 lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm'>
					<div className='flex items-center justify-between border-b border-gray-100 p-6'>
						<h3 className='font-semibold text-gray-900'>So'nggi buyurtmalar</h3>
						<Link
							href='/dashboard/orders'
							className='text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline'
						>
							Barchasini ko'rish
						</Link>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full text-left text-sm'>
							<thead className='border-b border-gray-100 bg-gray-50/50 text-gray-500'>
								<tr>
									<th className='px-6 py-3 font-medium'>Buyurtma ID</th>
									<th className='px-6 py-3 font-medium'>Mijoz</th>
									<th className='px-6 py-3 font-medium'>Holati</th>
									<th className='px-6 py-3 font-medium text-right'>Summa</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-100'>
								{RECENT_ORDERS.map(order => (
									<tr
										key={order.id}
										className='transition-colors hover:bg-gray-50/50 group'
									>
										<td className='px-6 py-4 font-mono text-xs text-gray-600'>
											{order.id}
										</td>
										<td className='px-6 py-4 font-medium text-gray-900'>
											{order.customer}
										</td>
										<td className='px-6 py-4'>
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
										<td className='px-6 py-4 text-right font-mono text-sm text-gray-900'>
											{order.amount}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Tezkor harakatlar / Tizim holati (1 ta ustun joyni oladi) */}
				<div className='col-span-1 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col'>
					<div className='border-b border-gray-100 p-6'>
						<h3 className='font-semibold text-gray-900'>Tizim holati</h3>
					</div>
					<div className='p-6 flex-1 flex flex-col gap-6'>
						<div className='flex items-start gap-4'>
							<div className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50'>
								<div className='h-2 w-2 rounded-full bg-emerald-500'></div>
							</div>
							<div>
								<p className='text-sm font-medium text-gray-900'>
									Vercel Deployment
								</p>
								<p className='text-xs text-gray-500 mt-0.5'>
									Oxirgi marta 2 daqiqa oldin yangilandi
								</p>
							</div>
						</div>

						<div className='flex items-start gap-4'>
							<div className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50'>
								<div className='h-2 w-2 rounded-full bg-emerald-500'></div>
							</div>
							<div>
								<p className='text-sm font-medium text-gray-900'>
									Clerk Webhook
								</p>
								<p className='text-xs text-gray-500 mt-0.5'>
									Sinxronizatsiya faol (100% Succeeded)
								</p>
							</div>
						</div>

						<div className='flex items-start gap-4'>
							<div className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50'>
								<div className='h-2 w-2 rounded-full bg-emerald-500'></div>
							</div>
							<div>
								<p className='text-sm font-medium text-gray-900'>
									MongoDB Atlas
								</p>
								<p className='text-xs text-gray-500 mt-0.5'>
									Muvaffaqiyatli ulangan (3ms ping)
								</p>
							</div>
						</div>
					</div>

					<div className='border-t border-gray-100 bg-gray-50 p-4 rounded-b-xl flex justify-center'>
						<button className='text-xs font-medium text-gray-500 hover:text-black flex items-center gap-1 transition-colors'>
							Barcha loglarni ko'rish
							<MoreHorizontal className='w-3 h-3' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
