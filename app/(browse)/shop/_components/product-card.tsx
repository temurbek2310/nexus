'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { Check, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
	product: {
		id: string
		brand: string
		name: string
		price: string
		oldPrice: string | null
		image: string
	}
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const addItem = useCartStore(state => state.addItem)
	const [isAdded, setIsAdded] = useState(false)

	let discountPercent = 0
	if (product.oldPrice) {
		discountPercent = Math.round(
			((Number(product.oldPrice) - Number(product.price)) /
				Number(product.oldPrice)) *
				100,
		)
	}

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		addItem({
			id: product.id,
			brand: product.brand,
			name: product.name,
			price: Number(product.price),
			// ASOSIY QO'SHILGAN JOY: Chegirmani hisoblash uchun oldPrice yuboriladi
			oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
			image: product.image,
			quantity: 1,
		})

		setIsAdded(true)
		setTimeout(() => setIsAdded(false), 2000)
	}

	return (
		<Link
			href={`/shop/${product.id}`}
			className='group relative flex flex-col rounded-[2rem] bg-white border border-gray-200 overflow-hidden hover:border-black/20 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 h-[400px]'
		>
			<div className='absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none'>
				<span className='font-space-grotesk text-xs font-bold tracking-widest text-gray-400 uppercase'>
					{product.brand}
				</span>
				{discountPercent > 0 && (
					<Badge className='bg-black text-white font-montserrat text-xs rounded-md shadow-md pointer-events-auto'>
						-{discountPercent}%
					</Badge>
				)}
			</div>

			<div className='relative flex-1 w-full flex items-center justify-center p-8 mt-6'>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className='object-contain p-10 drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 ease-out'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</div>

			<div className='relative z-20 p-6 bg-white border-t border-gray-100 flex items-end justify-between mt-auto'>
				<div className='flex flex-col gap-1'>
					<h3 className='font-space-grotesk font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-black transition-colors'>
						{product.name}
					</h3>
					<div className='flex items-center gap-2 font-montserrat'>
						{product.oldPrice && (
							<span className='text-gray-400 line-through text-xs'>
								${product.oldPrice}
							</span>
						)}
						<span className='text-black font-bold text-lg'>
							${product.price}
						</span>
					</div>
				</div>

				<Button
					onClick={handleAddToCart}
					size='icon'
					variant='outline'
					className={cn(
						'size-10 shrink-0 rounded-full transition-all shadow-sm group-hover:shadow-md z-30',
						isAdded
							? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
							: 'border-gray-200 hover:border-black hover:bg-black hover:text-white',
					)}
				>
					{isAdded ? (
						<Check className='size-4 animate-in zoom-in' />
					) : (
						<ShoppingCart className='size-4 transition-transform duration-300 group-hover:scale-110' />
					)}
				</Button>
			</div>
		</Link>
	)
}
