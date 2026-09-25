'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, Flame, ShoppingCart, Sparkles } from 'lucide-react'
import Image from 'next/image'

const discountProducts = [
	{
		id: 1,
		brand: 'APPLE',
		name: 'MacBook Pro M3 Max',
		oldPrice: 3499,
		price: 2999,
		image: '/computers.png',
		tag: 'Eng katta chegirma',
	},
	{
		id: 2,
		brand: 'SONY',
		name: 'WF-1000XM5',
		oldPrice: 299,
		price: 249,
		image: '/audio.png',
	},
	{
		id: 3,
		brand: 'DJI',
		name: 'Osmo Mobile 6',
		oldPrice: 159,
		price: 129,
		image: '/stabilizers.png',
	},
	{
		id: 4,
		brand: 'DJI',
		name: 'Mavic 3 Classic',
		oldPrice: 1599,
		price: 1299,
		image: '/drones.png',
		tag: 'Yozgi taklif',
	},
	{
		id: 5,
		brand: 'VOLTIA',
		name: 'PowerCore 65W',
		oldPrice: 65,
		price: 45,
		image: '/powercore.png',
	},
	{
		id: 6,
		brand: 'HYDRON',
		name: 'Smart Bottle',
		oldPrice: 45,
		price: 30,
		image: '/bottle.png',
	},
	{
		id: 7,
		brand: 'NEXA',
		name: 'PocketPower 10K',
		oldPrice: 55,
		price: 39,
		image: '/pocketpower.png',
		tag: 'Yangi',
	},
]

const getBentoGridStyles = (index: number) => {
	switch (index) {
		case 0:
			return 'md:col-span-2 md:row-span-2'
		case 3:
		case 6:
			return 'md:col-span-2 md:row-span-1'
		default:
			return 'col-span-1 row-span-1'
	}
}

export default function DiscountProducts() {
	return (
		<section className='py-20 md:py-24 bg-[#FAFAFA]'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* Sarlavha Qismi */}
				<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
					<div>
						<div className='flex items-center space-x-2 mb-3'>
							<Flame className='w-5 h-5 text-orange-500' />
							<p className='font-montserrat text-sm font-bold tracking-[0.2em] text-orange-500 uppercase'>
								Cheklangan miqdorda
							</p>
						</div>
						<h2 className='font-space-grotesk text-3xl md:text-5xl font-bold tracking-tight text-black'>
							Barcha Chegirmalar
						</h2>
					</div>

					<Button
						variant='outline'
						className='font-montserrat rounded-full px-6 h-12 bg-white hover:bg-gray-50 border-gray-200 text-black font-medium transition-all group'
					>
						Faqat qolganlarini ko'rish
						<ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
					</Button>
				</div>

				{/* MUAMMO HAL QILINDI: auto-rows-[350px] orqali kartalarga erkinroq balandlik berildi */}
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[350px] md:auto-rows-[380px]'>
					{discountProducts.map((product, index) => {
						const discountPercent = Math.round(
							((product.oldPrice - product.price) / product.oldPrice) * 100,
						)
						const isFeatured = index === 0 || index === 3 || index === 6

						return (
							<div
								key={product.id}
								className={cn(
									'group relative flex flex-col rounded-[2rem] bg-white border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500',
									getBentoGridStyles(index),
								)}
							>
								{isFeatured && (
									<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>
								)}

								{/* Yuqori qism: Brend va Tags */}
								<div className='absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-20 pointer-events-none'>
									<div className='flex flex-col items-start gap-2'>
										<span className='font-space-grotesk text-xs md:text-sm font-bold tracking-widest text-gray-400 uppercase bg-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-gray-100'>
											{product.brand}
										</span>
										{product.tag && (
											<Badge className='bg-black text-white font-montserrat text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md'>
												<Sparkles className='w-3 h-3' />
												{product.tag}
											</Badge>
										)}
									</div>
									<Badge className='bg-red-500 text-white hover:bg-red-600 font-space-grotesk text-sm font-bold px-3 py-1 rounded-xl shadow-lg shadow-red-500/20 pointer-events-auto'>
										-{discountPercent}%
									</Badge>
								</div>

								{/* MUAMMO HAL QILINDI: min-h-0 qoshildi, margin-top o'rniga pt-24 ishlatildi */}
								<div
									className={cn(
										'relative flex-1 w-full flex items-center justify-center pt-24 pb-6 z-10 min-h-0',
										isFeatured ? 'px-12 md:px-20' : 'px-8',
									)}
								>
									{isFeatured && (
										<div className='absolute inset-0 bg-gray-100/80 rounded-full blur-[70px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 w-3/4 h-3/4 m-auto'></div>
									)}
									<div className='relative w-full h-full'>
										<Image
											src={product.image}
											alt={product.name}
											fill
											className='object-contain drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out'
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										/>
									</div>
								</div>

								{/* MUAMMO HAL QILINDI: shrink-0 qo'shildi! Endi bu qism pastga tushib ketmaydi va qotib turadi */}
								<div className='relative z-20 p-6 md:p-8 bg-white/90 backdrop-blur-md border-t border-gray-100/60 flex items-end justify-between mt-auto shrink-0 transition-colors group-hover:bg-white'>
									<div className='flex flex-col gap-1.5'>
										<h3
											className={cn(
												'font-space-grotesk font-bold text-gray-900 line-clamp-1 group-hover:text-black transition-colors',
												index === 0
													? 'text-2xl md:text-4xl'
													: 'text-lg md:text-xl',
											)}
										>
											{product.name}
										</h3>
										<div className='flex items-center gap-3 font-montserrat mt-1'>
											<span className='text-gray-400 line-through text-sm md:text-base font-medium'>
												${product.oldPrice}
											</span>
											<span className='text-red-500 font-bold text-xl md:text-2xl'>
												${product.price}
											</span>
										</div>
									</div>

									<Button
										size='icon'
										className={cn(
											'shrink-0 rounded-full border border-gray-200 transition-all duration-300 shadow-sm overflow-hidden group/cartbtn',
											index === 0
												? 'w-14 h-14 bg-black text-white hover:bg-gray-800'
												: 'w-12 h-12 bg-white text-black hover:border-black hover:bg-black hover:text-white',
										)}
									>
										<ShoppingCart
											className={cn(
												'transition-transform duration-300 group-hover/cartbtn:scale-110',
												index === 0 ? 'w-5 h-5' : 'w-4 h-4',
											)}
										/>
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
