'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { updateOrderStatusAdmin } from '@/lib/actions/order.actions'
import {
	AlertTriangle,
	ArrowLeft,
	Check,
	CheckCircle2,
	ClipboardList,
	Clock,
	CreditCard,
	FileText,
	Loader2,
	MapPin,
	Package,
	Phone,
	ShieldCheck,
	Truck,
	XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const STATUS_FLOW = [
	{ id: 'Qabul qilindi', label: 'Qabul qilindi', icon: ClipboardList },
	{ id: "To'landi", label: "To'landi", icon: CreditCard },
	{ id: 'Qadoqlanmoqda', label: 'Qadoqlanmoqda', icon: Package },
	{ id: "Yo'lda", label: "Yo'lda", icon: Truck },
	{ id: 'Yetkazib berildi', label: 'Bajarildi', icon: CheckCircle2 },
]

const getStatusConfig = (status: string) => {
	switch (status) {
		case 'Qabul qilindi':
			return {
				label: 'Qabul qilindi',
				color: 'bg-gray-100 text-gray-700',
				border: 'border-gray-200',
			}
		case "To'landi":
			return {
				label: "To'landi (Yangi)",
				color: 'bg-blue-50 text-blue-700',
				border: 'border-blue-200',
			}
		case 'Qadoqlanmoqda':
			return {
				label: 'Qadoqlanmoqda',
				color: 'bg-orange-50 text-orange-700',
				border: 'border-orange-200',
			}
		case "Yo'lda":
			return {
				label: "Yo'lda",
				color: 'bg-indigo-50 text-indigo-700',
				border: 'border-indigo-200',
			}
		case 'Yetkazib berildi':
			return {
				label: 'Yetkazib berildi',
				color: 'bg-green-50 text-green-700',
				border: 'border-green-200',
			}
		case 'Bekor qilingan':
			return {
				label: 'Bekor qilingan',
				color: 'bg-red-50 text-red-700',
				border: 'border-red-200',
			}
		default:
			return {
				label: "Noma'lum",
				color: 'bg-gray-50 text-gray-700',
				border: 'border-gray-200',
			}
	}
}

const formatDate = (dateString: string) => {
	const d = new Date(dateString)
	return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()} | ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function AdminOrderDetailsClient({
	initialOrder,
	transaction,
}: {
	initialOrder: any
	transaction: any
}) {
	const router = useRouter()
	const [order, setOrder] = React.useState(initialOrder)
	const [updatingId, setUpdatingId] = React.useState<string | null>(null)

	const [isAlertOpen, setIsAlertOpen] = React.useState(false)
	const [pendingStatus, setPendingStatus] = React.useState<string | null>(null)

	const currentConfig = getStatusConfig(order.orderStatus)
	const currentStepIndex = STATUS_FLOW.findIndex(
		s => s.id === order.orderStatus,
	)
	const isCancelled = order.orderStatus === 'Bekor qilingan'

	const orderDisplayId = `ORD-${order._id.slice(-6).toUpperCase()}`
	const customerName =
		order.user?.fullName || order.user?.firstName || "Noma'lum"
	const customerEmail =
		order.user?.email ||
		order.user?.primaryEmailAddress?.emailAddress ||
		'Mijoz emaili topilmadi'

	const handleStatusClick = (newStatus: string) => {
		if (order.orderStatus === newStatus || updatingId) return
		setPendingStatus(newStatus)
		setIsAlertOpen(true)
	}

	const confirmStatusChange = async () => {
		if (!pendingStatus) return

		setIsAlertOpen(false)
		setUpdatingId(pendingStatus)

		const res = await updateOrderStatusAdmin(order._id, pendingStatus)

		if (res.success) {
			setOrder({ ...order, orderStatus: pendingStatus })
			router.refresh()
		} else {
			alert("Xatolik yuz berdi. Holatni yangilab bo'lmadi.")
		}

		setUpdatingId(null)
		setPendingStatus(null)
	}

	return (
		<div className='w-full pb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pt-6 animate-in fade-in duration-700 ease-out'>
			{/* --- SHADCN ALERT DIALOG --- */}
			<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
				<AlertDialogContent className='bg-white rounded-[24px]'>
					<AlertDialogHeader>
						<AlertDialogTitle className='font-space-grotesk text-xl'>
							Holatni o'zgartirish
						</AlertDialogTitle>
						<AlertDialogDescription className='font-montserrat text-gray-500'>
							Buyurtma holatini haqiqatan ham{' '}
							<strong className='text-black'>"{pendingStatus}"</strong>{' '}
							bosqichiga o'tkazmoqchimisiz? Ushbu o'zgarish mijozga ham
							ko'rinadi.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className='mt-4'>
						<AlertDialogCancel className='font-montserrat rounded-xl'>
							Bekor qilish
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={confirmStatusChange}
							className={`font-montserrat rounded-xl text-white ${pendingStatus === 'Bekor qilingan' ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-900'}`}
						>
							Tasdiqlash
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* 1. KREATIV HEADER */}
			<div className='relative mb-10 overflow-hidden bg-white border border-gray-200/80 rounded-[32px] p-6 md:p-8 shadow-sm'>
				<div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50 pointer-events-none'></div>

				<div className='relative z-10'>
					<Link
						href='/admin/orders'
						className='inline-flex items-center text-sm font-montserrat font-semibold text-gray-500 hover:text-black transition-colors mb-6 group w-max'
					>
						<div className='w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors'>
							<ArrowLeft className='w-4 h-4' />
						</div>
						Buyurtmalar ro'yxatiga qaytish
					</Link>

					<div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
						<div>
							<div className='flex items-center space-x-3 mb-2'>
								<Badge
									className={`font-montserrat text-xs px-3 py-1 uppercase tracking-widest font-bold border ${currentConfig.color} ${currentConfig.border}`}
								>
									{currentConfig.label}
								</Badge>
								<span className='font-montserrat text-sm text-gray-400 font-semibold flex items-center'>
									<Clock className='w-4 h-4 mr-1.5' />{' '}
									{formatDate(order.createdAt)}
								</span>
							</div>
							<h1 className='font-space-grotesk text-4xl md:text-5xl font-black text-black tracking-tight'>
								Buyurtma <span className='text-gray-300'>#</span>
								{orderDisplayId.split('-')[1]}
							</h1>
						</div>

						<div className='flex items-center space-x-3 bg-gray-50 p-2 rounded-2xl border border-gray-100'>
							<div className='flex items-center space-x-3 px-4 py-2'>
								<div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-space-grotesk font-bold text-lg'>
									{customerName.charAt(0).toUpperCase()}
								</div>
								<div className='flex flex-col'>
									<span className='font-montserrat text-sm font-bold text-black'>
										{customerName}
									</span>
									<span className='font-montserrat text-xs font-medium text-gray-500'>
										{customerEmail}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 2. DEDICATED STATUS CONTROL CENTER (Admin uchun) */}
			<div className='bg-white border border-gray-200/80 rounded-[32px] p-6 md:p-10 shadow-sm mb-10 relative overflow-hidden'>
				<div className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
					<div>
						<h3 className='font-space-grotesk text-2xl font-bold text-black flex items-center'>
							<ShieldCheck className='w-6 h-6 mr-3 text-black' />
							Holatni boshqarish
						</h3>
						<p className='font-montserrat text-sm text-gray-500 font-medium mt-1'>
							Buyurtma qaysi bosqichdaligini belgilang. Yangilash uchun qadamlar
							ustiga bosing.
						</p>
					</div>

					{!isCancelled && (
						<Button
							variant='outline'
							onClick={() => handleStatusClick('Bekor qilingan')}
							disabled={updatingId !== null}
							className='font-montserrat text-sm font-bold text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-xl transition-all'
						>
							<XCircle className='w-4 h-4 mr-2' /> Buyurtmani bekor qilish
						</Button>
					)}
				</div>

				{isCancelled ? (
					<div className='flex flex-col items-center justify-center py-8 text-center bg-red-50/50 rounded-2xl border border-red-100'>
						<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
							<XCircle className='w-8 h-8 text-red-600' />
						</div>
						<h4 className='font-space-grotesk text-xl font-bold text-red-700 mb-2'>
							Buyurtma bekor qilingan
						</h4>
						<p className='font-montserrat text-sm text-red-600/80 max-w-md'>
							Ushbu buyurtma to'xtatilgan. Holatni tiklash uchun sahifa
							jadvalidan holatni "Qabul qilindi" ga o'zgartiring.
						</p>
					</div>
				) : (
					<div className='relative pt-4 overflow-x-auto hide-scrollbar pb-4 md:pb-0'>
						<div className='min-w-[600px] md:min-w-0 relative'>
							<div className='absolute top-[22px] left-0 w-full h-[3px] bg-gray-100 rounded-full'></div>

							<div
								className='absolute top-[22px] left-0 h-[3px] bg-black transition-all duration-700 ease-in-out rounded-full'
								style={{
									width: `${(Math.max(0, currentStepIndex) / (STATUS_FLOW.length - 1)) * 100}%`,
								}}
							></div>

							<div className='grid grid-cols-5 gap-0 relative z-10'>
								{STATUS_FLOW.map((step, index) => {
									const isCompleted = index < currentStepIndex
									const isActive = index === currentStepIndex
									const StepIcon = step.icon
									const isProcessingThis = updatingId === step.id

									return (
										<div
											key={step.id}
											onClick={() => handleStatusClick(step.id)}
											className={`group relative flex flex-col items-center justify-center gap-3 cursor-pointer p-0 rounded-2xl transition-all duration-300`}
										>
											<div
												className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 relative z-10 ${
													isProcessingThis
														? 'border-gray-300 bg-white'
														: isCompleted
															? 'bg-black border-black text-white group-hover:scale-110 shadow-lg'
															: isActive
																? 'bg-white border-black text-black ring-4 ring-black/10 scale-110'
																: 'bg-white border-gray-200 text-gray-400 group-hover:border-gray-400'
												}`}
											>
												{isProcessingThis ? (
													<Loader2 className='w-5 h-5 text-black animate-spin' />
												) : isCompleted ? (
													<Check className='w-5 h-5' />
												) : (
													<StepIcon className='w-5 h-5' />
												)}
											</div>

											<div className='text-center'>
												<p
													className={`font-space-grotesk font-bold text-sm transition-colors ${isActive || isCompleted ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}
												>
													{step.label}
												</p>
												{isActive && (
													<p className='font-montserrat text-[10px] uppercase tracking-widest font-bold text-blue-600 mt-1.5 bg-blue-50 px-2 py-0.5 rounded-md inline-block'>
														Joriy holat
													</p>
												)}
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				)}
			</div>

			<div className='flex flex-col lg:flex-row gap-8 xl:gap-12'>
				{/* CHAP TOMON: Mahsulotlar va Manzil */}
				<div className='flex-1 space-y-8'>
					<div className='bg-white border border-gray-200/80 rounded-[32px] p-6 md:p-8 shadow-sm'>
						<h3 className='font-space-grotesk text-xl font-bold text-black mb-6 flex items-center'>
							<Package className='w-5 h-5 mr-3 text-black' /> Buyurtma qilingan
							mahsulotlar
						</h3>

						<div className='space-y-4'>
							{order.items.map((item: any, idx: number) => (
								<div
									key={idx}
									className='flex flex-col sm:flex-row gap-4 sm:items-center p-4 rounded-[20px] border border-gray-100 bg-gray-50/50 group hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300'
								>
									<div className='relative w-24 h-24 bg-white border border-gray-100 rounded-[16px] flex-shrink-0 flex items-center justify-center overflow-hidden'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={item.image || '/placeholder.png'}
											alt={item.name}
											className='object-cover w-full h-full p-2 group-hover:scale-110 transition-transform duration-500'
											onError={e => {
												;(e.target as HTMLImageElement).src = '/placeholder.png'
											}}
										/>
									</div>
									<div className='flex-1 flex flex-col justify-center'>
										<span className='text-xs font-medium text-gray-500 mb-1'>
											{item.brand}
										</span>
										<p className='font-montserrat font-bold text-black text-base line-clamp-2 leading-snug'>
											{item.name}
										</p>
										<div className='flex items-center gap-3 mt-2'>
											<Badge
												variant='secondary'
												className='font-montserrat text-xs font-semibold bg-white border border-gray-200'
											>
												{item.quantity} ta
											</Badge>
											<span className='font-montserrat text-sm text-gray-500 font-medium'>
												Dona narxi: ${item.price.toFixed(2)}
											</span>
										</div>
									</div>
									<div className='flex items-center sm:justify-end font-space-grotesk font-black text-black text-2xl mt-4 sm:mt-0'>
										${(item.price * item.quantity).toFixed(2)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* YETKAZIB BERISH MANZILI BLOKI */}
					<div className='bg-white border border-gray-200/80 rounded-[32px] p-6 md:p-8 shadow-sm'>
						<h3 className='font-space-grotesk text-xl font-bold text-black mb-6 flex items-center'>
							<MapPin className='w-5 h-5 mr-3 text-black' /> Yetkazib berish
							manzili
						</h3>

						{order.address ? (
							<div className='bg-[#fafafa] border border-gray-100 rounded-[24px] p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between transition-all hover:border-gray-200 hover:shadow-sm'>
								<div>
									<div className='flex items-center mb-3'>
										<span className='font-montserrat text-[10px] font-bold uppercase tracking-widest text-black bg-gray-200 px-3 py-1 rounded-md'>
											{order.address.type || 'Uy'} Manzili
										</span>
									</div>

									{/* Qabul qiluvchining ismi */}
									<p className='font-space-grotesk font-bold text-xl text-black mb-1'>
										{order.address.recipient}
									</p>

									{/* Viloyat va aniq manzil */}
									<p className='font-montserrat text-sm text-gray-600 leading-relaxed max-w-sm flex items-start gap-2 mt-3'>
										<MapPin className='w-4 h-4 text-gray-400 shrink-0 mt-0.5' />
										<span>
											<strong className='text-gray-800 font-medium'>
												{order.address.region},
											</strong>{' '}
											{order.address.fullAddress}
										</span>
									</p>
								</div>

								{/* Telefon raqami */}
								<div className='flex items-center md:flex-col md:items-end gap-3 md:gap-1 p-4 bg-white rounded-2xl border border-gray-100'>
									<span className='font-montserrat text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5'>
										<Phone className='w-3.5 h-3.5' />
										Aloqa raqami
									</span>
									<span className='font-space-grotesk text-lg font-bold text-black tracking-wide'>
										{order.address.phone}
									</span>
								</div>
							</div>
						) : (
							<div className='bg-gray-50 border border-gray-100 rounded-[24px] p-8 text-center flex flex-col items-center justify-center gap-2'>
								<MapPin className='w-6 h-6 text-gray-300' />
								<p className='font-montserrat text-sm font-medium text-gray-500'>
									Ushbu buyurtmada manzil ma'lumotlari mavjud emas.
								</p>
							</div>
						)}
					</div>
				</div>

				{/* O'NG TOMON: Moliya va To'lov */}
				<div className='w-full lg:w-[420px] flex-shrink-0 space-y-8'>
					<div className='bg-black rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden'>
						<div className='absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3'></div>

						<h3 className='font-space-grotesk text-xl font-bold mb-8 flex items-center relative z-10'>
							Moliya
						</h3>

						<div className='space-y-5 mb-8 relative z-10'>
							<div className='flex justify-between font-montserrat text-sm'>
								<span className='text-gray-400 font-medium'>
									Qidiruv (Subtotal)
								</span>
								<span className='font-bold text-white'>
									${order.subtotal.toFixed(2)}
								</span>
							</div>
							<div className='flex justify-between font-montserrat text-sm'>
								<span className='text-gray-400 font-medium'>Soliq (Tax)</span>
								<span className='font-bold text-white'>
									${order.tax.toFixed(2)}
								</span>
							</div>
							<div className='flex justify-between font-montserrat text-sm'>
								<span className='text-gray-400 font-medium'>
									Yetkazib berish
								</span>
								<span className='font-bold text-white'>
									${order.shipping.toFixed(2)}
								</span>
							</div>
						</div>

						<hr className='border-white/10 mb-8 relative z-10' />

						<div className='flex justify-between items-end relative z-10'>
							<span className='font-space-grotesk text-sm font-bold text-gray-400 uppercase tracking-widest mb-1'>
								Jami:
							</span>
							<span className='font-space-grotesk text-4xl font-black text-white'>
								${order.total.toFixed(2)}
							</span>
						</div>
					</div>

					<div className='bg-white border border-gray-200/80 rounded-[32px] p-8 shadow-sm'>
						<h3 className='font-space-grotesk text-xl font-bold text-black mb-8 flex items-center'>
							<CreditCard className='w-5 h-5 mr-3 text-black' /> To'lov
							tafsilotlari
						</h3>

						<div className='space-y-6 mb-8'>
							<div>
								<span className='font-montserrat text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1'>
									To'lov Holati
								</span>
								{order.paymentStatus === "To'landi" ? (
									<Badge className='bg-green-50 text-green-700 hover:bg-green-50 font-montserrat font-bold border-green-200 px-3 py-1'>
										<CheckCircle2 className='w-3.5 h-3.5 mr-1.5' />{' '}
										Muvaffaqiyatli
									</Badge>
								) : (
									<Badge className='bg-orange-50 text-orange-700 hover:bg-orange-50 font-montserrat font-bold border-orange-200 px-3 py-1'>
										<Clock className='w-3.5 h-3.5 mr-1.5' />{' '}
										{order.paymentStatus}
									</Badge>
								)}
							</div>

							{transaction && transaction.cardBrand && (
								<div>
									<span className='font-montserrat text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1'>
										Karta
									</span>
									<span className='font-space-grotesk text-lg font-bold text-black uppercase'>
										{transaction.cardBrand} •••• {transaction.cardLast4}
									</span>
								</div>
							)}
						</div>

						{transaction && transaction.receiptUrl ? (
							<a
								href={transaction.receiptUrl}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Button className='w-full h-14 rounded-2xl bg-white hover:bg-gray-50 text-black border-2 border-gray-200 shadow-sm font-montserrat font-bold transition-all group'>
									<FileText className='w-5 h-5 mr-2 text-black transition-transform' />
									Kvitansiya (PDF) ko'rish
								</Button>
							</a>
						) : order.paymentStatus !== "To'landi" ? (
							<div className='p-5 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3'>
								<AlertTriangle className='w-5 h-5 text-orange-500 shrink-0 mt-0.5' />
								<p className='font-montserrat text-xs font-semibold text-orange-800 leading-relaxed'>
									To'lov hali amalga oshirilmagan yoki tasdiqlanmagan.
								</p>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}
