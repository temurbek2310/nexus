'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight, Tag, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

const discountCampaigns = [
	{
		id: 1,
		title: 'Yozgi Mega Chegirma',
		description:
			'Barcha professional dronlar uchun eng katta narx pasayishi. Faqat shu hafta.',
		discount: '40%',
		category: 'Drones',
		image: '/drones.png',
		color: 'from-orange-500 to-red-500',
		link: '/shop?filter=sale',
	},
	{
		id: 2,
		title: 'Audio Fest 2026',
		description:
			'Premium quloqchinlar va audio tizimlarda qaytarilmas takliflar.',
		discount: '30%',
		category: 'Audio',
		image: '/audio.png',
		color: 'from-blue-500 to-cyan-500',
		link: '/shop?filter=sale',
	},
	{
		id: 3,
		title: 'Kreativlikni barqarorlang',
		description:
			"Kino ijodkorlari uchun eng ilg'or stabilizatorlar yarim narxda.",
		discount: '50%',
		category: 'Stabilizers',
		image: '/stabilizers.png',
		color: 'from-emerald-500 to-green-500',
		link: '/shop?filter=sale',
	},
]

// 1. Taymer mantiqi tashqariga olib chiqildi (ESLint xatosini yo'qotadi)
const calculateTimeLeft = () => {
	const now = new Date()
	const tomorrow = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 1,
	)
	const diff = tomorrow.getTime() - now.getTime()

	return {
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / 1000 / 60) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	}
}

export default function Hero() {
	const [api, setApi] = React.useState<CarouselApi>()
	const [current, setCurrent] = React.useState(0)

	// Taymer va Hydration uchun State
	const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft)
	const [isMounted, setIsMounted] = React.useState(false)

	const [plugin] = React.useState(() =>
		Autoplay({ delay: 5000, stopOnInteraction: true }),
	)

	React.useEffect(() => {
		if (!api) return
		const onSelect = () => {
			setCurrent(api.selectedScrollSnap())
		}

		api.on('select', onSelect)
		return () => {
			api.off('select', onSelect)
		}
	}, [api])

	// 2. Toza Effect (Faqat interval ishlaydi, darhol setState chaqirilmaydi)
	React.useEffect(() => {
		setIsMounted(true)
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	const formatTime = (num: number) => num.toString().padStart(2, '0')

	return (
		<section className='pt-12 pb-16 border-b border-border overflow-hidden relative'>
			<div className='w-[96%] lg:w-[98%] max-w-[1920px] mx-auto relative z-10'>
				{/* Sarlavha qismi */}
				<div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 px-4 md:px-8'>
					<div>
						<div className='flex items-center space-x-2 mb-4'>
							<Tag className='w-5 h-5 text-red-500' />
							<p className='font-montserrat text-sm font-bold tracking-[0.2em] text-red-500 uppercase'>
								Qaynoq Takliflar
							</p>
						</div>
						<h1 className='font-space-grotesk text-5xl md:text-7xl font-black tracking-tighter text-black leading-none'>
							Maxsus <br />
							<span className='text-gray-300'>Chegirmalar.</span>
						</h1>
					</div>

					<div className='flex items-center space-x-4 bg-slate-50 border border-gray-200 rounded-full px-6 py-3'>
						<Timer className='w-5 h-5 text-black animate-pulse' />
						<div className='flex flex-col'>
							<span className='font-montserrat text-[10px] font-bold tracking-widest text-gray-400 uppercase'>
								Aksiya tugashiga
							</span>
							<span className='font-space-grotesk text-lg font-bold text-black tabular-nums'>
								{isMounted
									? `${formatTime(timeLeft.hours)} : ${formatTime(timeLeft.minutes)} : ${formatTime(timeLeft.seconds)}`
									: '00 : 00 : 00'}
							</span>
						</div>
					</div>
				</div>

				{/* Vercel Carousel */}
				<Carousel
					setApi={setApi}
					opts={{ align: 'start', loop: true }}
					plugins={[plugin]}
					className='w-full relative'
					onMouseEnter={() => plugin.stop()}
					onMouseLeave={() => plugin.reset()}
				>
					<CarouselContent>
						{discountCampaigns.map((campaign, index) => (
							<CarouselItem key={campaign.id} className='w-full'>
								{/* 3. Tailwind v4 classlariga moslandi (h-112.5, md:h-125) */}
								<div className='group relative w-full h-112.5 md:h-125 bg-[#050505] rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-16'>
									<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none w-full text-center'>
										<span
											className='font-space-grotesk text-[120px] md:text-[250px] font-black text-transparent opacity-10 group-hover:scale-110 transition-transform duration-1000 ease-out'
											style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}
										>
											{campaign.discount}
										</span>
									</div>

									<div className='relative z-20 flex flex-col items-start w-full md:w-1/2 mb-10 md:mb-0'>
										{/* bg-linear-to-r qilib o'zgartirildi */}
										<Badge
											className={`font-montserrat text-xs font-bold uppercase tracking-wider mb-6 bg-linear-to-r ${campaign.color} text-white border-none px-4 py-1.5`}
										>
											{campaign.discount} CHEGIRMA
										</Badge>

										<h2 className='font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4'>
											{campaign.title}
										</h2>

										<p className='font-montserrat text-gray-400 text-sm md:text-base font-medium max-w-md leading-relaxed mb-8'>
											{campaign.description}
										</p>

										<Button
											asChild
											className='font-montserrat rounded-full h-12 px-8 bg-white text-black hover:bg-gray-200 transition-all font-semibold group/btn'
										>
											<Link href={campaign.link}>
												Xaridni boshlash
												<ArrowRight className='ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform' />
											</Link>
										</Button>
									</div>

									<div className='relative z-10 w-full md:w-1/2 h-48 md:h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3'>
										{/* bg-linear-to-tr qilib o'zgartirildi */}
										<div
											className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-linear-to-tr ${campaign.color} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full`}
										></div>
										{/* max-w-100 qilib o'zgartirildi */}
										<div className='relative w-full h-[120%] max-w-100'>
											<Image
												src={campaign.image}
												alt={campaign.title}
												fill
												priority={index === 0}
												className='object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
												sizes='(max-width: 768px) 100vw, 50vw'
											/>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					<div className='flex items-center justify-center space-x-2 mt-8'>
						{discountCampaigns.map((_, index) => (
							<button
								key={index}
								onClick={() => api?.scrollTo(index)}
								className={`h-1 rounded-full transition-all duration-300 ${
									current === index
										? 'w-8 bg-black'
										: 'w-2 bg-gray-200 hover:bg-gray-300'
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</Carousel>
			</div>
		</section>
	)
}
