'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Box, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

// 2. Mahsulotlar datasi (Pastki Grid uchun)
const products = [
	{
		id: 1,
		brand: 'VOLTIA',
		name: 'PowerCore 65W',
		oldPrice: '39',
		price: '22',
		image: '/powercore.png',
	},
	{
		id: 2,
		brand: 'HYDRON',
		name: 'Smart Bottle',
		oldPrice: '40',
		price: '35',
		image: '/bottle.png',
	},
	{
		id: 3,
		brand: 'NEXA',
		name: 'PocketPower 10K',
		oldPrice: '55',
		price: '39',
		image: '/pocketpower.png',
	},
	{
		id: 4,
		brand: 'HOMEY',
		name: 'HOMEY Video Doorbell',
		oldPrice: '99',
		price: '79',
		image: '/doorbell.png',
	},
	{
		id: 5,
		brand: 'HYDRON',
		name: 'Smart Bottle',
		oldPrice: '40',
		price: '35',
		image: '/bottle.png',
	},
	{
		id: 6,
		brand: 'NEXA',
		name: 'PocketPower 10K',
		oldPrice: '55',
		price: '39',
		image: '/pocketpower.png',
	},
	{
		id: 7,
		brand: 'HOMEY',
		name: 'HOMEY Video Doorbell',
		oldPrice: '99',
		price: '79',
		image: '/doorbell.png',
	},
]
// Grid o'lchamlarini indeksga qarab belgilaydigan yordamchi funksiya
const getGridStyles = (index: number) => {
	if (index === 0) {
		return 'lg:col-span-2 lg:row-span-2 min-h-[400px] lg:min-h-[550px]'
	}
	if (index === 5 || index === 6) {
		return 'sm:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[300px]'
	}
	return 'col-span-1 row-span-1 min-h-[300px]'
}
const Products = () => {
	return (
		<section className='py-24 bg-white border-t border-gray-200'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
					<div>
						<Badge
							variant='outline'
							className='mb-4 bg-gray-50 border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1 px-3 flex items-center gap-2 w-max'
						>
							<Box className='size-3.5' />
							Barcha mahsulotlar
						</Badge>
						<h2 className='font-space-grotesk text-3xl md:text-4xl font-bold tracking-tight text-black'>
							Katalog to'plami
						</h2>
						<p className='font-montserrat text-gray-500 mt-3 max-w-md text-sm text-balance'>
							Barcha gadjetlar, kameralar va aqlli qurilmalar ro'yxati.
							O'zingizga kerakli uskunani tanlang.
						</p>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr'>
					{products.map((product, index) => {
						const discountPercent = Math.round(
							((Number(product.oldPrice) - Number(product.price)) /
								Number(product.oldPrice)) *
								100,
						)
						const isFeatured = index === 0

						return (
							<div
								key={product.id}
								className={cn(
									'group relative flex flex-col rounded-3xl bg-white border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-xl hover:shadow-black/5 transition-all duration-300',
									getGridStyles(index),
								)}
							>
								{isFeatured && (
									<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none'></div>
								)}

								<div className='absolute top-0 left-0 w-full p-5 md:p-6 flex justify-between items-start z-20 pointer-events-none'>
									<span className='font-space-grotesk text-xs md:text-sm font-bold tracking-widest text-gray-400 uppercase'>
										{product.brand}
									</span>
									<Badge className='bg-black text-white hover:bg-gray-800 font-montserrat text-xs pointer-events-auto rounded-md px-2 py-0.5'>
										-{discountPercent}%
									</Badge>
								</div>

								<div className='relative flex-1 w-full flex items-center justify-center p-8 mt-8'>
									{isFeatured && (
										<div className='absolute inset-0 bg-gray-100 rounded-full blur-[80px] opacity-0 group-hover:opacity-50 transition-opacity duration-700 w-3/4 h-3/4 m-auto'></div>
									)}
									<Image
										src={product.image}
										alt={product.name}
										fill
										className={cn(
											'object-contain p-8 md:p-12 drop-shadow-lg group-hover:scale-105 transition-transform duration-700 ease-out',
											isFeatured ? 'p-12 md:p-20' : 'p-8',
										)}
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
									/>
								</div>

								<div className='relative z-20 p-5 md:p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-end justify-between mt-auto'>
									<div className='flex flex-col gap-1'>
										<h3
											className={cn(
												'font-space-grotesk font-bold text-gray-900 line-clamp-1',
												isFeatured ? 'text-xl md:text-2xl' : 'text-lg',
											)}
										>
											{product.name}
										</h3>
										<div className='flex items-center gap-2 font-montserrat'>
											<span className='text-gray-400 line-through text-xs md:text-sm'>
												${product.oldPrice}
											</span>
											<span className='text-black font-semibold text-base md:text-lg'>
												${product.price}
											</span>
										</div>
									</div>

									<Button
										size='icon'
										variant='outline'
										className='size-10 shrink-0 rounded-full border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all shadow-sm group-hover:shadow-md'
									>
										<ShoppingCart className='size-4' />
									</Button>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default Products
