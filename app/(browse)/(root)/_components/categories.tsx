import { getCategories } from '@/lib/actions/category.actions'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

// DIZAYN UCHUN STATIK KLASSLAR
const LAYOUT_STYLES = [
	{
		className: 'md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[600px]',
		imageClass: 'w-[90%] h-[80%] md:w-[85%] md:h-[85%] bottom-0 right-0',
		textClass: 'max-w-md',
	},
	{
		className: 'md:col-span-1 md:row-span-1 min-h-[300px]',
		imageClass: 'w-[80%] h-[70%] bottom-0 right-[-10%]',
		textClass: 'max-w-[200px]',
	},
	{
		className: 'md:col-span-1 md:row-span-1 min-h-[300px]',
		imageClass: 'w-[80%] h-[70%] bottom-0 right-[-10%]',
		textClass: 'max-w-[200px]',
	},
	{
		className: 'md:col-span-3 md:row-span-1 min-h-[350px] md:min-h-[300px]',
		imageClass:
			'w-[90%] md:w-[40%] h-[85%] md:h-[120%] bottom-0 md:-bottom-10 right-[-5%] md:right-10',
		textClass: 'max-w-sm md:max-w-lg md:mt-4',
	},
]

type Category = {
	_id?: string | { toString(): string }
	slug: string
	status: string
	title: string
	description?: string
	image?: string | null
}

// 1. MA'LUMOT CHAQIRUVCHI VA KARTALARNI CHIZUVCHI ASYNC KOMPONENT
const CategoryGrid = async () => {
	let categories: Category[] = []

	try {
		const data = await getCategories({})
		if (data && data.length > 0) {
			categories = data.filter((c: Category) => c.status === 'Faol').slice(0, 4)
		}
	} catch (error) {
		console.error('Kategoriyalarni yuklashda xatolik:', error)
	}

	if (!categories || categories.length === 0) {
		return (
			<div className='py-20 text-center text-gray-500 font-montserrat w-full'>
				Kategoriyalar vaqtincha mavjud emas...
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr'>
			{categories.map((category, index) => {
				const layout = LAYOUT_STYLES[index] || LAYOUT_STYLES[1]

				return (
					<Link
						key={category._id?.toString() || index}
						href={`/shop?category=${category.slug}`}
						className={cn(
							'group relative block rounded-3xl bg-gray-50 border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors',
							layout.className,
						)}
					>
						<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none'></div>

						<div className='absolute top-0 left-0 w-full p-6 md:p-8 z-20 flex justify-between items-start pointer-events-none'>
							<div className='pointer-events-auto'>
								<h3 className='font-space-grotesk text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3'>
									{category.title}
								</h3>
								<p
									className={cn(
										'font-montserrat text-sm text-gray-500 text-pretty leading-relaxed line-clamp-2 md:line-clamp-none',
										layout.textClass,
									)}
								>
									{category.description}
								</p>
							</div>
							<div className='size-10 shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 pointer-events-auto ml-4'>
								<ArrowUpRight className='size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
							</div>
						</div>

						<div
							className={cn(
								'absolute z-10 flex items-end justify-end pointer-events-none',
								layout.imageClass,
							)}
						>
							<div className='relative w-full h-full'>
								<div className='absolute inset-0 bg-gray-300 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700'></div>
								{category.image && (
									<Image
										src={category.image}
										alt={category.title}
										fill
										className='object-contain object-bottom drop-shadow-2xl group-hover:scale-105 transition-transform duration-1000 ease-out'
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									/>
								)}
							</div>
						</div>
					</Link>
				)
			})}
		</div>
	)
}

// 2. ASOSIY KOMPONENT (SUSPENSE BILAN O'RALGAN)
const Categories = () => {
	return (
		<section className='py-24 bg-white border-b border-gray-200'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* STATIK QISM - DARHOL YUKLANADI */}
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
					<div>
						<h2 className='font-space-grotesk text-3xl md:text-4xl font-bold tracking-tight text-black'>
							Kategoriyalar
						</h2>
						<p className='font-montserrat text-gray-500 mt-3 max-w-md text-sm text-balance'>
							Kerakli bo'limni tanlang va eng so'nggi texnologiyalarni kashf
							eting. O'z yo'nalishingizdagi eng yaxshi uskunalarni toping.
						</p>
					</div>

					<Link
						href='/shop'
						className='group flex items-center gap-2 font-montserrat text-sm font-medium text-black hover:text-gray-600 transition-colors'
					>
						Barcha kategoriyalar
						<ArrowUpRight className='size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
					</Link>
				</div>

				{/* DINAMIK QISM - BAZADAN KELGUNCHA FALLBACK KO'RINIB TURADI */}
				<Suspense
					fallback={
						<div className='py-32 w-full flex flex-col items-center justify-center gap-3 text-gray-400'>
							<Loader2 className='w-8 h-8 animate-spin' />
							<p className='font-montserrat text-sm'>
								Kategoriyalar yuklanmoqda...
							</p>
						</div>
					}
				>
					<CategoryGrid />
				</Suspense>
			</div>
		</section>
	)
}

export default Categories
