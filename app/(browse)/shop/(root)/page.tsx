'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Search, ShoppingCart, SlidersHorizontal, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

// Kategoriya ma'lumotlari
const categories = [
	'Barchasi',
	'Drones',
	'Audio',
	'Stabilizers',
	'Computers',
	'Accessories',
]

// 35 ta mahsulotdan iborat Mock Data (Paginatsiya uchun)
const mockProducts = [
	// Sahifa 1
	{
		id: 1,
		brand: 'DJI',
		name: 'Mavic 3 Pro',
		price: 1999,
		oldPrice: 2199,
		category: 'Drones',
		date: '2024-01-15',
		image: '/powercore.png',
	},
	{
		id: 2,
		brand: 'SONY',
		name: 'WH-1000XM5',
		price: 349,
		oldPrice: 399,
		category: 'Audio',
		date: '2024-02-10',
		image: '/bottle.png',
	},
	{
		id: 3,
		brand: 'DJI',
		name: 'Osmo Mobile 6',
		price: 159,
		oldPrice: 189,
		category: 'Stabilizers',
		date: '2024-03-05',
		image: '/pocketpower.png',
	},
	{
		id: 4,
		brand: 'APPLE',
		name: 'MacBook Pro M3',
		price: 1999,
		oldPrice: 2299,
		category: 'Computers',
		date: '2024-03-20',
		image: '/doorbell.png',
	},
	{
		id: 5,
		brand: 'VOLTIA',
		name: 'PowerCore 65W',
		price: 22,
		oldPrice: 39,
		category: 'Accessories',
		date: '2023-11-12',
		image: '/powercore.png',
	},
	{
		id: 6,
		brand: 'HYDRON',
		name: 'Smart Bottle',
		price: 35,
		oldPrice: 40,
		category: 'Accessories',
		date: '2024-01-22',
		image: '/bottle.png',
	},
	{
		id: 7,
		brand: 'NEXA',
		name: 'PocketPower 10K',
		price: 39,
		oldPrice: 55,
		category: 'Accessories',
		date: '2023-12-05',
		image: '/pocketpower.png',
	},
	{
		id: 8,
		brand: 'AUTEL',
		name: 'Evo Lite+',
		price: 1299,
		oldPrice: 1549,
		category: 'Drones',
		date: '2024-02-28',
		image: '/doorbell.png',
	},
	{
		id: 9,
		brand: 'BOSE',
		name: 'QuietComfort 45',
		price: 329,
		oldPrice: 359,
		category: 'Audio',
		date: '2024-04-01',
		image: '/powercore.png',
	},
	{
		id: 10,
		brand: 'ZHIYUN',
		name: 'Smooth 5S',
		price: 169,
		oldPrice: 199,
		category: 'Stabilizers',
		date: '2024-04-10',
		image: '/bottle.png',
	},
	{
		id: 11,
		brand: 'LENOVO',
		name: 'Legion Pro 7i',
		price: 2499,
		oldPrice: 2799,
		category: 'Computers',
		date: '2024-04-15',
		image: '/pocketpower.png',
	},
	{
		id: 12,
		brand: 'ANKER',
		name: '737 Power Bank',
		price: 149,
		oldPrice: 179,
		category: 'Accessories',
		date: '2024-04-20',
		image: '/doorbell.png',
	},
	{
		id: 13,
		brand: 'SKYDIO',
		name: 'Skydio 2+',
		price: 1099,
		oldPrice: 1299,
		category: 'Drones',
		date: '2024-04-25',
		image: '/powercore.png',
	},
	{
		id: 14,
		brand: 'SENNHEISER',
		name: 'Momentum 4',
		price: 379,
		oldPrice: 429,
		category: 'Audio',
		date: '2024-05-05',
		image: '/bottle.png',
	},
	{
		id: 15,
		brand: 'ASUS',
		name: 'ROG Zephyrus G14',
		price: 1599,
		oldPrice: 1899,
		category: 'Computers',
		date: '2024-05-10',
		image: '/pocketpower.png',
	},

	// Sahifa 2
	{
		id: 16,
		brand: 'DJI',
		name: 'Mini 4 Pro',
		price: 859,
		oldPrice: 959,
		category: 'Drones',
		date: '2024-05-15',
		image: '/bottle.png',
	},
	{
		id: 17,
		brand: 'APPLE',
		name: 'AirPods Max',
		price: 549,
		oldPrice: 599,
		category: 'Audio',
		date: '2024-05-20',
		image: '/powercore.png',
	},
	{
		id: 18,
		brand: 'HOHEM',
		name: 'iSteady M6',
		price: 209,
		oldPrice: 229,
		category: 'Stabilizers',
		date: '2024-05-25',
		image: '/doorbell.png',
	},
	{
		id: 19,
		brand: 'DELL',
		name: 'XPS 15 OLED',
		price: 2199,
		oldPrice: 2499,
		category: 'Computers',
		date: '2024-06-01',
		image: '/pocketpower.png',
	},
	{
		id: 20,
		brand: 'LOGITECH',
		name: 'MX Master 3S',
		price: 99,
		oldPrice: 119,
		category: 'Accessories',
		date: '2024-06-05',
		image: '/bottle.png',
	},
	{
		id: 21,
		brand: 'SATECHI',
		name: 'USB-C Pro Hub',
		price: 79,
		oldPrice: 99,
		category: 'Accessories',
		date: '2024-06-10',
		image: '/powercore.png',
	},
	{
		id: 22,
		brand: 'HOVER',
		name: 'Air X1',
		price: 349,
		oldPrice: 429,
		category: 'Drones',
		date: '2024-06-15',
		image: '/doorbell.png',
	},
	{
		id: 23,
		brand: 'BEATS',
		name: 'Studio Pro',
		price: 249,
		oldPrice: 349,
		category: 'Audio',
		date: '2024-06-20',
		image: '/pocketpower.png',
	},
	{
		id: 24,
		brand: 'INSTA360',
		name: 'Flow Gimbal',
		price: 159,
		oldPrice: 179,
		category: 'Stabilizers',
		date: '2024-06-25',
		image: '/bottle.png',
	},
	{
		id: 25,
		brand: 'HP',
		name: 'Spectre x360',
		price: 1499,
		oldPrice: 1699,
		category: 'Computers',
		date: '2024-07-01',
		image: '/powercore.png',
	},
	{
		id: 26,
		brand: 'BELKIN',
		name: 'MagSafe 3-in-1',
		price: 149,
		oldPrice: 169,
		category: 'Accessories',
		date: '2024-07-05',
		image: '/doorbell.png',
	},
	{
		id: 27,
		brand: 'FIMI',
		name: 'X8 Mini V2',
		price: 299,
		oldPrice: 399,
		category: 'Drones',
		date: '2024-07-10',
		image: '/pocketpower.png',
	},
	{
		id: 28,
		brand: 'JBL',
		name: 'Tour One M2',
		price: 299,
		oldPrice: 349,
		category: 'Audio',
		date: '2024-07-15',
		image: '/bottle.png',
	},
	{
		id: 29,
		brand: 'MOZA',
		name: 'Mini MX 2',
		price: 89,
		oldPrice: 109,
		category: 'Stabilizers',
		date: '2024-07-20',
		image: '/powercore.png',
	},
	{
		id: 30,
		brand: 'RAZER',
		name: 'Blade 16',
		price: 2999,
		oldPrice: 3299,
		category: 'Computers',
		date: '2024-07-25',
		image: '/doorbell.png',
	},

	// Sahifa 3
	{
		id: 31,
		brand: 'NATIVE',
		name: 'Union Drop Pad',
		price: 49,
		oldPrice: 59,
		category: 'Accessories',
		date: '2024-08-01',
		image: '/pocketpower.png',
	},
	{
		id: 32,
		brand: 'DJI',
		name: 'Air 3 Combo',
		price: 1349,
		oldPrice: 1549,
		category: 'Drones',
		date: '2024-08-05',
		image: '/bottle.png',
	},
	{
		id: 33,
		brand: 'BOWERS',
		name: 'Px7 S2e',
		price: 399,
		oldPrice: 429,
		category: 'Audio',
		date: '2024-08-10',
		image: '/powercore.png',
	},
	{
		id: 34,
		brand: 'MSI',
		name: 'Stealth 14 Studio',
		price: 1699,
		oldPrice: 1899,
		category: 'Computers',
		date: '2024-08-15',
		image: '/doorbell.png',
	},
	{
		id: 35,
		brand: 'FEIYU',
		name: 'Vimble 3',
		price: 119,
		oldPrice: 139,
		category: 'Stabilizers',
		date: '2024-08-20',
		image: '/pocketpower.png',
	},
]

const ITEMS_PER_PAGE = 15

const ShopPage = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('Barchasi')
	const [sortOption, setSortOption] = useState('newest')
	const [priceRange, setPriceRange] = useState({ min: '', max: '' })

	const [currentPage, setCurrentPage] = useState(1)
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

	const filteredAndSortedProducts = useMemo(() => {
		let result = [...mockProducts]

		if (searchQuery) {
			result = result.filter(
				p =>
					p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
			)
		}

		if (selectedCategory !== 'Barchasi') {
			result = result.filter(p => p.category === selectedCategory)
		}

		if (priceRange.min) {
			result = result.filter(p => p.price >= Number(priceRange.min))
		}
		if (priceRange.max) {
			result = result.filter(p => p.price <= Number(priceRange.max))
		}

		switch (sortOption) {
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
	}, [searchQuery, selectedCategory, sortOption, priceRange])

	const totalPages = Math.ceil(
		filteredAndSortedProducts.length / ITEMS_PER_PAGE,
	)
	const paginatedProducts = filteredAndSortedProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	)

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
					{/* ================= CHAP TOMON: FILTRLAR (STICKY SIDEBAR) ================= */}
					<aside
						className={cn(
							'lg:w-1/4 flex-col gap-10',
							// Mobil uchun holat
							isMobileFilterOpen
								? 'flex fixed inset-0 z-50 bg-white p-6 overflow-y-auto'
								: 'hidden lg:flex',
							// Desktop uchun Sticky klasslari va Scrollbar'ni yashirish
							'lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
						)}
					>
						<div className='flex lg:hidden justify-between items-center pb-4 border-b border-gray-200 mb-4'>
							<h3 className='font-space-grotesk text-xl font-bold'>Filtrlar</h3>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setIsMobileFilterOpen(false)}
							>
								<X className='size-5' />
							</Button>
						</div>

						{/* Qidiruv */}
						<div className='flex flex-col gap-3'>
							<h3 className='font-space-grotesk text-sm font-bold tracking-widest uppercase text-gray-900'>
								Qidiruv
							</h3>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400' />
								<Input
									placeholder='Mahsulot yoki brend...'
									className='pl-10 h-12 bg-white border-gray-200 rounded-xl focus-visible:ring-black'
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>

						{/* Kategoriyalar */}
						<div className='flex flex-col gap-3'>
							<h3 className='font-space-grotesk text-sm font-bold tracking-widest uppercase text-gray-900'>
								Kategoriya
							</h3>
							<div className='flex flex-col gap-1'>
								{categories.map(cat => (
									<button
										key={cat}
										onClick={() => setSelectedCategory(cat)}
										className={cn(
											'text-left px-4 py-2.5 rounded-lg font-montserrat text-sm transition-all duration-300',
											selectedCategory === cat
												? 'bg-black text-white font-medium shadow-md'
												: 'text-gray-600 hover:bg-gray-100',
										)}
									>
										{cat}
									</button>
								))}
							</div>
						</div>

						{/* Narx oralig'i */}
						<div className='flex flex-col gap-3'>
							<h3 className='font-space-grotesk text-sm font-bold tracking-widest uppercase text-gray-900'>
								Narx ($)
							</h3>
							<div className='flex items-center gap-3'>
								<Input
									type='number'
									placeholder='Min'
									className='h-11 bg-white border-gray-200 rounded-xl'
									value={priceRange.min}
									onChange={e =>
										setPriceRange({ ...priceRange, min: e.target.value })
									}
								/>
								<span className='text-gray-400'>-</span>
								<Input
									type='number'
									placeholder='Max'
									className='h-11 bg-white border-gray-200 rounded-xl'
									value={priceRange.max}
									onChange={e =>
										setPriceRange({ ...priceRange, max: e.target.value })
									}
								/>
							</div>
						</div>

						{/* Tozalash tugmasi */}
						<Button
							variant='outline'
							className='w-full rounded-xl border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black mt-4 lg:mt-0'
							onClick={() => {
								setSearchQuery('')
								setSelectedCategory('Barchasi')
								setSortOption('newest')
								setPriceRange({ min: '', max: '' })
								setCurrentPage(1)
								setIsMobileFilterOpen(false)
							}}
						>
							Filtrlarni tozalash
						</Button>
					</aside>

					{/* ================= O'NG TOMON: MAHSULOTLAR GRIDI ================= */}
					<main className='lg:w-3/4 flex flex-col gap-6'>
						{/* Top Bar: Results count & Sorting */}
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

							{/* Tartiblash (Select) */}
							<div className='flex items-center gap-3'>
								<span className='hidden sm:block font-montserrat text-sm text-gray-500'>
									Tartiblash:
								</span>
								<Select
									value={sortOption}
									onValueChange={value => setSortOption(value ?? 'newest')}
								>
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
									{paginatedProducts.map(product => {
										const discountPercent = Math.round(
											((Number(product.oldPrice) - Number(product.price)) /
												Number(product.oldPrice)) *
												100,
										)

										return (
											<Link
												href={`/shop/${product.id}`}
												key={product.id}
												className='group relative flex flex-col rounded-[2rem] bg-white border border-gray-200 overflow-hidden hover:border-black/20 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 h-[400px]'
											>
												<div className='absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none'>
													<span className='font-space-grotesk text-xs font-bold tracking-widest text-gray-400 uppercase'>
														{product.brand}
													</span>
													{discountPercent > 0 && (
														<Badge className='bg-black text-white font-montserrat text-xs rounded-md shadow-md pointer-events-auto'>
															-{discountPercent}%
														</Badge>
													)}
												</div>

												<div className='relative flex-1 w-full flex items-center justify-center p-8 mt-6'>
													<Image
														src={product.image}
														alt={product.name}
														fill
														className='object-contain p-10 drop-shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 ease-out'
														sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
													/>
												</div>

												<div className='relative z-20 p-6 bg-white border-t border-gray-100 flex items-end justify-between mt-auto'>
													<div className='flex flex-col gap-1'>
														<h3 className='font-space-grotesk font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-black transition-colors'>
															{product.name}
														</h3>
														<div className='flex items-center gap-2 font-montserrat'>
															<span className='text-gray-400 line-through text-xs'>
																${product.oldPrice}
															</span>
															<span className='text-black font-bold text-lg'>
																${product.price}
															</span>
														</div>
													</div>

													<Button
														size='icon'
														variant='outline'
														className='size-10 shrink-0 rounded-full border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all shadow-sm group-hover:shadow-md'
													>
														<ShoppingCart className='size-4 transition-transform duration-300 group-hover:scale-110' />
													</Button>
												</div>
											</Link>
										)
									})}
								</div>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className='mt-12 flex justify-center pb-8'>
										<Pagination>
											<PaginationContent>
												<PaginationItem>
													<PaginationPrevious
														href='#'
														onClick={e => {
															e.preventDefault()
															if (currentPage > 1) {
																setCurrentPage(p => p - 1)
																window.scrollTo({ top: 0, behavior: 'smooth' })
															}
														}}
														className={cn(
															'rounded-xl',
															currentPage === 1
																? 'pointer-events-none opacity-50'
																: '',
														)}
													/>
												</PaginationItem>

												{[...Array(totalPages)].map((_, i) => (
													<PaginationItem key={i}>
														<PaginationLink
															href='#'
															isActive={currentPage === i + 1}
															onClick={e => {
																e.preventDefault()
																setCurrentPage(i + 1)
																window.scrollTo({ top: 0, behavior: 'smooth' })
															}}
															className='rounded-xl'
														>
															{i + 1}
														</PaginationLink>
													</PaginationItem>
												))}

												<PaginationItem>
													<PaginationNext
														href='#'
														onClick={e => {
															e.preventDefault()
															if (currentPage < totalPages) {
																setCurrentPage(p => p + 1)
																window.scrollTo({ top: 0, behavior: 'smooth' })
															}
														}}
														className={cn(
															'rounded-xl',
															currentPage === totalPages
																? 'pointer-events-none opacity-50'
																: '',
														)}
													/>
												</PaginationItem>
											</PaginationContent>
										</Pagination>
									</div>
								)}
							</>
						) : (
							/* Bo'sh holat */
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
									onClick={() => {
										setSearchQuery('')
										setSelectedCategory('Barchasi')
										setPriceRange({ min: '', max: '' })
										setCurrentPage(1)
									}}
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

export default ShopPage
