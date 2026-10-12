'use client'

import { useCartStore } from '@/store/useCartStore' // Yo'lni o'zingizga moslang
import { useWishlistStore } from '@/store/useWishlistStore' // Yo'lni o'zingizga moslang
import { ArrowRight, Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function WishlistPage() {
	// Zustand hook'lari
	const wishlistItems = useWishlistStore(state => state.items)
	const removeItem = useWishlistStore(state => state.removeItem)
	const clearWishlist = useWishlistStore(state => state.clearWishlist)

	const addToCart = useCartStore(state => state.addItem)

	// Hydration Error ning oldini olish uchun (Zustand persist ishlatganda shart)
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null // Dastlabki render server bilan bir xil bo'lishi uchun

	const handleAddToCart = (item: any) => {
		// Mahsulotni savatga qo'shish
		addToCart({
			id: item.id,
			name: item.name,
			price: item.price,
			brand: item.category,
			image: item.image,
			quantity: 1,
		})
	}

	return (
		<div className='flex flex-col gap-6 pb-10 pt-4'>
			{/* Sarlavha qismi */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
						Saralanganlar
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						O'zingizga yoqqan mahsulotlarni keyinroq xarid qilish uchun saqlab
						qo'ying.
					</p>
				</div>
				{wishlistItems.length > 0 && (
					<div className='flex items-center gap-3'>
						<span className='text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md'>
							{wishlistItems.length} ta mahsulot
						</span>
						<button
							onClick={clearWishlist}
							className='text-sm font-medium text-red-600 hover:text-red-700 transition-colors'
						>
							Barchasini tozalash
						</button>
					</div>
				)}
			</div>

			{/* Mahsulotlar to'ri (Grid) yoki Bo'sh holat */}
			{wishlistItems.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{wishlistItems.map(item => (
						<div
							key={item.id}
							className='group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md overflow-hidden relative'
						>
							<button
								onClick={() => removeItem(item.id)}
								className='absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 text-gray-500 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100'
								title="Ro'yxatdan o'chirish"
							>
								<Trash2 className='h-4 w-4' />
							</button>

							{/* O'ZGARISH: Rasm endi /shop/[id] ga eltuvchi Link ichida */}
							<Link
								href={`/shop/${item.id}`}
								className='relative aspect-square bg-gray-50 overflow-hidden border-b border-gray-100 block'
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={item.image || '/placeholder.png'}
									alt={item.name}
									className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
									onError={e => {
										;(e.target as HTMLImageElement).src = '/placeholder.png'
									}}
								/>
								{!item.inStock && (
									<div className='absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center'>
										<span className='bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider'>
											Sotuvda qolmagan
										</span>
									</div>
								)}
							</Link>

							<div className='flex flex-col p-4 flex-1'>
								<span className='text-xs font-medium text-gray-500 mb-1'>
									{item.category}
								</span>
								{/* O'ZGARISH: Nom qismi ham /shop/[id] ga yo'naltirildi */}
								<Link href={`/shop/${item.id}`}>
									<h3 className='font-medium text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors'>
										{item.name}
									</h3>
								</Link>

								<div className='mt-auto flex items-end justify-between pt-2'>
									<span className='font-mono text-lg font-bold text-gray-900'>
										${item.price}
									</span>
								</div>
							</div>

							<div className='p-4 pt-0'>
								<button
									onClick={() => handleAddToCart(item)}
									disabled={!item.inStock}
									className='w-full flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
								>
									<ShoppingCart className='h-4 w-4' />
									{item.inStock ? "Savatga qo'shish" : 'Mavjud emas'}
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center px-4'>
					<div className='flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm mb-4 relative'>
						<Heart className='h-6 w-6 text-gray-300' />
						<div className='absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center'>
							<span className='text-[10px] font-bold text-gray-400'>0</span>
						</div>
					</div>
					<h3 className='text-base font-semibold text-gray-900'>
						Ro'yxatingiz bo'sh
					</h3>
					<p className='mt-1.5 text-sm text-gray-500 max-w-sm'>
						Siz hali hech qanday mahsulotni saralanganlarga qo'shmadingiz.
						Yoqtirgan mahsulotlaringizdagi yurakcha belgisini bosing.
					</p>
					<Link
						href='/shop' // Buni ham /products dan /shop ga o'zgartirdim, logikaga mos tushishi uchun
						className='mt-6 flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-50 hover:border-gray-300 shadow-sm'
					>
						Mahsulotlarni ko'rish
						<ArrowRight className='h-4 w-4' />
					</Link>
				</div>
			)}
		</div>
	)
}
