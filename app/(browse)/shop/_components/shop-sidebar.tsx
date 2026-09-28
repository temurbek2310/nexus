'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categories } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useCallback, useEffect, useState } from 'react'

interface ShopSidebarProps {
	isMobileOpen: boolean
	setMobileOpen: (val: boolean) => void
}

export const ShopSidebar = ({
	isMobileOpen,
	setMobileOpen,
}: ShopSidebarProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// Hozirgi URL dagi qiymatlarni o'qib olish
	const currentCategory = searchParams.get('category') || 'Barchasi'
	const currentQuery = searchParams.get('q') || ''
	const currentMin = searchParams.get('min') || ''
	const currentMax = searchParams.get('max') || ''

	// Boshqariluvchi (Controlled) State'lar
	const [localQuery, setLocalQuery] = useState(currentQuery)
	const [localMin, setLocalMin] = useState(currentMin)
	const [localMax, setLocalMax] = useState(currentMax)

	// ================= XATO 2 VA 3 HAL QILINDI =================
	// Funksiya yuqoriga olib chiqildi va `useCallback` ga o'raldi
	const updateQuery = useCallback(
		(key: string, value: string | null) => {
			const current = qs.parse(searchParams.toString())
			const newQuery = { ...current, [key]: value }

			// Boshqa filtr bosilsa, sahifani 1 ga qaytaramiz
			if (key !== 'page') newQuery.page = '1'

			const url = qs.stringifyUrl(
				{ url: pathname, query: newQuery },
				{ skipNull: true, skipEmptyString: true },
			)
			router.push(url, { scroll: false })
		},
		[pathname, router, searchParams], // Funksiya ishlashi uchun kerakli narsalar qo'shildi
	)

	// Qidiruv uchun Debounce (Foydalanuvchi yozishni to'xtatgach 500ms dan keyin URL o'zgaradi)
	useEffect(() => {
		const timer = setTimeout(() => {
			// Faqatgina local state URL'dagidan farq qilsagina yangilaymiz
			if (localQuery !== currentQuery) {
				updateQuery('q', localQuery)
			}
		}, 500)
		return () => clearTimeout(timer)
	}, [localQuery, currentQuery, updateQuery]) // <-- updateQuery ham qavs ichiga (dependency) qo'shildi

	// ================= XATO 1 HAL QILINDI =================
	// Cascading render keltirib chiqaradigan useEffect o'chirib tashlandi.
	// Inputlar faqat "Filtrlarni tozalash" bosilganda tozalanishi uchun state'lar to'g'ridan to'g'ri shu yerda bo'shatildi.
	const clearFilters = () => {
		setLocalQuery('')
		setLocalMin('')
		setLocalMax('')
		router.push(pathname, { scroll: false })
		setMobileOpen(false)
	}

	return (
		<aside
			className={cn(
				'lg:w-1/4 flex-col gap-10',
				isMobileOpen
					? 'flex fixed inset-0 z-50 bg-white p-6 overflow-y-auto'
					: 'hidden lg:flex',
				'lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none',
			)}
		>
			<div className='flex lg:hidden justify-between items-center pb-4 border-b border-gray-200 mb-4'>
				<h3 className='font-space-grotesk text-xl font-bold'>Filtrlar</h3>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => setMobileOpen(false)}
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
						value={localQuery}
						onChange={e => setLocalQuery(e.target.value)}
					/>
				</div>
			</div>

			{/* Kategoriyalar */}
			<div className='flex flex-col gap-3'>
				<h3 className='font-space-grotesk text-sm font-bold tracking-widest uppercase text-gray-900'>
					Kategoriya
				</h3>
				<div className='flex flex-col gap-1'>
					{categories.map(cat => {
						const catSlug = cat.toLowerCase()

						return (
							<button
								key={cat}
								onClick={() => updateQuery('category', catSlug)}
								className={cn(
									'text-left px-4 py-2.5 rounded-lg font-montserrat text-sm transition-all duration-300',
									currentCategory.toLowerCase() === catSlug
										? 'bg-black text-white font-medium shadow-md'
										: 'text-gray-600 hover:bg-gray-100',
								)}
							>
								{cat}
							</button>
						)
					})}
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
						value={localMin}
						onChange={e => setLocalMin(e.target.value)}
						onBlur={() => updateQuery('min', localMin)}
					/>
					<span className='text-gray-400'>-</span>
					<Input
						type='number'
						placeholder='Max'
						className='h-11 bg-white border-gray-200 rounded-xl'
						value={localMax}
						onChange={e => setLocalMax(e.target.value)}
						onBlur={() => updateQuery('max', localMax)}
					/>
				</div>
			</div>

			<Button
				variant='outline'
				className='w-full rounded-xl border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black mt-4 lg:mt-0'
				onClick={clearFilters}
			>
				Filtrlarni tozalash
			</Button>
		</aside>
	)
}
