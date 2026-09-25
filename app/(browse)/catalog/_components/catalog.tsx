import { Badge } from '@/components/ui/badge'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// 1. Kategoriyalar datasi (Hero Karusel uchun)
const categories = [
	{
		id: 1,
		num: '01',
		title: 'Drones',
		description:
			'Smart Aerial Devices For Photography, Video, And Exploration.',
		image: '/drones.png',
		theme: 'dark',
	},
	{
		id: 2,
		num: '02',
		title: 'Audio',
		description: 'Headphones And Sound Gear Designed For Clarity.',
		image: '/audio.png',
		theme: 'light',
	},
	{
		id: 3,
		num: '03',
		title: 'Stabilizers',
		description: 'Gimbals That Deliver Smooth, Cinematic Motion.',
		image: '/stabilizers.png',
		theme: 'dark',
	},
	{
		id: 4,
		num: '04',
		title: 'Computers',
		description:
			'Powerful Laptops Built For Performance, Creativity, And Daily Work.',
		image: '/computers.png',
		theme: 'light',
	},
]
const Catalog = () => {
	return (
		<section className='relative pt-32 pb-24 overflow-hidden'>
			{/* Ambient yorug'lik effekti */}
			<div className='absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gray-200/50 rounded-full blur-[120px] pointer-events-none'></div>

			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				<Carousel opts={{ align: 'start', dragFree: true }} className='w-full'>
					<div className='flex flex-col xl:flex-row gap-12 lg:gap-20'>
						{/* CHAP TOMON: Qotib turuvchi (Sticky) Sarlavha */}
						<div className='xl:w-1/3 xl:sticky xl:top-40 h-fit z-20 flex flex-col justify-between'>
							<div>
								<Badge
									variant='outline'
									className='mb-6 bg-white border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1.5 px-4 flex items-center gap-2 w-max shadow-sm'
								>
									<Sparkles className='size-3' />
									NEXUS Katalog
								</Badge>

								<h1 className='font-space-grotesk text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[1.05] mb-6'>
									Chegarasiz <br className='hidden md:block' />
									<span className='text-gray-400'>imkoniyatlar.</span>
								</h1>

								<p className='font-montserrat text-gray-500 text-base md:text-lg text-balance max-w-md'>
									Texnologiya va san'at uyg'unligi. O'zingizga kerakli bo'limni
									kashf eting va xaridlarni boshlang.
								</p>
							</div>

							<div className='hidden xl:flex items-center gap-4 mt-16'>
								<CarouselPrevious className='static translate-y-0 translate-x-0 size-14 border border-gray-200 bg-white hover:bg-black hover:text-white transition-all shadow-sm' />
								<CarouselNext className='static translate-y-0 translate-x-0 size-14 border border-gray-200 bg-white hover:bg-black hover:text-white transition-all shadow-sm' />
								<span className='ml-4 font-space-grotesk text-sm font-bold tracking-widest uppercase text-gray-400'>
									Surish
								</span>
							</div>
						</div>

						{/* O'NG TOMON: Karusel */}
						<div className='xl:w-2/3 w-full relative z-10'>
							<CarouselContent className='-ml-4 md:-ml-8'>
								{categories.map(category => {
									const isDark = category.theme === 'dark'

									return (
										<CarouselItem
											key={category.id}
											className='pl-4 md:pl-8 basis-[85%] sm:basis-[60%] md:basis-[50%] lg:basis-[45%]'
										>
											<div
												className={cn(
													'group relative h-[480px] md:h-[600px] w-full rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col cursor-grab active:cursor-grabbing border',
													isDark
														? 'bg-[#0a0a0a] border-gray-800 hover:border-gray-600 shadow-2xl'
														: 'bg-white border-gray-200 hover:border-gray-300 shadow-xl shadow-black/5',
												)}
											>
												{isDark && (
													<div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none'></div>
												)}

												<div className='relative z-20 p-8 flex justify-between items-start pointer-events-none'>
													<h3
														className={cn(
															'font-space-grotesk text-3xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2',
															isDark ? 'text-white' : 'text-black',
														)}
													>
														{category.title}
													</h3>
													<span
														className={cn(
															'font-space-grotesk text-sm font-bold tracking-widest',
															isDark ? 'text-gray-600' : 'text-gray-400',
														)}
													>
														{category.num}
													</span>
												</div>

												<div className='absolute inset-0 flex items-center justify-center p-8 z-10 pointer-events-none mt-12'>
													<div className='relative w-full h-[60%]'>
														<div
															className={cn(
																'absolute inset-0 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700',
																isDark ? 'bg-white/20' : 'bg-black/10',
															)}
														></div>
														<Image
															src={category.image}
															alt={category.title}
															fill
															className='object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-[1s] ease-out'
															sizes='(max-width: 768px) 100vw, 50vw'
														/>
													</div>
												</div>

												<div className='relative z-20 mt-auto p-8 flex items-end justify-between border-t border-transparent transition-colors duration-500 bg-gradient-to-t from-black/60 to-transparent'>
													<div
														className={cn(
															'absolute inset-0 transition-opacity duration-500',
															isDark
																? 'bg-gradient-to-t from-black via-black/80 to-transparent'
																: 'bg-gradient-to-t from-white via-white/90 to-transparent opacity-0 group-hover:opacity-100',
														)}
													></div>
													<p
														className={cn(
															'relative font-montserrat text-sm max-w-[200px] leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500',
															isDark ? 'text-gray-400' : 'text-gray-500',
														)}
													>
														{category.description}
													</p>
													<Link
														href={`/category/${category.title.toLowerCase()}`}
														className={cn(
															'relative size-12 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 z-30 group/btn',
															isDark
																? 'bg-white text-black hover:scale-110'
																: 'bg-black text-white hover:scale-110',
														)}
													>
														<ArrowRight className='size-5 transition-transform duration-300 group-hover/btn:translate-x-1' />
													</Link>
												</div>
											</div>
										</CarouselItem>
									)
								})}
							</CarouselContent>
						</div>
					</div>
				</Carousel>
			</div>
		</section>
	)
}

export default Catalog
