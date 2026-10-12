'use client'

import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { ArrowRight, Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface WishlistItem {
	id: string
	name: string
	price: number
	category: string
	image: string
	inStock?: boolean
}

export default function WishlistPage() {
	const router = useRouter()

	// Zustand hook'lari
	const wishlistItems = useWishlistStore(state => state.items)
	const removeItem = useWishlistStore(state => state.removeItem)
	const clearWishlist = useWishlistStore(state => state.clearWishlist)
	const addToCart = useCartStore(state => state.addItem)

	const [loadingId, setLoadingId] = useState<string | null>(null)
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		// Client-side mounted ekanligini xavfsiz aniqlash
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	// Tezkor sotib olish (Buy Now) funksiyasi
	const handleBuyNow = (item: WishlistItem) => {
		setLoadingId(item.id)

		// 1. Mahsulotni savatga qo'shamiz
		addToCart({
			id: item.id,
			name: item.name,
			price: item.price,
			brand: item.category,
			image: item.image,
			quantity: 1,
		})

		// 2. Qisqa animatsiya berib, checkout sahifasiga yo'naltiramiz
		setTimeout(() => {
			router.push('/checkout')
			setLoadingId(null)
		}, 400)
	}

	return (
		<div className='flex flex-col gap-6 pb-10 pt-4 max-w-350 mx-auto px-4 md:px-8'>
			{/* Sarlavha qismi */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900'>
						Saralanganlar
					</h1>
					<p className='font-montserrat text-sm text-gray-500 mt-1'>
						O'zingizga yoqqan mahsulotlarni tezkor xarid qilish uchun saqlab
						qo'ying.
					</p>
				</div>
				{wishlistItems.length > 0 && (
					<div className='flex items-center gap-3'>
						<span className='font-montserrat text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200/60'>
							{wishlistItems.length} ta mahsulot
						</span>
						<button
							onClick={clearWishlist}
							className='font-montserrat text-sm font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer'
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
							className='group flex flex-col rounded-[24px] border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative'
						>
							<button
								onClick={() => removeItem(item.id)}
								className='absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-gray-200/60 text-gray-500 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer'
								title="Ro'yxatdan o'chirish"
							>
								<Trash2 className='h-4 w-4' />
							</button>

							{/* Rasm */}
							<Link
								href={`/shop/${item.id}`}
								className='relative aspect-square bg-gray-50 overflow-hidden border-b border-gray-100 block'
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={
										Array.isArray(item.image)
											? item.image[0]
											: item.image || '/placeholder.png'
									}
									alt={item.name}
									className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
									onError={e => {
										;(e.target as HTMLImageElement).src = '/placeholder.png'
									}}
								/>
								{item.inStock === false && (
									<div className='absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center'>
										<span className='bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider font-montserrat'>
											Sotuvda qolmagan
										</span>
									</div>
								)}
							</Link>

							<div className='flex flex-col p-5 flex-1'>
								<span className='font-montserrat text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5'>
									{item.category}
								</span>
								<Link href={`/shop/${item.id}`}>
									<h3 className='font-space-grotesk font-bold text-gray-900 leading-snug line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors'>
										{item.name}
									</h3>
								</Link>

								<div className='mt-auto flex items-end justify-between pt-2'>
									<span className='font-space-grotesk text-xl font-black text-black'>
										$
										{typeof item.price === 'number'
											? item.price.toLocaleString(undefined, {
													minimumFractionDigits: 2,
												})
											: item.price}
									</span>
								</div>
							</div>

							{/* Sotib olish (Buy Now) tugmasi */}
							<div className='p-5 pt-0'>
								<button
									onClick={() => handleBuyNow(item)}
									disabled={item.inStock === false || loadingId === item.id}
									className='w-full relative group/btn flex items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer overflow-hidden font-montserrat'
								>
									<span className='absolute inset-x-0 h-full bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300'></span>
									<span className='relative z-10'>
										{loadingId === item.id
											? 'Tayyorlanmoqda...'
											: 'Sotib olish'}
									</span>
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='flex flex-col items-center justify-center rounded-[32px] border border-dashed border-gray-200 bg-white py-24 text-center px-4 shadow-sm'>
					<div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 border border-gray-100 shadow-sm mb-4 relative'>
						<Heart className='h-8 w-8 text-gray-300' />
						<div className='absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-black text-white border-2 border-white flex items-center justify-center shadow-sm'>
							<span className='text-[11px] font-bold font-montserrat'>0</span>
						</div>
					</div>
					<h3 className='font-space-grotesk text-xl font-bold text-gray-900'>
						Saralanganlar ro'yxati bo'sh
					</h3>
					<p className='font-montserrat mt-2 text-sm text-gray-500 max-w-sm'>
						Siz hali hech qanday mahsulotni saqlamadingiz. Do'kondagi
						mahsulotlardagi yurakcha belgisini bosib qo'shishingiz mumkin.
					</p>
					<Link
						href='/shop'
						className='font-montserrat mt-8 flex items-center gap-2 rounded-2xl bg-black px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-gray-800 shadow-md group'
					>
						Mahsulotlarni ko'rish
						<ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>
			)}
		</div>
	)
}
