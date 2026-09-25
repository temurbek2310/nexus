import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, Plus, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const gadgets = [
	{
		id: 1,
		brand: 'VOLTIA',
		name: 'Boost 20000',
		price: '49',
		image: '/boost.png',
	},
	{
		id: 2,
		brand: 'NIMO',
		name: 'DeskBot',
		price: '299',
		image: '/deskbot.png',
	},
	{
		id: 3,
		brand: 'AUDI',
		name: 'Air Sense',
		price: '1.299',
		image: '/airsense.png',
	},
	{
		id: 4,
		brand: 'LG',
		name: 'LG Pure Filter',
		price: '999',
		image: '/lg-filter.png',
	},
	{
		id: 5,
		brand: 'NIMO',
		name: 'DeskBot',
		price: '299',
		image: '/deskbot.png',
	},
	{
		id: 6,
		brand: 'AUDI',
		name: 'Air Sense',
		price: '1.299',
		image: '/airsense.png',
	},
	{
		id: 7,
		brand: 'LG',
		name: 'LG Pure Filter',
		price: '999',
		image: '/lg-filter.png',
	},
]

// Mukammal simmetrik Bento Grid uchun joylashuv qoidalari
const getGridStyles = (index: number) => {
	if (index === 0) {
		// 1-mahsulot: Katta karta (2 ta ustun, 2 ta qator)
		return 'md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[400px] lg:min-h-[600px]'
	}
	if (index === 5 || index === 6) {
		// Oxirgi 2 ta mahsulot: Keng karta (2 ta ustun, 1 ta qator)
		return 'md:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[300px]'
	}
	// Qolgan 4 ta mahsulot: Standart kichik karta (1x1)
	return 'col-span-1 row-span-1 min-h-[300px]'
}

const CoolestGadgets = () => {
	return (
		<section className='py-24 bg-white border-b border-gray-200 overflow-hidden'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* Sarlavha qismi */}
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
					<div>
						<Badge
							variant='outline'
							className='mb-4 bg-gray-50 border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1 px-3 flex items-center gap-2 w-max'
						>
							<Sparkles className='size-3' />
							Innovatsion Gadjetlar
						</Badge>
						<h2 className='font-space-grotesk text-3xl md:text-4xl font-bold tracking-tight text-black'>
							Eng zo'r texnologiyalar
						</h2>
						<p className='font-montserrat text-gray-500 mt-3 max-w-md text-sm text-balance'>
							Kundalik hayotingizni osonlashtiruvchi va ilhomlantiruvchi aqlli
							qurilmalar. Kelajak texnologiyasi bugun sizning qo'lingizda.
						</p>
					</div>

					<Button
						asChild
						variant='ghost'
						className='group font-montserrat text-sm font-medium text-black hover:bg-transparent hover:text-gray-600 transition-colors px-0'
					>
						<Link href='/browse?category=gadgets'>
							Barcha gadjetlar
							<ArrowRight className='size-4 ml-2 group-hover:translate-x-1 transition-transform' />
						</Link>
					</Button>
				</div>

				{/* 4-ustunli Simmetrik Bento Box */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr'>
					{gadgets.map((gadget, index) => {
						const isHero = index === 0
						const isWide = index === 5 || index === 6

						return (
							<div
								key={gadget.id}
								className={cn(
									'group relative flex flex-col rounded-3xl bg-gray-50/50 hover:bg-gray-50 border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors duration-300',
									getGridStyles(index),
								)}
							>
								{/* 1-karta uchun Vercel Engineering Grid effekti */}
								{isHero && (
									<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none'></div>
								)}

								{/* Matn va Narx qismi (Z-20 ustda turadi) */}
								<div
									className={cn(
										'absolute z-20 flex flex-col pointer-events-none',
										// Keng kartalar (isWide) uchun ma'lumotlar o'ng tomonda markazlashadi, boshqalarda tepada
										isWide
											? 'top-0 right-0 h-full w-1/2 p-6 md:p-8 justify-center items-start'
											: 'top-0 left-0 w-full p-6 md:p-8',
									)}
								>
									<span className='font-space-grotesk text-[10px] md:text-xs font-bold tracking-widest text-gray-400 uppercase mb-1'>
										{gadget.brand}
									</span>
									<h3
										className={cn(
											'font-space-grotesk font-bold text-gray-900 leading-tight mb-2 text-balance',
											isHero ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl',
										)}
									>
										{gadget.name}
									</h3>
									<span className='font-montserrat font-medium text-black bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1 rounded-full w-max text-sm'>
										${gadget.price}
									</span>
								</div>

								{/* Rasm qismi */}
								<div
									className={cn(
										'relative flex-1 w-full flex items-center justify-center p-8 z-10 pointer-events-none',
										isWide ? 'w-1/2 mr-auto' : 'mt-20', // Keng kartalarda rasm chapda bo'ladi
									)}
								>
									<Image
										src={gadget.image}
										alt={gadget.name}
										fill
										className={cn(
											'object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700 ease-out',
											isHero ? 'p-12 md:p-24' : 'p-6 md:p-10',
										)}
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
									/>
								</div>

								{/* Savatga qo'shish tugmasi (Hover bo'lganda ko'rinadi) */}
								<div className='absolute bottom-6 right-6 z-30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
									<Button
										size='icon'
										className='size-12 rounded-full bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/10'
									>
										<Plus className='size-5' />
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

export default CoolestGadgets
