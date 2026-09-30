'use client'

import { Button } from '@/components/ui/button'
import { completeOrder } from '@/lib/actions/order.actions'
import { useCartStore } from '@/store/useCartStore'
import {
	ArrowRight,
	CheckCircle2,
	CreditCard,
	FileText,
	Package,
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SuccessOrderData {
	order: {
		_id: string
		total: number
	}
	transaction?: {
		cardBrand?: string
		cardLast4?: string
		receiptUrl?: string
	}
}

export default function SuccessClient() {
	const searchParams = useSearchParams()
	const orderId = searchParams.get('order_id')
	const clearCart = useCartStore(state => state.clearCart)

	const [loading, setLoading] = useState(true)
	const [orderData, setOrderData] = useState<SuccessOrderData | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!orderId) {
			setError('Buyurtma raqami topilmadi.')
			setLoading(false)
			return
		}

		async function verify() {
			try {
				// Yangilangan funksiya endi hamma ma'lumotni (order + transaction) qaytaradi
				const data = await completeOrder(orderId!)
				setOrderData(data)
				if (clearCart) clearCart()
			} catch (err: any) {
				setError(err.message || "To'lovni tasdiqlashda xatolik")
			} finally {
				setLoading(false)
			}
		}

		verify()
	}, [orderId, clearCart])

	if (loading) {
		return (
			<div className='min-h-screen bg-[#FAFAFA] flex items-center justify-center font-montserrat'>
				<div className='flex flex-col items-center gap-4'>
					<div className='w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin'></div>
					<p className='text-gray-600 font-medium'>
						To'lov tasdiqlanmoqda va kvitansiya tayyorlanmoqda...
					</p>
				</div>
			</div>
		)
	}

	if (error || !orderData) {
		return (
			<div className='min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center font-montserrat'>
				<div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-500 font-bold text-3xl'>
					!
				</div>
				<h1 className='font-space-grotesk text-3xl font-bold text-black mb-2'>
					Xatolik yuz berdi
				</h1>
				<p className='text-gray-500 mb-8 max-w-md'>
					{error || "Buyurtma ma'lumotlarini topib bo'lmadi."}
				</p>
				<Button asChild className='h-12 px-8 bg-black text-white rounded-2xl'>
					<Link href='/cart'>Savatga qaytish</Link>
				</Button>
			</div>
		)
	}

	const { order, transaction } = orderData

	return (
		<div className='min-h-screen bg-[#FAFAFA] pt-28 pb-16 px-4 sm:px-6 font-montserrat'>
			<div className='max-w-2xl mx-auto bg-white border border-gray-200 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-sm text-center'>
				<div className='w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6'>
					<CheckCircle2 className='w-10 h-10' />
				</div>

				<span className='font-space-grotesk text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block'>
					Muvaffaqiyatli xarid
				</span>
				<h1 className='font-space-grotesk text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4'>
					Buyurtmangiz qabul qilindi!
				</h1>
				<p className='text-gray-500 mb-8 max-w-md mx-auto'>
					Rahmat! To'lovingiz muvaffaqiyatli amalga oshirildi. Buyurtma raqami:{' '}
					<span className='font-semibold text-black'>
						#{order._id.slice(-6).toUpperCase()}
					</span>
				</p>

				<div className='bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100 flex flex-col gap-4'>
					<div className='flex flex-wrap justify-between items-center gap-1 text-sm text-gray-600'>
						<span>Jami to'langan summa:</span>
						<span className='font-bold text-xl text-black'>
							${order.total.toFixed(2)}
						</span>
					</div>
					<div className='w-full h-px bg-gray-200 my-1'></div>

					<div className='flex justify-between items-center text-sm text-gray-600'>
						<span>To'lov usuli:</span>
						<div className='flex items-center gap-2 font-semibold text-black'>
							<CreditCard className='w-4 h-4' />
							<span className='uppercase'>
								{transaction?.cardBrand || 'Karta'}
							</span>
							<span>**** {transaction?.cardLast4 || '****'}</span>
						</div>
					</div>

					<div className='flex justify-between items-center text-sm text-gray-600'>
						<span>Buyurtma holati:</span>
						<span className='font-semibold text-black'>Tayyorlanmoqda</span>
					</div>

					{/* Kvitansiya Yuklab olish tugmasi */}
					{transaction?.receiptUrl && (
						<div className='mt-4 pt-4 border-t border-gray-200'>
							<a
								href={transaction.receiptUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center justify-center w-full gap-2 p-3 bg-white border border-gray-200 rounded-xl text-black font-semibold hover:bg-gray-50 transition-colors'
							>
								<FileText className='w-4 h-4' />
								Kvitansiyani ko'rish va yuklab olish (PDF)
							</a>
						</div>
					)}
				</div>

				{/* Tugmalar qismi */}
				<div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4'>
					{/* Oq fonli "Opposite" tugma (Ikonkasi bilan) */}
					<Button
						asChild
						variant='outline'
						className='w-full sm:w-auto h-14 px-8 bg-white border-2 border-black text-black hover:bg-gray-50 rounded-2xl font-semibold'
					>
						<Link href='/dashboard/orders'>
							<Package className='w-5 h-5 mr-2' />
							Buyurtmalarim
						</Link>
					</Button>

					{/* Qora fonli asosiy tugma */}
					<Button
						asChild
						className='w-full sm:w-auto h-14 px-8 bg-black text-white hover:bg-gray-800 rounded-2xl font-semibold'
					>
						<Link href='/shop'>
							Xaridlarni davom ettirish
							<ArrowRight className='w-5 h-5 ml-2' />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
