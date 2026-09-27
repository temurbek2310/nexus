'use function'
'use client'

import { ArrowRight, Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// DIQQAT: O'zingizning useStore hook'ingizni aynan shu yerda chaqirasiz.
// Masalan: import { useStore } from '@/store/useStore'

// Vaqtinchalik Mock Data (Siz o'z hook'ingizni ulaguningizcha dizayn buzilmasligi uchun)
const MOCK_WISHLIST = [
	{
		id: 'PROD-1',
		name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
		price: '$299.00',
		category: 'Elektronika',
		image:
			'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
		inStock: true,
	},
	{
		id: 'PROD-2',
		name: 'MacBook Pro 14" M3 Max Chip',
		price: '$1,999.00',
		category: 'Noutbuklar',
		image:
			'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
		inStock: true,
	},
	{
		id: 'PROD-3',
		name: 'Apple Watch Series 9 GPS',
		price: '$399.00',
		category: 'Aqlli soatlar',
		image:
			'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80',
		inStock: false,
	},
	{
		id: 'PROD-4',
		name: 'Keychron K2 Wireless Mechanical Keyboard',
		price: '$89.00',
		category: 'Aksessuarlar',
		image:
			'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
		inStock: true,
	},
]

export default function WishlistPage() {
	// ASLIDA SIZNING KODINGIZ BUNDAY BO'LADI:
	// const { wishlist, removeFromWishlist, addToCart } = useStore()

	// Hozirgi vizual ko'rinish uchun vaqtinchalik local state:
	const [wishlist, setWishlist] = React.useState(MOCK_WISHLIST)

	const handleRemove = (id: string) => {
		// Sizning asl kodingiz: removeFromWishlist(id)
		setWishlist(prev => prev.filter(item => item.id !== id))
	}

	const handleAddToCart = (item: any) => {
		// Sizning asl kodingiz: addToCart(item)
		console.log("Savatga qo'shildi:", item.name)
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
				{wishlist.length > 0 && (
					<div className='flex items-center gap-3'>
						<span className='text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md'>
							{wishlist.length} ta mahsulot
						</span>
						<button
							onClick={() => setWishlist([])} // O'zingizni clearWishlist() ga almashtirasiz
							className='text-sm font-medium text-red-600 hover:text-red-700 transition-colors'
						>
							Barchasini tozalash
						</button>
					</div>
				)}
			</div>

			{/* Mahsulotlar to'ri (Grid) yoki Bo'sh holat */}
			{wishlist.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{wishlist.map(item => (
						<div
							key={item.id}
							className='group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md overflow-hidden relative'
						>
							{/* O'chirish tugmasi (Absolute & Glassmorphism) */}
							<button
								onClick={() => handleRemove(item.id)}
								className='absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 text-gray-500 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100'
								title="Ro'yxatdan o'chirish"
							>
								<Trash2 className='h-4 w-4' />
							</button>

							{/* Rasm qismi */}
							<div className='relative aspect-square bg-gray-50 overflow-hidden border-b border-gray-100'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={item.image}
									alt={item.name}
									className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
								/>
								{!item.inStock && (
									<div className='absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center'>
										<span className='bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider'>
											Sotuvda qolmagan
										</span>
									</div>
								)}
							</div>

							{/* Ma'lumot qismi */}
							<div className='flex flex-col p-4 flex-1'>
								<span className='text-xs font-medium text-gray-500 mb-1'>
									{item.category}
								</span>
								<h3 className='font-medium text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors'>
									{item.name}
								</h3>

								<div className='mt-auto flex items-end justify-between pt-2'>
									<span className='font-mono text-lg font-bold text-gray-900'>
										{item.price}
									</span>
								</div>
							</div>

							{/* Pastki Harakat tugmasi (Footer Action) */}
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
				/* Vercel uslubidagi Empty State (Bo'sh holat) */
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
						href='/products'
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
