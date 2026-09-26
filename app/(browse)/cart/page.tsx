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
import { useMemo, useState } from 'react'

// Boshlang'ich Mock Datalar
const initialCartItems = [
	{
		id: '1',
		brand: 'DJI',
		name: 'Mavic 3 Pro',
		price: 1999,
		image: '/powercore.png', // O'zingizdagi rasm nomiga almashtiring
		quantity: 1,
	},
	{
		id: '2',
		brand: 'SONY',
		name: 'WH-1000XM5',
		price: 349,
		image: '/bottle.png',
		quantity: 2,
	},
	{
		id: '5',
		brand: 'VOLTIA',
		name: 'PowerCore 65W',
		price: 45,
		image: '/pocketpower.png',
		quantity: 1,
	},
]

export default function CartPage() {
	const [cartItems, setCartItems] = useState(initialCartItems)
	const [promoCode, setPromoCode] = useState('')

	// Miqdorni o'zgartirish funksiyasi
	const updateQuantity = (id: string, delta: number) => {
		setCartItems(items =>
			items.map(item => {
				if (item.id === id) {
					const newQuantity = Math.max(1, item.quantity + delta) // Minimal 1 ta bo'lishi kerak
					return { ...item, quantity: newQuantity }
				}
				return item
			}),
		)
	}

	// Mahsulotni savatdan o'chirish funksiyasi
	const removeItem = (id: string) => {
		setCartItems(items => items.filter(item => item.id !== id))
	}

	// Hisob-kitoblar (useMemo orqali optimizatsiya qilingan)
	const { subtotal, tax, total } = useMemo(() => {
		const subtotal = cartItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		)
		const tax = subtotal * 0.12 // 12% QQS (Soliq)
		const shipping = subtotal > 0 ? 15 : 0 // Agar savatda narsa bo'lsa, yetkazib berish $15
		const total = subtotal + tax + shipping

		return { subtotal, tax, total }
	}, [cartItems])

	// Savat bo'sh bo'lgan holat (Empty State)
	if (cartItems.length === 0) {
		return (
			<div className='bg-[#FAFAFA] flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center'>
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
			<div className='max-w-[1400px] mx-auto px-6 sm:px-12'>
				{/* Orqaga qaytish va Sarlavha */}
				<div className='mb-10'>
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
					<h1 className='font-space-grotesk text-4xl md:text-5xl font-bold tracking-tight text-black'>
						Savat
					</h1>
					<p className='font-montserrat text-gray-500 mt-2'>
						Jami {cartItems.length} ta mahsulot
					</p>
				</div>

				<div className='flex flex-col lg:flex-row gap-10 items-start'>
					{/* ================= CHAP TOMON: MAHSULOTLAR RO'YXATI ================= */}
					<div className='w-full lg:w-2/3 flex flex-col gap-4'>
						{cartItems.map(item => (
							<div
								key={item.id}
								className='flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-[2rem] hover:shadow-lg hover:border-gray-300 transition-all duration-300 group'
							>
								{/* Rasm qismi */}
								<div className='relative w-full sm:w-32 h-32 bg-[#FAFAFA] rounded-2xl overflow-hidden flex items-center justify-center shrink-0'>
									<Image
										src={item.image}
										alt={item.name}
										fill
										className='object-contain p-4 group-hover:scale-110 transition-transform duration-500'
										sizes='128px'
									/>
								</div>

								{/* Ma'lumotlar va Boshqaruv */}
								<div className='flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-6'>
									{/* Matnlar */}
									<div className='flex flex-col text-center sm:text-left'>
										<span className='font-space-grotesk text-xs font-bold tracking-widest text-gray-400 uppercase mb-1'>
											{item.brand}
										</span>
										<Link
											href={`/shop/${item.id}`}
											className='font-space-grotesk text-xl font-bold text-gray-900 hover:text-black transition-colors line-clamp-1 mb-2'
										>
											{item.name}
										</Link>
										<span className='font-montserrat text-lg font-bold text-black'>
											${item.price}
										</span>
									</div>

									{/* Miqdor va O'chirish */}
									<div className='flex items-center gap-4 sm:gap-6 mt-auto'>
										{/* Miqdor boshqaruvi */}
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

										{/* O'chirish tugmasi */}
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
					</div>

					{/* ================= O'NG TOMON: BUYURTMA XULOSASI (STICKY) ================= */}
					<div className='w-full lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-6'>
						<div className='bg-white border border-gray-200 rounded-[2rem] p-6 sm:p-8'>
							<h2 className='font-space-grotesk text-2xl font-bold text-black mb-6'>
								Buyurtma xulosasi
							</h2>

							{/* Promo kod */}
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

							{/* Hisob-kitoblar */}
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
									<span className='font-semibold text-gray-900'>$15.00</span>
								</div>
							</div>

							{/* Jami */}
							<div className='flex justify-between items-end mb-8'>
								<span className='font-montserrat text-gray-500 font-medium'>
									Jami
								</span>
								<span className='font-space-grotesk text-4xl font-bold text-black'>
									${total.toFixed(2)}
								</span>
							</div>

							{/* Checkout tugmasi */}
							<Button className='w-full h-14 bg-black text-white hover:bg-gray-800 rounded-2xl font-montserrat text-base font-semibold transition-all shadow-xl shadow-black/10 group'>
								Buyurtmani rasmiylashtirish
								<ArrowRight className='w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1' />
							</Button>
						</div>

						{/* Xavfsizlik va Ishonch */}
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
