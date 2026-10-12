'use client'

import {
	AlertTriangle,
	ArrowLeft,
	Check,
	CheckCircle2,
	ClipboardList,
	Clock,
	CreditCard,
	MapPin,
	Package,
	Phone,
	Receipt,
	Truck,
	XCircle,
} from 'lucide-react'
import Link from 'next/link'

interface OrderDetailsProps {
	order: any
	transaction: any
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} | ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const getStatusColor = (status: string) => {
	switch (status) {
		case 'Yetkazib berildi':
			return 'border-emerald-200 bg-emerald-50 text-emerald-700'
		case "Yo'lda":
			return 'border-indigo-200 bg-indigo-50 text-indigo-700'
		case 'Qadoqlanmoqda':
			return 'border-orange-200 bg-orange-50 text-orange-700'
		case "To'landi":
			return 'border-blue-200 bg-blue-50 text-blue-700'
		case 'Bekor qilingan':
			return 'border-red-200 bg-red-50 text-red-700'
		default:
			return 'border-gray-200 bg-gray-50 text-gray-700' // Qabul qilindi
	}
}

// 5 ta bosqichli yangi ketma-ketlik (Sizning namunangizdagi logika asosida)
const STATUS_FLOW = [
	{ id: 'Qabul qilindi', label: 'Qabul qilindi', icon: ClipboardList },
	{ id: "To'landi", label: "To'landi", icon: CreditCard },
	{ id: 'Qadoqlanmoqda', label: 'Qadoqlanmoqda', icon: Package },
	{ id: "Yo'lda", label: "Yo'lda", icon: Truck },
	{ id: 'Yetkazib berildi', label: 'Bajarildi', icon: CheckCircle2 },
]

export default function OrderDetailsClient({
	order,
	transaction,
}: OrderDetailsProps) {
	const orderId = `ORD-${order._id.slice(-6).toUpperCase()}`

	// Eski bazadagi (Yangi, Tayyorlanmoqda) nomlarni yangi 5-step formatiga moslashtirish
	let currentStatus = order.orderStatus
	if (currentStatus === 'Yangi') currentStatus = 'Qabul qilindi'
	if (currentStatus === 'Tayyorlanmoqda') currentStatus = 'Qadoqlanmoqda'

	const currentStepIndex = STATUS_FLOW.findIndex(s => s.id === currentStatus)
	const isCancelled = currentStatus === 'Bekor qilingan'

	return (
		<div className='max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 flex flex-col gap-8'>
			{/* Sarlavha va Orqaga qaytish */}
			<div className='flex flex-col gap-4'>
				<Link
					href='/dashboard/orders'
					className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors w-fit'
				>
					<ArrowLeft className='w-4 h-4' />
					Barcha buyurtmalarga qaytish
				</Link>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
					<div>
						<h1 className='text-2xl md:text-3xl font-semibold tracking-tight text-gray-900'>
							Buyurtma #{orderId}
						</h1>
						<p className='text-sm text-gray-500 mt-1 flex items-center gap-1.5'>
							<Clock className='w-4 h-4' />
							{formatDate(order.createdAt)}
						</p>
					</div>
					<span
						className={`w-fit inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${getStatusColor(currentStatus)}`}
					>
						{currentStatus}
					</span>
				</div>
			</div>

			{/* VIZUAL STATUS TIMELINE */}
			<div className='bg-white border border-gray-200/80 rounded-[32px] p-6 md:p-10 shadow-sm relative overflow-hidden'>
				<div className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
					<div>
						<h3 className='text-xl md:text-2xl font-bold text-black flex items-center'>
							<Truck className='w-6 h-6 mr-3 text-black' />
							Holatni kuzatish
						</h3>
						<p className='text-sm text-gray-500 font-medium mt-1'>
							Buyurtma qaysi bosqichdaligini kuzatib boring.
						</p>
					</div>
				</div>

				{isCancelled ? (
					<div className='flex flex-col items-center justify-center py-8 text-center bg-red-50/50 rounded-2xl border border-red-100'>
						<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
							<XCircle className='w-8 h-8 text-red-600' />
						</div>
						<h4 className='text-xl font-bold text-red-700 mb-2'>
							Buyurtma bekor qilingan
						</h4>
						<p className='text-sm text-red-600/80 max-w-md'>
							Ushbu buyurtma bekor qilingan va yetkazib berilmaydi. Pul
							mablag'lari qaytarilgan bo'lishi mumkin.
						</p>
					</div>
				) : (
					<div className='relative pt-4'>
						{/* Orqa fon chizig'i (Desktop uchun) */}
						<div className='hidden md:block absolute top-[22px] left-0 w-full h-[3px] bg-gray-100 rounded-full'></div>

						{/* Qora faol chiziq (Desktop uchun) - XATO TO'G'RILANDI */}
						<div
							className='hidden md:block absolute top-[22px] left-0 h-[3px] bg-black transition-all duration-700 ease-in-out rounded-full'
							style={{
								width: `${(Math.max(0, currentStepIndex) / (STATUS_FLOW.length - 1)) * 100}%`,
							}}
						></div>

						{/* Bosqichlar (Responsive Grid) */}
						<div className='grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0 relative z-10'>
							{STATUS_FLOW.map((step, index) => {
								const isCompleted = index < currentStepIndex
								const isActive = index === currentStepIndex
								const StepIcon = step.icon

								return (
									<div
										key={step.id}
										className={`group relative flex md:flex-col items-center md:justify-center gap-4 md:gap-3 p-3 md:p-0 rounded-2xl transition-all duration-300 ${
											isActive
												? 'bg-gray-50 md:bg-transparent'
												: 'md:bg-transparent'
										}`}
									>
										<div
											className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 relative z-10 ${
												isCompleted
													? 'bg-black border-black text-white shadow-lg group-hover:scale-110'
													: isActive
														? 'bg-white border-black text-black ring-4 ring-black/10 scale-110'
														: 'bg-white border-gray-200 text-gray-400 group-hover:border-gray-400'
											}`}
										>
											{isCompleted ? (
												<Check className='w-5 h-5' />
											) : (
												<StepIcon className='w-5 h-5' />
											)}
										</div>

										<div className='flex-1 md:flex-none md:text-center'>
											<p
												className={`font-bold text-sm md:text-base transition-colors ${
													isActive || isCompleted
														? 'text-black'
														: 'text-gray-400 group-hover:text-gray-600'
												}`}
											>
												{step.label}
											</p>
											{isActive && (
												<span className='text-[10px] uppercase tracking-widest font-bold text-blue-600 mt-1 md:mt-1.5 bg-blue-50 px-2 py-0.5 rounded-md inline-block'>
													Joriy holat
												</span>
											)}
										</div>
									</div>
								)
							})}
						</div>
					</div>
				)}
			</div>

			{/* Asosiy ma'lumotlar Grid qismi */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Chap ustun: Mahsulotlar va Hisob */}
				<div className='lg:col-span-2 flex flex-col gap-8'>
					<div className='rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm'>
						<div className='border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center gap-2'>
							<Package className='w-5 h-5 text-gray-500' />
							<h2 className='font-semibold text-gray-900'>Mahsulotlar</h2>
						</div>
						<div className='divide-y divide-gray-100'>
							{order.items.map((item: any, index: number) => (
								<div
									key={index}
									className='p-6 flex flex-col sm:flex-row sm:items-center gap-4'
								>
									<div className='relative h-20 w-20 shrink-0 rounded-lg border border-gray-100 bg-gray-50 overflow-hidden'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={item.image || '/placeholder.png'}
											alt={item.name}
											className='h-full w-full object-cover'
											onError={e => {
												;(e.target as HTMLImageElement).src = '/placeholder.png'
											}}
										/>
									</div>
									<div className='flex flex-col flex-1'>
										<span className='text-xs font-medium text-gray-500 mb-1'>
											{item.brand}
										</span>
										<h3 className='font-medium text-gray-900 leading-snug'>
											{item.name}
										</h3>
									</div>
									<div className='flex sm:flex-col items-center sm:items-end justify-between mt-2 sm:mt-0'>
										<span className='text-sm text-gray-500'>
											{item.quantity} x ${item.price.toFixed(2)}
										</span>
										<span className='font-mono font-semibold text-gray-900'>
											${(item.quantity * item.price).toFixed(2)}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-4'>
						<div className='flex justify-between text-sm text-gray-600'>
							<span>Qidiruv summasi (Subtotal)</span>
							<span className='font-mono'>${order.subtotal.toFixed(2)}</span>
						</div>
						<div className='flex justify-between text-sm text-gray-600'>
							<span>Soliq (Tax)</span>
							<span className='font-mono'>${order.tax.toFixed(2)}</span>
						</div>
						<div className='flex justify-between text-sm text-gray-600'>
							<span>Yetkazib berish (Shipping)</span>
							<span className='font-mono'>${order.shipping.toFixed(2)}</span>
						</div>
						{order.savings > 0 && (
							<div className='flex justify-between text-sm text-emerald-600 font-medium'>
								<span>Tejalgan summa (Savings)</span>
								<span className='font-mono'>-${order.savings.toFixed(2)}</span>
							</div>
						)}
						<div className='border-t border-gray-100 pt-4 flex justify-between items-center mt-2'>
							<span className='font-semibold text-gray-900'>
								Umumiy to'lov (Total)
							</span>
							<span className='font-mono text-xl font-bold text-gray-900'>
								${order.total.toFixed(2)}
							</span>
						</div>
					</div>
				</div>

				{/* O'ng ustun: Status va Ma'lumotlar */}
				<div className='flex flex-col gap-6'>
					<div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-4'>
						<h3 className='font-semibold text-gray-900 flex items-center gap-2 mb-2'>
							<CreditCard className='w-5 h-5 text-gray-500' />
							To'lov tafsilotlari
						</h3>
						<div className='flex items-center justify-between text-sm'>
							<span className='text-gray-500'>Holati</span>
							<span
								className={`font-medium ${order.paymentStatus === "To'landi" ? 'text-emerald-600' : 'text-amber-600'}`}
							>
								{order.paymentStatus}
							</span>
						</div>

						{transaction && transaction.cardLast4 && (
							<div className='flex items-center justify-between text-sm'>
								<span className='text-gray-500'>To'lov usuli</span>
								<span className='font-medium text-gray-900 uppercase'>
									{transaction.cardBrand} •••• {transaction.cardLast4}
								</span>
							</div>
						)}

						{transaction && transaction.receiptUrl ? (
							<a
								href={transaction.receiptUrl}
								target='_blank'
								rel='noreferrer'
								className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-100'
							>
								<Receipt className='w-4 h-4' />
								Kvitansiyani ko'rish (PDF)
							</a>
						) : currentStatus === 'Qabul qilindi' ? (
							<div className='mt-2 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3'>
								<AlertTriangle className='w-5 h-5 text-orange-500 shrink-0 mt-0.5' />
								<p className='text-xs font-semibold text-orange-800 leading-relaxed'>
									To'lov to'liq amalga oshirilmagan. Kvitansiya to'lov o'tgandan
									so'ng paydo bo'ladi.
								</p>
							</div>
						) : null}
					</div>

					{/* YANGILANGAN MANZIL BLOKI (O'ng ustunga moslashtirilgan) */}
					<div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-4'>
						<h3 className='font-semibold text-gray-900 flex items-center gap-2 mb-2'>
							<MapPin className='w-5 h-5 text-gray-500' />
							Yetkazib berish manzili
						</h3>

						{order.address ? (
							<div className='bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-4'>
								<div>
									<div className='flex items-center mb-2'>
										<span className='text-[10px] font-bold uppercase tracking-widest text-black bg-gray-200 px-2 py-0.5 rounded-md'>
											{order.address.type || 'Uy'} Manzili
										</span>
									</div>

									<p className='font-bold text-lg text-gray-900 mb-1'>
										{order.address.recipient}
									</p>

									<p className='text-sm text-gray-600 leading-relaxed flex items-start gap-2 mt-2'>
										<MapPin className='w-4 h-4 text-gray-400 shrink-0 mt-0.5' />
										<span>
											<strong className='text-gray-800 font-medium'>
												{order.address.region},
											</strong>{' '}
											{order.address.fullAddress}
										</span>
									</p>
								</div>

								<div className='flex flex-col gap-1 pt-3 border-t border-gray-200/60'>
									<span className='text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5'>
										<Phone className='w-3.5 h-3.5' />
										Aloqa raqami
									</span>
									<span className='font-medium text-gray-900 tracking-wide'>
										{order.address.phone}
									</span>
								</div>
							</div>
						) : (
							<div className='bg-gray-50 border border-gray-100 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2'>
								<MapPin className='w-6 h-6 text-gray-300' />
								<p className='text-sm font-medium text-gray-500'>
									Ushbu buyurtmada manzil ma'lumotlari kiritilmagan.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
