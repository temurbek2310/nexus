'use client'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { mockProducts } from '@/lib/mock-data'
import { Search, SlidersHorizontal } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { Suspense, useMemo, useState } from 'react'

import { ProductCard } from '../_components/product-card'
import { ShopPagination } from '../_components/shop-pagination'
import { ShopSidebar } from '../_components/shop-sidebar'

const ITEMS_PER_PAGE = 15

// SearchParams ishlatilganda Next.js qoidalariga ko'ra Suspense ishlatish tavsiya etiladi
export default function ShopPage() {
	return (
		<Suspense fallback={<div className='min-h-screen bg-[#FAFAFA]' />}>
			<ShopContent />
		</Suspense>
	)
}

function ShopContent() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

	// URL parametrlarini o'qish
	const q = searchParams.get('q') || ''
	const category = searchParams.get('category') || 'Barchasi'
	const min = searchParams.get('min') || ''
	const max = searchParams.get('max') || ''
	const sort = searchParams.get('sort') || 'newest'
	const currentPage = Number(searchParams.get('page')) || 1

	// Filtrlash va Tartiblash
	const filteredAndSortedProducts = useMemo(() => {
		let result = [...mockProducts]

		if (q) {
			result = result.filter(
				p =>
					p.name.toLowerCase().includes(q.toLowerCase()) ||
					p.brand.toLowerCase().includes(q.toLowerCase()),
			)
		}
		// Barchasi so'zini ham katta-kichikligidan qat'iy nazar tekshiramiz
		if (category && category.toLowerCase() !== 'barchasi') {
			result = result.filter(
				p => p.category.toLowerCase() === category.toLowerCase(),
			)
		}
		if (min) {
			result = result.filter(p => p.price >= Number(min))
		}
		if (max) {
			result = result.filter(p => p.price <= Number(max))
		}

		switch (sort) {
			case 'price-asc':
				result.sort((a, b) => a.price - b.price)
				break
			case 'price-desc':
				result.sort((a, b) => b.price - a.price)
				break
			case 'name-asc':
				result.sort((a, b) => a.name.localeCompare(b.name))
				break
			case 'name-desc':
				result.sort((a, b) => b.name.localeCompare(a.name))
				break
			case 'newest':
			default:
				result.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
				)
				break
		}

		return result
	}, [q, category, min, max, sort])

	// Paginatsiya hisoblari
	const totalPages = Math.ceil(
		filteredAndSortedProducts.length / ITEMS_PER_PAGE,
	)
	const paginatedProducts = filteredAndSortedProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	)

	// Sort ni yangilash (URL orqali)
	const handleSortChange = (value: string | null) => {
		const nextValue = value ?? 'newest'
		const current = qs.parse(searchParams.toString())
		const url = qs.stringifyUrl(
			{ url: pathname, query: { ...current, sort: nextValue, page: '1' } },
			{ skipNull: true, skipEmptyString: true },
		)
		router.push(url, { scroll: false })
	}

	return (
		<div className='min-h-screen bg-[#FAFAFA] pt-32 pb-24'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* Sahifa Sarlavhasi */}
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-10 pb-8 border-b border-gray-200'>
					<div>
						<h1 className='font-space-grotesk text-4xl md:text-5xl font-bold tracking-tight text-black mb-4'>
							Do'kon
						</h1>
						<p className='font-montserrat text-gray-500 text-sm md:text-base max-w-md text-balance'>
							Eng so'nggi texnologiyalar va gadjetlar. Barcha mahsulotlar
							original va kafolatlangan.
						</p>
					</div>
				</div>

				<div className='flex flex-col lg:flex-row gap-10 relative items-start'>
					{/* Sidebar */}
					<ShopSidebar
						isMobileOpen={isMobileFilterOpen}
						setMobileOpen={setIsMobileFilterOpen}
					/>

					<main className='lg:w-3/4 flex flex-col gap-6'>
						{/* Top Bar */}
						<div className='flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm'>
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
									<span className='font-semibold text-black'>
										{filteredAndSortedProducts.length}
									</span>{' '}
									ta mahsulot topildi
								</p>
							</div>

							{/* Tartiblash */}
							<div className='flex items-center gap-3'>
								<span className='hidden sm:block font-montserrat text-sm text-gray-500'>
									Tartiblash:
								</span>
								<Select value={sort} onValueChange={handleSortChange}>
									<SelectTrigger className='w-[160px] h-10 bg-gray-50 border-gray-200 rounded-xl font-montserrat text-sm focus:ring-black'>
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

						{/* Products Grid */}
						{paginatedProducts.length > 0 ? (
							<>
								<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
									{paginatedProducts.map(product => (
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
									Iltimos, filtrlarni o'zgartirib qayta urinib ko'ring.
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
