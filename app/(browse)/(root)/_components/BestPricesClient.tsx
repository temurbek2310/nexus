'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { ArrowRight, Check, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export interface Product {
	id: string // MongoDB ObjectId uchun string
	brand: string
	name: string
	oldPrice: string | null
	price: string
	image: string
}

interface BestPricesClientProps {
	products: Product[]
}

const getGridStyles = (index: number) => {
	if (index === 0)
		return 'lg:col-span-2 lg:row-span-2 min-h-[400px] lg:min-h-[550px]'
	if (index === 5 || index === 6)
		return 'sm:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[300px]'
	return 'col-span-1 row-span-1 min-h-[300px]'
}

export default function BestPricesClient({ products }: BestPricesClientProps) {
	const addItem = useCartStore(state => state.addItem)
	const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})

	const handleAddToCart = (e: React.MouseEvent, product: Product) => {
		e.preventDefault()
		e.stopPropagation()

		addItem({
			id: product.id, // String formatda ketadi
			brand: product.brand,
			name: product.name,
			price: Number(product.price),
			image: product.image,
			quantity: 1,
		})

		setAddedItems(prev => ({ ...prev, [product.id]: true }))
		setTimeout(() => {
			setAddedItems(prev => ({ ...prev, [product.id]: false }))
		}, 2000)
	}

	// Agar ma'lumot kelmasa
	if (!products || products.length === 0) return null

	return (
		<section className='py-24 bg-white border-b border-gray-200'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* Sarlavha qismi */}
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
					<div>
						<Badge
							variant='outline'
							className='mb-4 bg-gray-50 border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1 px-3'
						>
							Qaynoq takliflar
						</Badge>
						<h2 className='font-space-grotesk text-3xl md:text-4xl font-bold tracking-tight text-black'>
							Eng yaxshi narxlar
						</h2>
						<p className='font-montserrat text-gray-500 mt-3 max-w-md text-sm text-balance'>
							Premium gadjetlar va uskunalar endi ancha arzon narxlarda.
							Chegirmalar vaqti chegaralangan, hoziroq xarid qiling.
						</p>
					</div>

					<Button
						asChild
						variant='ghost'
						className='group font-montserrat text-sm font-medium text-black hover:bg-transparent hover:text-gray-600 px-0'
					>
						<Link href='/shop?filter=sale'>
							Barcha chegirmalar
							<ArrowRight className='size-4 ml-2 group-hover:translate-x-1 transition-transform' />
						</Link>
					</Button>
				</div>

				{/* Bento Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr'>
					{products.map((product, index) => {
						let discountPercent = 0
						if (product.oldPrice) {
							discountPercent = Math.round(
								((Number(product.oldPrice) - Number(product.price)) /
									Number(product.oldPrice)) *
									100,
							)
						}

						const isFeatured = index === 0
						const isAdded = addedItems[product.id]

						return (
							<Link
								href={`/shop/${product.id}`}
								key={product.id}
								className={cn(
									'group relative flex flex-col rounded-3xl bg-white border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300',
									getGridStyles(index),
								)}
							>
								{isFeatured && (
									<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none'></div>
								)}

								<div className='absolute top-0 left-0 w-full p-5 md:p-6 flex justify-between items-start z-20 pointer-events-none'>
									<span className='font-space-grotesk text-xs md:text-sm font-bold tracking-widest text-gray-400 uppercase'>
										{product.brand}
									</span>
									{discountPercent > 0 && (
										<Badge className='bg-black text-white hover:bg-gray-800 font-montserrat text-xs pointer-events-auto rounded-md px-2 py-0.5'>
											-{discountPercent}%
										</Badge>
									)}
								</div>

								<div className='relative flex-1 w-full flex items-center justify-center p-8 mt-8 pointer-events-none'>
									{isFeatured && (
										<div className='absolute inset-0 bg-gray-100 rounded-full blur-[80px] opacity-0 group-hover:opacity-50 transition-opacity duration-700 w-3/4 h-3/4 m-auto'></div>
									)}
									{product.image && (
										<Image
											src={product.image}
											alt={product.name}
											fill
											className={cn(
												'object-contain p-8 md:p-12 drop-shadow-lg group-hover:scale-105 transition-transform duration-700 ease-out',
												isFeatured ? 'p-12 md:p-20' : 'p-8',
											)}
											sizes='(max-width: 768px) 100vw, 50vw'
										/>
									)}
								</div>

								<div className='relative z-20 p-5 md:p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-end justify-between mt-auto'>
									<div className='flex flex-col gap-1 pointer-events-none'>
										<h3
											className={cn(
												'font-space-grotesk font-bold text-gray-900 line-clamp-1',
												isFeatured ? 'text-xl md:text-2xl' : 'text-lg',
											)}
										>
											{product.name}
										</h3>
										<div className='flex items-center gap-2 font-montserrat'>
											{product.oldPrice && (
												<span className='text-gray-400 line-through text-xs md:text-sm'>
													${product.oldPrice}
												</span>
											)}
											<span className='text-black font-semibold text-base md:text-lg'>
												${product.price}
											</span>
										</div>
									</div>

									<Button
										onClick={e => handleAddToCart(e, product)}
										size='icon'
										variant='outline'
										className={cn(
											'size-10 shrink-0 rounded-full transition-all duration-300 shadow-sm z-30',
											isAdded
												? 'bg-green-500 text-white border-green-500'
												: 'border-gray-200 hover:border-black hover:bg-black hover:text-white',
										)}
									>
										{isAdded ? (
											<Check className='size-4 animate-in zoom-in' />
										) : (
											<ShoppingCart className='size-4' />
										)}
									</Button>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		</section>
	)
}
