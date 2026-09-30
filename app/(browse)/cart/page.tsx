'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	ArrowLeft,
	ArrowRight,
	Minus,
	Plus,
	ShieldCheck,
	ShoppingBag,
	TicketPercent,
	Trash2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { useCartStore } from '@/store/useCartStore'

export default function CartPage() {
	const [promoCode, setPromoCode] = useState('')
	const [mounted, setMounted] = useState(false)

	// 1. ESLint xatosini hal qilish (Timeout orqali)
	useEffect(() => {
		const timer = setTimeout(() => {
			setMounted(true)
		}, 0)
		return () => clearTimeout(timer)
	}, [])

	const cartItems = useCartStore(state => state.items)

	const updateQuantity = useCartStore(state => state.updateQuantity)
	const removeItem = useCartStore(state => state.removeItem)
	const getTotalPrice = useCartStore(state => state.getTotalPrice)

	const clearCart = useCartStore(state => state.clearCart)

	const { subtotal, tax, shipping, total, savings } = useMemo(() => {
		const subtotal = getTotalPrice()
		const tax = subtotal * 0.12
		const shipping = subtotal > 0 ? 15 : 0

		const savings = cartItems.reduce((acc, item) => {
			const oldPrice = item.oldPrice ? Number(item.oldPrice) : item.price
			const diff =
				oldPrice > item.price ? (oldPrice - item.price) * item.quantity : 0
			return acc + diff
		}, 0)

		const total = subtotal + tax + shipping

		return { subtotal, tax, shipping, total, savings }
	}, [getTotalPrice, cartItems])

	if (!mounted) {
		return <div className='min-h-screen bg-[#FAFAFA]' />
	}

	if (cartItems.length === 0) {
		return (
			<div className='bg-[#FAFAFA] min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center'>
				<div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
					<ShoppingBag className='w-10 h-10 text-gray-400' />
				</div>
				<h1 className='font-space-grotesk text-3xl md:text-4xl font-bold text-black mb-4'>
					Savatingiz bo'sh
				</h1>
				<p className='font-montserrat text-gray-500 mb-8 max-w-sm'>
					Siz hali hech qanday mahsulot tanlamadingiz. Katalogga o'tib, ajoyib
					texnikalarni kashf eting.
				</p>
				<Button
					asChild
					className='h-14 px-8 bg-black text-white hover:bg-gray-800 rounded-2xl font-montserrat font-semibold group'
				>
					<Link href='/shop'>
						Do'konga o'tish
						<ArrowRight className='w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1' />
					</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-[#FAFAFA] pt-32 pb-24'>
			{/* 3. Tailwind xatosi hal qilindi (max-w-350) */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4'>
					<div>
						<Button
							asChild
							variant='ghost'
							className='mb-6 font-montserrat text-gray-500 hover:text-black hover:bg-transparent px-0'
						>
							<Link href='/shop'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Xaridlarni davom ettirish
							</Link>
						</Button>
						<h1 className='font-space-grotesk text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black'>
							Savat
						</h1>
						<p className='font-montserrat text-gray-500 mt-2'>
							Jami {cartItems.length} xil mahsulot
						</p>
					</div>

					{clearCart && (
						<Button
							variant='ghost'
							onClick={clearCart}
							className='text-red-500 hover:text-red-600 hover:bg-red-50 font-montserrat font-medium'
						>
							<Trash2 className='w-4 h-4 mr-2' />
							Savatni tozalash
						</Button>
					)}
				</div>

				<div className='flex flex-col lg:flex-row gap-10 items-start'>
					<div className='w-full lg:w-2/3 flex flex-col gap-4'>
						{cartItems.map(item => (
							<div
								key={item.id}
								className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-[2rem] hover:shadow-lg hover:border-gray-300 transition-all duration-300 group'
							>
								{/* 4. Tailwind xatosi hal qilindi (block klassi olib tashlandi) */}
								<Link
									href={`/shop/${item.id}`}
									className='relative w-full sm:w-28 h-40 sm:h-28 bg-[#FAFAFA] rounded-2xl overflow-hidden flex items-center justify-center shrink-0 cursor-pointer'
								>
									<Image
										src={item.image}
										alt={item.name}
										fill
										className='object-contain p-4 group-hover:scale-110 transition-transform duration-500'
										sizes='128px'
									/>
								</Link>

								<div className='flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-4 sm:gap-6 min-w-0'>
									<div className='flex flex-col text-center sm:text-left'>
										<span className='font-space-grotesk text-xs font-bold tracking-widest text-gray-400 uppercase mb-1'>
											{item.brand}
										</span>
										<Link
											href={`/shop/${item.id}`}
											className='font-space-grotesk text-xl font-bold text-gray-900 hover:text-black transition-colors line-clamp-1 mb-1'
										>
											{item.name}
										</Link>

										<div className='flex items-center justify-center sm:justify-start gap-2 mt-1'>
											{item.oldPrice && Number(item.oldPrice) > item.price && (
												<span className='font-montserrat text-sm text-gray-400 line-through'>
													${item.oldPrice}
												</span>
											)}
											<span className='font-montserrat text-lg font-bold text-black'>
												${item.price}
											</span>
										</div>
									</div>

									<div className='flex items-center gap-4 sm:gap-6 mt-auto'>
										<div className='flex items-center justify-between w-32 h-12 bg-white border border-gray-200 rounded-xl px-1 shrink-0'>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => updateQuantity(item.id, -1)}
												disabled={item.quantity <= 1}
												className='h-10 w-10 rounded-lg hover:bg-gray-100 disabled:opacity-50 shrink-0'
											>
												<Minus className='w-4 h-4' />
											</Button>
											<span className='font-space-grotesk font-bold text-base w-8 text-center select-none'>
												{item.quantity}
											</span>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => updateQuantity(item.id, 1)}
												className='h-10 w-10 rounded-lg hover:bg-gray-100 shrink-0'
											>
												<Plus className='w-4 h-4' />
											</Button>
										</div>

										<Button
											variant='ghost'
											size='icon'
											onClick={() => removeItem(item.id)}
											className='size-12 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0'
										>
											<Trash2 className='w-5 h-5' />
										</Button>
									</div>
								</div>
							</div>
						))}

						{clearCart && (
							<Button
								variant='outline'
								onClick={clearCart}
								className='md:hidden w-full h-12 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 rounded-xl mt-4 font-montserrat font-medium'
							>
								<Trash2 className='w-4 h-4 mr-2' />
								Savatni tozalash
							</Button>
						)}
					</div>

					<div className='w-full lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-6'>
						<div className='bg-white border border-gray-200 rounded-[2rem] p-6 sm:p-8'>
							<h2 className='font-space-grotesk text-2xl font-bold text-black mb-6'>
								Buyurtma xulosasi
							</h2>

							<div className='flex items-center gap-2 mb-8'>
								<div className='relative flex-1'>
									<TicketPercent className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
									<Input
										placeholder='Promo kodni kiriting'
										value={promoCode}
										onChange={e => setPromoCode(e.target.value)}
										className='pl-10 h-12 rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-black font-montserrat'
									/>
								</div>
								<Button
									variant='outline'
									className='h-12 rounded-xl font-montserrat font-medium border-gray-200 hover:bg-gray-50 shrink-0'
								>
									Qo'llash
								</Button>
							</div>

							<div className='flex flex-col gap-4 font-montserrat text-sm border-b border-gray-100 pb-6 mb-6'>
								<div className='flex justify-between items-center text-gray-600'>
									<span>Oraliq jami (Subtotal)</span>
									<span className='font-semibold text-gray-900'>
										${subtotal.toFixed(2)}
									</span>
								</div>
								<div className='flex justify-between items-center text-gray-600'>
									<span>Soliq (12%)</span>
									<span className='font-semibold text-gray-900'>
										${tax.toFixed(2)}
									</span>
								</div>
								<div className='flex justify-between items-center text-gray-600'>
									<span>Yetkazib berish</span>
									<span className='font-semibold text-gray-900'>
										${shipping.toFixed(2)}
									</span>
								</div>
							</div>

							{savings > 0 && (
								<div className='flex justify-between items-center bg-green-50 text-green-600 p-4 rounded-xl mb-6 font-montserrat text-sm border border-green-100'>
									<span className='font-medium'>Siz tejadingiz:</span>
									<span className='font-bold text-base'>
										-${savings.toFixed(2)}
									</span>
								</div>
							)}

							<div className='flex justify-between items-end mb-8'>
								<span className='font-montserrat text-gray-500 font-medium'>
									Jami to'lov
								</span>
								<span className='font-space-grotesk text-4xl font-bold text-black'>
									${total.toFixed(2)}
								</span>
							</div>
							<Link href={'/checkout'}>
								<Button className='w-full h-14 bg-black text-white hover:bg-gray-800 rounded-2xl font-montserrat text-base font-semibold transition-all shadow-xl shadow-black/10 group'>
									Buyurtmani rasmiylashtirish
									<ArrowRight className='w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1' />
								</Button>
							</Link>
						</div>

						<div className='flex items-center justify-center gap-2 text-gray-400 font-montserrat text-xs'>
							<ShieldCheck className='w-4 h-4' />
							<span>Xavfsiz to'lov tizimi. Ma'lumotlaringiz himoyalangan.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
