import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	ArrowRight,
	CheckCircle2,
	Clock,
	MapPin,
	Package,
	Truck,
} from 'lucide-react'
import Link from 'next/link'

const ShippingPage = () => {
	return (
		<div className='min-h-screen bg-white pt-24 pb-24'>
			{/* Hero Qismi */}
			<section className='relative px-6 sm:px-12 lg:px-24 py-16 md:py-24 border-b border-gray-200 bg-gray-50/50 overflow-hidden'>
				{/* Vercel Grid Pattern */}
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>

				<div className='relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center'>
					<Badge
						variant='outline'
						className='mb-6 bg-white border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1 px-4 flex items-center gap-2'
					>
						<Truck className='size-3.5' />
						Yetkazib berish
					</Badge>
					<h1 className='font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black mb-6 leading-[1.1]'>
						Xavfsiz, tezkor va <br className='hidden md:block' />
						<span className='text-gray-400'>ishonchli logistika.</span>
					</h1>
					<p className='font-montserrat text-gray-500 text-base md:text-lg text-balance max-w-2xl'>
						Sizning qimmatbaho uskunalaringiz O'zbekistonning istalgan nuqtasiga
						maksimal darajada xavfsiz qadoqlangan holda, o'z vaqtida yetkazib
						beriladi.
					</p>
				</div>
			</section>

			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 mt-20'>
				{/* 1-bo'lim: Yetkazib berish turlari (Bento Grid) */}
				<div className='mb-24'>
					<h2 className='font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center md:text-left'>
						Yetkazib berish usullari
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{/* Standart */}
						<div className='group rounded-3xl bg-white border border-gray-200 p-8 hover:border-gray-300 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col'>
							<div className='size-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform duration-300'>
								<Truck className='size-5' />
							</div>
							<h3 className='font-space-grotesk text-xl font-bold text-black mb-2'>
								Standart yetkazish
							</h3>
							<p className='font-montserrat text-gray-500 text-sm mb-6 flex-grow'>
								O'zbekistonning barcha viloyat va tumanlariga pochta xizmati
								orqali standart yetkazib berish.
							</p>
							<div className='pt-6 border-t border-gray-100 flex items-center justify-between font-montserrat text-sm'>
								<span className='text-gray-400'>Muddat:</span>
								<span className='font-semibold text-black'>2-4 ish kuni</span>
							</div>
							<div className='pt-2 flex items-center justify-between font-montserrat text-sm'>
								<span className='text-gray-400'>Narx:</span>
								<span className='font-semibold text-black'>35,000 UZS</span>
							</div>
						</div>

						{/* Express */}
						<div className='group relative rounded-3xl bg-black border border-gray-800 p-8 hover:border-gray-700 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 flex flex-col overflow-hidden text-white'>
							{/* Premium Glow */}
							<div className='absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none'></div>

							<div className='size-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300'>
								<Clock className='size-5' />
							</div>
							<h3 className='font-space-grotesk text-xl font-bold text-white mb-2'>
								Toshkent Express
							</h3>
							<p className='font-montserrat text-gray-400 text-sm mb-6 flex-grow'>
								Toshkent shahri ichida buyurtmani rasmiylashtirgandan so'ng bir
								necha soat ichida eshikkacha yetkazish.
							</p>
							<div className='pt-6 border-t border-white/10 flex items-center justify-between font-montserrat text-sm'>
								<span className='text-gray-500'>Muddat:</span>
								<span className='font-semibold text-white'>
									3-4 soat ichida
								</span>
							</div>
							<div className='pt-2 flex items-center justify-between font-montserrat text-sm'>
								<span className='text-gray-500'>Narx:</span>
								<span className='font-semibold text-white'>50,000 UZS</span>
							</div>
						</div>

						{/* Olib ketish */}
						<div className='group rounded-3xl bg-white border border-gray-200 p-8 hover:border-gray-300 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col'>
							<div className='size-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform duration-300'>
								<MapPin className='size-5' />
							</div>
							<h3 className='font-space-grotesk text-xl font-bold text-black mb-2'>
								Do'kondan olib ketish
							</h3>
							<p className='font-montserrat text-gray-500 text-sm mb-6 flex-grow'>
								Toshkent shahridagi NEXUS rasmiy do'koniga kelib, uskunani
								tekshirib ko'rib olib ketish imkoniyati.
							</p>
							<div className='pt-6 border-t border-gray-100 flex items-center justify-between font-montserrat text-sm'>
								<span className='text-gray-400'>Muddat:</span>
								<span className='font-semibold text-black'>
									O'sha kunning o'zida
								</span>
							</div>
							<div className='pt-2 flex items-center justify-between font-montserrat text-sm'>
								<span className='text-gray-400'>Narx:</span>
								<span className='font-semibold text-black'>Bepul</span>
							</div>
						</div>
					</div>
				</div>

				{/* 2-bo'lim: Xavfsizlik va Qadoqlash */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24'>
					<div className='order-2 lg:order-1 relative rounded-3xl bg-gray-50 border border-gray-200 p-8 md:p-12 min-h-[400px] flex items-center justify-center overflow-hidden'>
						{/* Dekorativ elementlar (Engineering Vibe) */}
						<div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]'></div>
						<div className='relative z-10 size-48 md:size-64 rounded-full border border-gray-300/50 flex items-center justify-center'>
							<div className='size-32 md:size-48 rounded-full border border-gray-300/80 flex items-center justify-center bg-white shadow-xl'>
								<Package
									className='size-12 md:size-16 text-black'
									strokeWidth={1.5}
								/>
							</div>
						</div>
						{/* O'lcham belgilari (Muhandislik) */}
						<div className='absolute top-1/2 left-8 -translate-y-1/2 text-xs font-space-grotesk text-gray-400 rotate-90 tracking-widest uppercase'>
							Safe Box V2.0
						</div>
					</div>

					<div className='order-1 lg:order-2 flex flex-col justify-center'>
						<Badge
							variant='outline'
							className='mb-6 w-max bg-white border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1 px-3'
						>
							Kafolatlangan xavfsizlik
						</Badge>
						<h2 className='font-space-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance'>
							Nozik texnikalar uchun maxsus qadoqlash tizimi.
						</h2>
						<p className='font-montserrat text-gray-500 text-base mb-8 text-pretty'>
							Kameralar va dronlar ehtiyotkorlikni talab qiladi. Shuning uchun
							biz har bir buyurtmani ko'p qatlamli, zarbaga chidamli maxsus havo
							yostiqchalari (Air-Bubble) va qattiq karton qutilarda qadoqlaymiz.
						</p>
						<ul className='space-y-4 font-montserrat text-sm text-gray-600'>
							<li className='flex items-center gap-3'>
								<CheckCircle2 className='size-5 text-black shrink-0' />
								Namlik va changdan himoyalangan ichki qoplama.
							</li>
							<li className='flex items-center gap-3'>
								<CheckCircle2 className='size-5 text-black shrink-0' />
								Transportirovka paytida silkinishlarni yutuvchi materiallar.
							</li>
							<li className='flex items-center gap-3'>
								<CheckCircle2 className='size-5 text-black shrink-0' />
								Ochilmaganligini tasdiqlovchi original NEXUS plombalari.
							</li>
						</ul>
					</div>
				</div>

				{/* 3-bo'lim: Buyurtma jarayoni (Timeline) */}
				<div className='rounded-3xl border border-gray-200 bg-white p-8 md:p-16 mb-12'>
					<h2 className='font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center'>
						Buyurtmangiz qanday yetib boradi?
					</h2>

					<div className='relative flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-4 before:absolute before:inset-0 before:ml-6 md:before:ml-0 before:-translate-x-px md:before:translate-x-0 before:h-full md:before:h-[2px] before:w-[2px] md:before:w-full before:bg-gray-100 md:before:top-1/2 md:before:-translate-y-1/2 z-0'>
						{/* Qadam 1 */}
						<div className='relative z-10 flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4 md:w-1/4'>
							<div className='size-12 shrink-0 rounded-full bg-black text-white flex items-center justify-center font-space-grotesk font-bold text-lg shadow-md ring-4 ring-white'>
								1
							</div>
							<div>
								<h4 className='font-space-grotesk font-bold text-gray-900 mb-1'>
									Buyurtma qabul qilindi
								</h4>
								<p className='font-montserrat text-xs text-gray-500'>
									Sayt orqali xarid amalga oshiriladi.
								</p>
							</div>
						</div>

						{/* Qadam 2 */}
						<div className='relative z-10 flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4 md:w-1/4'>
							<div className='size-12 shrink-0 rounded-full bg-white border border-gray-300 text-black flex items-center justify-center font-space-grotesk font-bold text-lg ring-4 ring-white'>
								2
							</div>
							<div>
								<h4 className='font-space-grotesk font-bold text-gray-900 mb-1'>
									Qadoqlash jarayoni
								</h4>
								<p className='font-montserrat text-xs text-gray-500'>
									Omborda xavfsiz qadoqlanadi.
								</p>
							</div>
						</div>

						{/* Qadam 3 */}
						<div className='relative z-10 flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4 md:w-1/4'>
							<div className='size-12 shrink-0 rounded-full bg-white border border-gray-300 text-black flex items-center justify-center font-space-grotesk font-bold text-lg ring-4 ring-white'>
								3
							</div>
							<div>
								<h4 className='font-space-grotesk font-bold text-gray-900 mb-1'>
									Kuryerga topshirildi
								</h4>
								<p className='font-montserrat text-xs text-gray-500'>
									Sizga SMS orqali treking raqam keladi.
								</p>
							</div>
						</div>

						{/* Qadam 4 */}
						<div className='relative z-10 flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4 md:w-1/4'>
							<div className='size-12 shrink-0 rounded-full bg-white border border-gray-300 text-black flex items-center justify-center font-space-grotesk font-bold text-lg ring-4 ring-white'>
								4
							</div>
							<div>
								<h4 className='font-space-grotesk font-bold text-gray-900 mb-1'>
									Manzilga yetkazildi
								</h4>
								<p className='font-montserrat text-xs text-gray-500'>
									Uskunani qabul qilib olasiz.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Action */}
				<div className='flex justify-center mt-16'>
					<Button
						asChild
						size='lg'
						className='h-12 px-8 rounded-xl bg-black text-white hover:bg-gray-800 font-montserrat transition-all'
					>
						<Link href='/browse'>
							Katalogni ko'rish
							<ArrowRight className='size-4 ml-2' />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ShippingPage
