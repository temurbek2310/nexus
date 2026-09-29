'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useCallback, useEffect, useState } from 'react'

interface ShopSidebarProps {
	categories: { title: string; slug: string }[]
	isMobileOpen: boolean
	setMobileOpen: (val: boolean) => void
}

export const ShopSidebar = ({
	categories,
	isMobileOpen,
	setMobileOpen,
}: ShopSidebarProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const currentCategory = searchParams.get('category') || 'barchasi'
	const currentQuery = searchParams.get('q') || ''
	const currentMin = searchParams.get('min') || ''
	const currentMax = searchParams.get('max') || ''
	const currentFilter = searchParams.get('filter') || '' // YANGLIK: filter o'qiladi

	const [localQuery, setLocalQuery] = useState(currentQuery)
	const [localMin, setLocalMin] = useState(currentMin)
	const [localMax, setLocalMax] = useState(currentMax)

	const updateQuery = useCallback(
		(key: string, value: string | null) => {
			const current = qs.parse(searchParams.toString())
			const newQuery = { ...current, [key]: value }

			if (key !== 'page') newQuery.page = '1'

			const url = qs.stringifyUrl(
				{ url: pathname, query: newQuery },
				{ skipNull: true, skipEmptyString: true },
			)
			router.push(url, { scroll: false })
		},
		[pathname, router, searchParams],
	)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (localQuery !== currentQuery) updateQuery('q', localQuery)
		}, 500)
		return () => clearTimeout(timer)
	}, [localQuery, currentQuery, updateQuery])

	useEffect(() => {
		const timer = setTimeout(() => {
			if (localMin !== currentMin) updateQuery('min', localMin)
		}, 600)
		return () => clearTimeout(timer)
	}, [localMin, currentMin, updateQuery])

	useEffect(() => {
		const timer = setTimeout(() => {
			if (localMax !== currentMax) updateQuery('max', localMax)
		}, 600)
		return () => clearTimeout(timer)
	}, [localMax, currentMax, updateQuery])

	const clearFilters = () => {
		setLocalQuery('')
		setLocalMin('')
		setLocalMax('')
		router.push(pathname, { scroll: false }) // Bu barcha parametrlarni tozalab yuboradi
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

			{/* YANGLIK: Qaynoq takliflar (Chegirmalar) tugmasi */}
			<div className='flex flex-col gap-3'>
				<h3 className='font-space-grotesk text-sm font-bold tracking-widest uppercase text-gray-900'>
					Maxsus
				</h3>
				<button
					onClick={() =>
						updateQuery('filter', currentFilter === 'sale' ? null : 'sale')
					}
					className={cn(
						'text-left px-4 py-3 rounded-xl font-montserrat text-sm transition-all duration-300 border',
						currentFilter === 'sale'
							? 'bg-red-50 border-red-200 text-red-600 font-bold shadow-sm'
							: 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
					)}
				>
					🔥 Faqat chegirmadagilar
				</button>
			</div>

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

			<div className='flex flex-col gap-3'>
				<h3 className='font-space-grotesk text-sm font-bold tracking-widest uppercase text-gray-900'>
					Kategoriya
				</h3>
				<div className='flex flex-col gap-1'>
					{categories.map(cat => (
						<button
							key={cat.slug}
							onClick={() => updateQuery('category', cat.slug)}
							className={cn(
								'text-left px-4 py-2.5 rounded-lg font-montserrat text-sm transition-all duration-300',
								currentCategory === cat.slug
									? 'bg-black text-white font-medium shadow-md'
									: 'text-gray-600 hover:bg-gray-100',
							)}
						>
							{cat.title}
						</button>
					))}
				</div>
			</div>

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
					/>
					<span className='text-gray-400'>-</span>
					<Input
						type='number'
						placeholder='Max'
						className='h-11 bg-white border-gray-200 rounded-xl'
						value={localMax}
						onChange={e => setLocalMax(e.target.value)}
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
