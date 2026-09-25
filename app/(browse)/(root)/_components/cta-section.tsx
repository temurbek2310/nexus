import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Headphones, Send, ShieldCheck, Sparkles, Truck } from 'lucide-react'

const CtaSection = () => {
	return (
		<section className='py-24 bg-white'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* Asosiy qop-qora CTA karta */}
				<div className='relative rounded-[2rem] bg-[#0a0a0a] text-white overflow-hidden border border-white/10 flex flex-col items-center text-center px-6 py-16 md:py-24 z-10 shadow-2xl'>
					{/* Vercel Glow va Setka effektlari */}
					<div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none'></div>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/10 rounded-[100%] blur-[120px] pointer-events-none'></div>

					<div className='relative z-20 flex flex-col items-center max-w-2xl'>
						<Badge
							variant='outline'
							className='mb-6 bg-white/5 border-white/10 text-gray-300 font-space-grotesk tracking-widest uppercase py-1.5 px-4 flex items-center gap-2 rounded-full backdrop-blur-md'
						>
							<Sparkles className='size-3 text-white' />
							NEXUS Hamjamiyati
						</Badge>

						<h2 className='font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6 text-balance leading-[1.1]'>
							Kelajak texnologiyalariga <br className='hidden md:block' />
							<span className='text-white/40'>
								birinchilardan bo'lib yeting.
							</span>
						</h2>

						<p className='font-montserrat text-gray-400 text-sm md:text-base mb-12 max-w-xl text-pretty'>
							Yangi dronlar, kameralar va maxsus yopiq chegirmalar haqida
							to'g'ridan-to'g'ri Telegram kanalimiz orqali xabardor bo'ling.
							Bizning jamoaga qo'shiling.
						</p>

						{/* VERCEL CREATIVE BUTTON */}
						<div className='relative group'>
							{/* Tugma orqasidagi porlovchi effekt (Glow) */}
							<div className='absolute -inset-1 bg-gradient-to-r from-white/40 via-white/10 to-white/40 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none'></div>

							<Button
								asChild
								size='lg'
								className='relative h-14 px-8 rounded-2xl bg-black border border-white/20 hover:border-white/50 hover:bg-[#111111] text-white font-montserrat font-medium transition-all duration-300 overflow-hidden'
							>
								<a
									href='https://t.me/samatov_ascends'
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center gap-3'
								>
									{/* Tugma ustidan o'tadigan yaltiroq chiziq effekti */}
									<div className='absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none skew-x-[-20deg]'></div>

									<span>Telegramda qo'shilish</span>

									{/* Ikonkaning kreativ harakati */}
									<div className='relative flex items-center justify-center w-6 h-6 overflow-hidden'>
										<Send className='absolute size-5 transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6' />
										<Send className='absolute size-5 -translate-x-6 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0' />
									</div>
								</a>
							</Button>
						</div>
					</div>
				</div>

				{/* Ishonch belgilari (Trust Badges) - Karta tagida joylashadi */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto border-t border-gray-200 pt-12'>
					<div className='flex flex-col items-center text-center gap-3'>
						<div className='size-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300'>
							<Truck className='size-5' />
						</div>
						<h3 className='font-space-grotesk font-bold text-gray-900'>
							Tezkor yetkazish
						</h3>
						<p className='font-montserrat text-sm text-gray-500 max-w-[250px]'>
							O'zbekiston bo'ylab barcha viloyatlarga xavfsiz va tezkor yetkazib
							berish xizmati.
						</p>
					</div>

					<div className='flex flex-col items-center text-center gap-3'>
						<div className='size-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300'>
							<ShieldCheck className='size-5' />
						</div>
						<h3 className='font-space-grotesk font-bold text-gray-900'>
							Rasmiy kafolat
						</h3>
						<p className='font-montserrat text-sm text-gray-500 max-w-[250px]'>
							Barcha uskuna va gadjetlar uchun 1 yildan 3 yilgacha rasmiy servis
							kafolati.
						</p>
					</div>

					<div className='flex flex-col items-center text-center gap-3'>
						<div className='size-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300'>
							<Headphones className='size-5' />
						</div>
						<h3 className='font-space-grotesk font-bold text-gray-900'>
							24/7 Qo'llab-quvvatlash
						</h3>
						<p className='font-montserrat text-sm text-gray-500 max-w-[250px]'>
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
