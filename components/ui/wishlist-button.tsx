'use client'

import { cn } from '@/lib/utils'
import { useWishlistStore } from '@/store/useWishlistStore'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

interface WishlistButtonProps {
	product: {
		id: string
		name: string
		price: number | string
		category?: string
		brand?: string
		image: string
		inStock?: boolean
	}
	className?: string
	variant?: 'icon' | 'full'
}

export default function WishlistButton({
	product,
	className,
	variant = 'icon',
}: WishlistButtonProps) {
	const [isMounted, setIsMounted] = useState(false)
	const toggleWishlist = useWishlistStore(state => state.toggleWishlist)
	// isInWishlist funksiyasi o'rniga to'g'ridan-to'g'ri items array'ini kuzatamiz:
	const isLiked = useWishlistStore(state =>
		state.items.some(item => item.id === product.id),
	)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		// Yuklanayotganda "Add to Cart" tugmasiga o'xshash bo'sh holat
		if (variant === 'full') {
			return (
				<button
					className={cn(
						'flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-300',
						className,
					)}
				>
					<Heart className='w-4 h-4' />
					Saralash
				</button>
			)
		}
		return (
			<button
				className={cn(
					'flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-300',
					className,
				)}
			>
				<Heart className='w-4 h-4' />
			</button>
		)
	}

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation() // Parent element bosilib ketishini oldini oladi (kartochka ichiga kirib ketmaslik uchun)

		// Product ma'lumotlarini to'g'irlab jo'natamiz
		toggleWishlist({
			id: product.id,
			name: product.name,
			price: Number(product.price),
			category: product.category || product.brand || 'Boshqa',
			// SHU YERDA IMAGE TO'G'RI KELAYOTGANIGA ISHONCH HOSIL QILING!
			image:
				typeof product.image === 'string'
					? product.image
					: product.image?.[0] || '',
			inStock: product.inStock !== undefined ? product.inStock : true,
		})
	}

	// 1. Matnli katta tugma (Mahsulotning ichki sahifasi uchun)
	if (variant === 'full') {
		return (
			<button
				onClick={handleToggle}
				className={cn(
					'flex items-center justify-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95 z-30',
					isLiked
						? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
						: 'border-gray-200 bg-white text-gray-700 hover:border-black hover:bg-black hover:text-white shadow-sm',
					className,
				)}
			>
				<Heart
					className={cn('w-4 h-4 transition-all', isLiked && 'fill-current')}
				/>
				{isLiked ? 'Saralangan' : 'Saralash'}
			</button>
		)
	}

	// 2. Faqat ikonka tugma ("Add to Cart" tugmasiga to'liq moslashtirilgan dumaloq dizayn)
	return (
		<button
			onClick={handleToggle}
			className={cn(
				'flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 shadow-sm z-30 active:scale-95',
				isLiked
					? 'border-red-500 bg-red-50 text-red-500 hover:bg-red-100'
					: 'border-gray-200 bg-white text-gray-700 hover:border-black hover:bg-black hover:text-white',
				className,
			)}
			title={
				isLiked ? "Saralanganlardan o'chirish" : "Saralanganlarga qo'shish"
			}
		>
			<Heart
				className={cn(
					'size-4 transition-all',
					isLiked && 'fill-current scale-110',
				)}
			/>
		</button>
	)
}
