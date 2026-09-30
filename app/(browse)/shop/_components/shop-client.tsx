'use client'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Search, SlidersHorizontal } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useState } from 'react'

import { ProductCard } from './product-card'
import { ShopPagination } from './shop-pagination'
import { ShopSidebar } from './shop-sidebar'

interface Product {
	id: string
	brand: string
	name: string
	oldPrice: string | null
	price: string
	image: string
}

interface ShopClientProps {
	products: Product[]
	categories: { title: string; slug: string }[]
	totalCount: number
	totalPages: number
	currentPage: number
	currentSort: string
}

export default function ShopClient({
	products,
	categories,
	totalCount,
	totalPages,
	currentPage,
	currentSort,
}: ShopClientProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

	const handleSortChange = (value: string | null) => {
		if (!value) return
		const current = qs.parse(searchParams.toString())
		const url = qs.stringifyUrl(
			{ url: pathname, query: { ...current, sort: value, page: '1' } },
			{ skipNull: true, skipEmptyString: true },
		)
		router.push(url, { scroll: false })
	}

	return (
		<div className='min-h-screen bg-[#FAFAFA] pt-32 pb-24'>
			<div className='max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200'>
					<div>
						<h1 className='font-space-grotesk text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-4'>
							Do'kon
						</h1>
						<p className='font-montserrat text-gray-500 text-sm md:text-base max-w-md text-balance'>
							Eng so'nggi texnologiyalar va gadjetlar. Barcha mahsulotlar
							original va kafolatlangan.
						</p>
					</div>
				</div>

				<div className='flex flex-col lg:flex-row gap-10 relative items-start'>
					<ShopSidebar
						categories={categories}
						isMobileOpen={isMobileFilterOpen}
						setMobileOpen={setIsMobileFilterOpen}
					/>

					<main className='lg:w-3/4 flex flex-col gap-6 w-full'>
						<div className='flex items-center justify-between bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm'>
							<div className='flex items-center gap-4'>
								<Button
									variant='outline'
									size='sm'
									className='lg:hidden rounded-lg border-gray-200 flex items-center gap-2'
									onClick={() => setIsMobileFilterOpen(true)}
								>
									<SlidersHorizontal className='size-4' />
									Filtr
								</Button>
								<p className='font-montserrat text-sm text-gray-500'>
									<span className='font-semibold text-black'>{totalCount}</span>{' '}
									ta mahsulot topildi
								</p>
							</div>

							<div className='flex items-center gap-3'>
								<span className='hidden sm:block font-montserrat text-sm text-gray-500'>
									Tartiblash:
								</span>
								<Select value={currentSort} onValueChange={handleSortChange}>
									<SelectTrigger className='w-[140px] sm:w-[160px] h-10 bg-gray-50 border-gray-200 rounded-xl font-montserrat text-sm focus:ring-black'>
										<SelectValue placeholder='Tanlang...' />
									</SelectTrigger>
									<SelectContent className='font-montserrat text-sm rounded-xl'>
										<SelectItem value='newest'>Yangi qo'shilganlar</SelectItem>
										<SelectItem value='price-asc'>Arzon - Qimmat</SelectItem>
										<SelectItem value='price-desc'>Qimmat - Arzon</SelectItem>
										<SelectItem value='name-asc'>
											Alifbo bo'yicha (A-Z)
										</SelectItem>
										<SelectItem value='name-desc'>
											Alifbo bo'yicha (Z-A)
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{products.length > 0 ? (
							<>
								<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
									{products.map(product => (
										<ProductCard key={product.id} product={product} />
									))}
								</div>
								<ShopPagination
									totalPages={totalPages}
									currentPage={currentPage}
								/>
							</>
						) : (
							<div className='w-full flex flex-col items-center justify-center py-32 text-center rounded-[2rem] border border-dashed border-gray-300 bg-white'>
								<div className='size-20 bg-gray-50 rounded-full flex items-center justify-center mb-6'>
									<Search className='size-8 text-gray-400' />
								</div>
								<h3 className='font-space-grotesk text-2xl font-bold text-gray-900 mb-2'>
									Mahsulot topilmadi
								</h3>
								<p className='font-montserrat text-gray-500 max-w-sm mb-6'>
									Ushbu filtrlar bo'yicha hech qanday mahsulot topilmadi.
								</p>
								<Button
									onClick={() => router.push(pathname)}
									className='rounded-xl font-montserrat'
								>
									Filtrlarni tozalash
								</Button>
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	)
}
