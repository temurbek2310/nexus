import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Aperture, ArrowRight, Focus, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
	return (
		<section className='relative bg-white pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden border-b border-gray-200'>
			{/* 1. KREATIV FON: Muhandislik setkasi (Grid Pattern) va Vercel Glow effekti */}
			<div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px]'></div>
			<div className='absolute top-0 right-0 -mr-20 -mt-20 w-150 h-150 bg-gray-50 rounded-full blur-[100px] opacity-60 pointer-events-none'></div>

			<div className='relative max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				<div className='flex flex-col lg:flex-row items-center justify-between gap-16'>
					{/* Chap qism: Typografiya va Asosiy ma'lumot */}
					<div className='w-full lg:w-[55%] flex flex-col justify-center text-left z-10'>
						{/* Shadcn Badge + Lucide Icon: Kamera "REC" statusiga o'xshash indikator */}
						<Badge
							variant='outline'
							className='w-max font-space-grotesk tracking-widest uppercase mb-8 py-1.5 px-3 bg-white/50 backdrop-blur-sm border-gray-200 text-black flex items-center gap-2 rounded-full'
						>
							<span className='relative flex h-2 w-2'>
								<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40'></span>
								<span className='relative inline-flex rounded-full h-2 w-2 bg-black'></span>
							</span>
							Next-Gen Uskunalar • 2026
						</Badge>

						{/* Kreativ, massiv sarlavha */}
						<h1 className='font-space-grotesk text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter text-black leading-[0.95]'>
							Vizual <br />
							<span className='text-gray-300'>inqilobni</span> <br />
							boshqaring.
						</h1>

						<p className='font-montserrat text-lg text-gray-500 mt-8 max-w-lg border-l-2 border-black pl-4'>
							Kino darajasidagi tasvir, barqarorlik va parvoz. Eng so'nggi
							datchiklar bilan jihozlangan kameralar va dronlar kolleksiyasi.
						</p>

						{/* Shadcn UI Buttons qatori */}
						<div className='flex items-center gap-4 mt-10 font-montserrat'>
							<Button
								asChild
								size='lg'
								className='h-12 px-8 rounded-md bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-black/10 transition-all duration-300 text-sm font-medium'
							>
								<Link href='/catalog'>
									Katalogni ochish
									<ArrowRight className='w-4 h-4 ml-2' />
								</Link>
							</Button>

							<Button
								asChild
								variant='outline'
								size='lg'
								className='h-12 px-8 rounded-md border-gray-300 hover:border-black text-black transition-colors text-sm font-medium'
							>
								<Link href='/collections'>Texnik xususiyatlar</Link>
							</Button>
						</div>
					</div>

					{/* O'ng qism: Rasm va Kreativ "Viewfinder" UI */}
					<div className='w-full lg:w-[45%] relative mt-10 lg:mt-0'>
						<div className='relative aspect-square md:aspect-4/3 lg:aspect-square flex items-center justify-center p-8'>
							{/* Kamera fokusi (Viewfinder) burchaklari */}
							<div className='absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black'></div>
							<div className='absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black'></div>
							<div className='absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black'></div>
							<div className='absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black'></div>

							{/* Markaziy nishon (Lucide Focus Icon yordamida) */}
							<div className='absolute inset-0 flex items-center justify-center pointer-events-none opacity-20'>
								<Focus className='w-16 h-16 text-black' strokeWidth={1} />
							</div>

							{/* Floating Spec Badge 1 (Lucide Video Icon bilan) */}
							<div className='absolute top-12 -right-4 lg:-right-12 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-3 rounded-lg shadow-sm font-space-grotesk text-xs font-bold text-black flex items-center gap-3 animate-[bounce_4s_infinite]'>
								<div className='bg-gray-100 p-2 rounded-md'>
									<Video className='w-4 h-4 text-black' />
								</div>
								<div className='flex flex-col'>
									<span className='text-gray-400 font-montserrat text-[10px] font-normal uppercase leading-tight'>
										Resolution
									</span>
									<span>8K / 120FPS</span>
								</div>
							</div>

							{/* Floating Spec Badge 2 (Lucide Aperture Icon bilan) */}
							<div className='absolute bottom-16 -left-4 lg:-left-8 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-3 rounded-lg shadow-sm font-space-grotesk text-xs font-bold text-black flex items-center gap-3 animate-[bounce_5s_infinite_reverse]'>
								<div className='bg-gray-100 p-2 rounded-md'>
									<Aperture className='w-4 h-4 text-black' />
								</div>
								<div className='flex flex-col'>
									<span className='text-gray-400 font-montserrat text-[10px] font-normal uppercase leading-tight'>
										Stabilization
									</span>
									<span>3-Axis Gimbal</span>
								</div>
							</div>

							{/* Asosiy Rasm */}
							<Image
								src='/hero.png' // Public papkangizdagi rasm
								alt='Professional kamera va dron'
								fill
								priority
								className='object-contain drop-shadow-xl z-10 hover:scale-105 transition-transform duration-[1.5s] ease-out p-4'
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
