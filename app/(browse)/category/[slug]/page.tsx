import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, Box, ShoppingCart, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Odatda bu ma'lumotlar backend'dan yoki URL parametridan keladi
const categoryInfo = {
	name: 'Smart Dronlar',
	slug: 'drones',
	description:
		"Professional suratga olish, video va kashfiyotlar uchun eng ilg'or uchuvchisiz qurilmalar. Havodan turib dunyoni yangi rakursda ko'ring.",
}

const categoryProducts = [
	{
		id: 1,
		brand: 'DJI',
		name: 'Mavic 3 Pro',
		oldPrice: '2199',
		price: '1999',
		image: '/powercore.png',
	}, // Rasm manzillarini o'zingiznikiga almashtirasiz
	{
		id: 2,
		brand: 'AUTEL',
		name: 'Evo Lite+',
		oldPrice: '1549',
		price: '1299',
		image: '/bottle.png',
	},
	{
		id: 3,
		brand: 'DJI',
		name: 'Mini 4 Pro',
		oldPrice: '959',
		price: '859',
		image: '/pocketpower.png',
	},
	{
		id: 4,
		brand: 'HOVER',
		name: 'Air X1 Smart',
		oldPrice: '429',
		price: '349',
		image: '/doorbell.png',
	},
	{
		id: 5,
		brand: 'BETA',
		name: 'Cetus FPV Kit',
		oldPrice: '299',
		price: '249',
		image: '/bottle.png',
	},
	{
		id: 6,
		brand: 'DJI',
		name: 'Air 3 Combo',
		oldPrice: '1549',
		price: '1349',
		image: '/pocketpower.png',
	},
	{
		id: 7,
		brand: 'FIMI',
		name: 'X8 Mini V2',
		oldPrice: '399',
		price: '299',
		image: '/doorbell.png',
	},
]

// Grid o'lchamlarini indeksga qarab belgilaydigan yordamchi funksiya (Siz yozgan logika)
const getGridStyles = (index: number) => {
	if (index === 0) {
		// 1-mahsulot: Katta karta (2 ustun, 2 qator)
		return 'lg:col-span-2 lg:row-span-2 min-h-[400px] lg:min-h-[550px]'
	}
	if (index === 5 || index === 6) {
		// 6 va 7-mahsulotlar: Keng karta (2 ustun, 1 qator)
		return 'sm:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[300px]'
	}
	// Qolgan mahsulotlar: Standart kichik karta (1 ustun, 1 qator)
	return 'col-span-1 row-span-1 min-h-[300px]'
}

const CategoryPage = () => {
	return (
		<div className='min-h-screen bg-white'>
			{/* ================= HERO KOMPONENTI ================= */}
			<section className='relative w-full pt-32 pb-20 border-b border-gray-200 overflow-hidden bg-gray-50/30'>
				{/* Vercel Grid Orqa fon effekti */}
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>
				{/* Yorug'lik (Glow) effekti */}
				<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/50 rounded-[100%] blur-[100px] pointer-events-none'></div>

				<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10 flex flex-col items-center text-center'>
					<Button
						asChild
						variant='ghost'
						size='sm'
						className='mb-8 font-montserrat text-gray-500 hover:text-black rounded-full border border-gray-200 bg-white shadow-sm'
					>
						<Link href='/catalog'>
							<ArrowLeft className='size-4 mr-2' />
							Katalogga qaytish
						</Link>
					</Button>

					<Badge
						variant='outline'
						className='mb-6 bg-white border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1.5 px-4 flex items-center gap-2 shadow-sm'
					>
						<Box className='size-3.5 text-gray-400' />
						{categoryInfo.slug}
					</Badge>

					<h1 className='font-space-grotesk text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black mb-6'>
						{categoryInfo.name}
					</h1>

					<p className='font-montserrat text-gray-500 text-base md:text-lg text-balance max-w-2xl leading-relaxed'>
						{categoryInfo.description}
					</p>
				</div>
			</section>

			{/* ================= PRODUCTS KOMPONENTI ================= */}
			<section className='py-20 md:py-24 bg-white'>
				<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
					{/* Products Sarlavhasi */}
					<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
						<div>
							<h2 className='font-space-grotesk text-3xl md:text-4xl font-bold tracking-tight text-black flex items-center gap-3'>
								Barcha mahsulotlar
								<Sparkles className='size-6 text-gray-300 hidden md:block' />
							</h2>
							<p className='font-montserrat text-gray-500 mt-3 max-w-md text-sm text-balance'>
								{categoryInfo.name} bo'yicha eng so'nggi va premium darajadagi
								qurilmalarni ko'rib chiqing.
							</p>
						</div>

						<div className='font-montserrat text-sm font-medium text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100'>
							Jami: {categoryProducts.length} ta mahsulot
						</div>
					</div>

					{/* 4-ustunli Kreativ Grid (Bento Box - Sizning logikangiz bilan) */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr'>
						{categoryProducts.map((product, index) => {
							// Chegirma foizini hisoblash
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
										'group relative flex flex-col rounded-[2rem] bg-white border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-xl hover:shadow-black/5 transition-all duration-500',
										getGridStyles(index),
									)}
								>
									{/* Agar 1-karta bo'lsa, orqa fonga nozik grid pattern qo'shamiz */}
									{isFeatured && (
										<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>
									)}

									{/* Yuqori qism: Brend va Chegirma Badge */}
									<div className='absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-20 pointer-events-none'>
										<span className='font-space-grotesk text-xs md:text-sm font-bold tracking-widest text-gray-400 uppercase'>
											{product.brand}
										</span>
										{discountPercent > 0 && (
											<Badge className='bg-black text-white hover:bg-gray-800 font-montserrat text-xs pointer-events-auto rounded-md px-2.5 py-1 shadow-md'>
												-{discountPercent}%
											</Badge>
										)}
									</div>

									{/* Rasm qismi */}
									<div className='relative flex-1 w-full flex items-center justify-center p-8 mt-12'>
										{isFeatured && (
											<div className='absolute inset-0 bg-gray-100 rounded-full blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 w-3/4 h-3/4 m-auto'></div>
										)}
										<Image
											src={product.image}
											alt={product.name}
											fill
											className={cn(
												'object-contain drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 ease-out',
												isFeatured ? 'p-16 md:p-24' : 'p-10',
											)}
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
										/>
									</div>

									{/* Pastki ma'lumotlar va Tugma qismi (Glassmorphism) */}
									<div className='relative z-20 p-6 md:p-8 bg-white/90 backdrop-blur-md border-t border-gray-100/50 flex items-end justify-between mt-auto transition-colors group-hover:bg-white'>
										<div className='flex flex-col gap-1.5'>
											<h3
												className={cn(
													'font-space-grotesk font-bold text-gray-900 line-clamp-1',
													isFeatured ? 'text-2xl md:text-3xl' : 'text-xl',
												)}
											>
												{product.name}
											</h3>
											<div className='flex items-center gap-3 font-montserrat'>
												<span className='text-gray-400 line-through text-sm'>
													${product.oldPrice}
												</span>
												<span className='text-black font-bold text-lg md:text-xl'>
													${product.price}
												</span>
											</div>
										</div>

										{/* Cart Tugmasi */}
										<Button
											size='icon'
											variant='outline'
											className={cn(
												'shrink-0 rounded-full border-gray-200 transition-all duration-500 shadow-sm overflow-hidden',
												isFeatured
													? 'size-14 bg-black text-white hover:bg-gray-800'
													: 'size-12 hover:border-black hover:bg-black hover:text-white',
											)}
										>
											<ShoppingCart
												className={cn(
													'transition-transform duration-300 group-hover:scale-110',
													isFeatured ? 'size-5' : 'size-4',
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
		</div>
	)
}

export default CategoryPage
