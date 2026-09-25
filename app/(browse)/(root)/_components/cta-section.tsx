import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Headphones, Send, ShieldCheck, Sparkles, Truck } from 'lucide-react'

const CtaSection = () => {
	return (
		<section className='py-24 bg-white'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* Asosiy qop-qora CTA karta */}
				<div className='relative rounded-[2rem] bg-black text-white overflow-hidden border border-gray-800 flex flex-col items-center text-center px-6 py-16 md:py-24 z-10'>
					{/* Vercel Glow va Setka effektlari (Dark Theme) */}
					<div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none'></div>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white/20 rounded-[100%] blur-[120px] pointer-events-none'></div>

					<div className='relative z-20 flex flex-col items-center max-w-2xl'>
						<Badge
							variant='outline'
							className='mb-6 bg-white/10 border-white/20 text-gray-200 font-space-grotesk tracking-widest uppercase py-1 px-4 flex items-center gap-2 rounded-full backdrop-blur-md'
						>
							<Sparkles className='size-3' />
							NEXUS Hamjamiyati
						</Badge>

						<h2 className='font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6 text-balance leading-[1.1]'>
							Kelajak texnologiyalariga <br className='hidden md:block' />
							<span className='text-gray-400'>
								birinchilardan bo'lib yeting.
							</span>
						</h2>

						<p className='font-montserrat text-gray-400 text-sm md:text-base mb-10 max-w-xl text-pretty'>
							Yangi dronlar, kameralar va maxsus yopiq chegirmalar haqida
							to'g'ridan-to'g'ri Telegram kanalimiz orqali xabardor bo'ling.
							Bizning jamoaga qo'shiling.
						</p>

						{/* Telegram kanalga o'tkazuvchi tugma */}
						<Button
							asChild
							size='lg'
							className='h-14 px-10 rounded-xl bg-white text-black hover:bg-gray-200 hover:scale-105 font-montserrat font-bold transition-all duration-300 shadow-lg shadow-white/10 text-base'
						>
							<a
								href='https://t.me/samatov_ascends'
								target='_blank'
								rel='noopener noreferrer'
							>
								Telegramda qo'shilish
								<Send className='size-5 ml-3' />
							</a>
						</Button>
					</div>
				</div>

				{/* Ishonch belgilari (Trust Badges) - Karta tagida joylashadi */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto border-t border-gray-200 pt-12'>
					<div className='flex flex-col items-center text-center gap-3'>
						<div className='size-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-black'>
							<Truck className='size-5' />
						</div>
						<h3 className='font-space-grotesk font-bold text-gray-900'>
							Tezkor yetkazish
						</h3>
						<p className='font-montserrat text-sm text-gray-500 max-w-62.5'>
							O'zbekiston bo'ylab barcha viloyatlarga xavfsiz va tezkor yetkazib
							berish xizmati.
						</p>
					</div>

					<div className='flex flex-col items-center text-center gap-3'>
						<div className='size-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-black'>
							<ShieldCheck className='size-5' />
						</div>
						<h3 className='font-space-grotesk font-bold text-gray-900'>
							Rasmiy kafolat
						</h3>
						<p className='font-montserrat text-sm text-gray-500 max-w-62.5'>
							Barcha uskuna va gadjetlar uchun 1 yildan 3 yilgacha rasmiy servis
							kafolati.
						</p>
					</div>

					<div className='flex flex-col items-center text-center gap-3'>
						<div className='size-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-black'>
							<Headphones className='size-5' />
						</div>
						<h3 className='font-space-grotesk font-bold text-gray-900'>
							24/7 Qo'llab-quvvatlash
						</h3>
						<p className='font-montserrat text-sm text-gray-500 max-w-62.5'>
							Mutaxassislarimiz kunning istalgan vaqtida texnik yordam berishga
							tayyor.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CtaSection
