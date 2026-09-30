'use client'

import { Badge } from '@/components/ui/badge'
import { ICategory } from '@/lib/actions/category.actions'
import { IProduct, deleteProduct } from '@/lib/actions/product.actions'
import {
	EyeOff,
	Image as ImageIcon,
	Package,
	Pencil,
	Plus,
	Search,
	Tag,
	Trash2,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProductSheet from './ProductSheet'

interface IPopulatedProduct extends Omit<IProduct, 'category'> {
	category: { _id: string; title: string; slug?: string } | string
}

interface ProductsClientProps {
	initialProducts: IPopulatedProduct[]
	categories: ICategory[]
	query: string
}

const TABS = ['Barchasi', 'Faol', 'Qolmagan', 'Qoralama']

const getStatusConfig = (status: string) => {
	switch (status) {
		case 'Faol':
			return {
				color: 'bg-emerald-50 text-emerald-700',
				border: 'border-emerald-200',
			}
		case 'Qolmagan':
			return { color: 'bg-red-50 text-red-700', border: 'border-red-200' }
		case 'Qoralama':
			return { color: 'bg-gray-100 text-gray-600', border: 'border-gray-200' }
		default:
			return { color: 'bg-gray-50 text-gray-600', border: 'border-gray-200' }
	}
}

export default function ProductsClient({
	initialProducts,
	categories,
	query,
}: ProductsClientProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [activeTab, setActiveTab] = useState<string>('Barchasi')
	const [searchTerm, setSearchTerm] = useState<string>(query)
	const [isPending, setIsPending] = useState(false)

	// Sheet states
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)

	// DEBOUNCE SEARCH LOGIC
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString())
			if (searchTerm) {
				params.set('q', searchTerm)
			} else {
				params.delete('q')
			}
			router.replace(`${pathname}?${params.toString()}`)
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [searchTerm, pathname, router, searchParams])

	// FRONTEND FILTR (Tablar uchun)
	const filteredProducts = initialProducts.filter(product => {
		if (activeTab === 'Barchasi') return true
		return product.status === activeTab
	})

	// STATISTIKA (KPI)
	const totalProducts = initialProducts.length
	const outOfStock = initialProducts.filter(p => p.status === 'Qolmagan').length
	const totalCategories = categories.length

	// HARAKATLAR
	const handleAddNew = () => {
		setEditingProduct(null)
		setIsSheetOpen(true)
	}

	const handleEdit = (product: IPopulatedProduct) => {
		// Category object (populate bo'lgan) ni id ga aylantirib yuboramiz (Edit qilishda category faqat ID so'raydi)
		const formattedProduct = {
			...product,
			category: product.category?._id || product.category,
		}
		setEditingProduct(formattedProduct)
		setIsSheetOpen(true)
	}

	const handleDelete = async (id: string, title: string) => {
		if (confirm(`Rostdan ham "${title}" mahsulotini o'chirasizmi?`)) {
			setIsPending(true)
			try {
				await deleteProduct(id)
			} catch (error) {
				console.error(error)
				alert("O'chirishda xatolik yuz berdi.")
			} finally {
				setIsPending(false)
			}
		}
	}

	return (
		<div className='flex flex-col space-y-10 animate-in fade-in duration-700 ease-out pb-12 pt-4'>
			<ProductSheet
				isOpen={isSheetOpen}
				setIsOpen={setIsSheetOpen}
				initialData={editingProduct}
				categories={categories} // KATEGORIYALAR JO'NATILDI
			/>

			{/* HEADER */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						Mahsulotlar
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						Do'koningizdagi barcha tovarlarni, ularning narxi va texnik
						xususiyatlarini boshqaring.
					</p>
				</div>
				<div>
					<button
						onClick={handleAddNew}
						className='font-montserrat flex items-center gap-2 rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-all shadow-sm cursor-pointer'
					>
						<Plus className='w-4 h-4' />
						Yangi mahsulot
					</button>
				</div>
			</div>

			{/* KPI STATS */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6'>
				<div className='bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex items-center gap-4 hover:border-black/20 transition-all'>
					<div className='w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100'>
						<Package className='w-5 h-5 text-gray-600' />
					</div>
					<div>
						<p className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
							Jami mahsulotlar
						</p>
						<h3 className='font-space-grotesk text-2xl font-bold text-black'>
							{totalProducts} ta
						</h3>
					</div>
				</div>
				<div className='bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex items-center gap-4 hover:border-black/20 transition-all'>
					<div className='w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100'>
						<EyeOff className='w-5 h-5 text-red-500' />
					</div>
					<div>
						<p className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
							Tugaganlar
						</p>
						<h3 className='font-space-grotesk text-2xl font-bold text-black'>
							{outOfStock} ta
						</h3>
					</div>
				</div>
				<div className='bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex items-center gap-4 hover:border-black/20 transition-all'>
					<div className='w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100'>
						<Tag className='w-5 h-5 text-indigo-500' />
					</div>
					<div>
						<p className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
							Kategoriyalar
						</p>
						<h3 className='font-space-grotesk text-2xl font-bold text-black'>
							{totalCategories} ta
						</h3>
					</div>
				</div>
			</div>

			{/* ASOSIY JADVAL */}
			<div className='flex flex-col rounded-[24px] border border-gray-200/80 bg-white shadow-sm overflow-hidden'>
				<div className='flex flex-col border-b border-gray-100 p-5 gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-50/30'>
					<div className='flex items-center gap-1 rounded-xl bg-gray-100/80 p-1 border border-gray-200/60 overflow-x-auto custom-scrollbar'>
						{TABS.map(tab => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`font-montserrat whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
									activeTab === tab
										? 'bg-white text-black shadow-sm border border-gray-200/60 scale-[1.02]'
										: 'text-gray-500 hover:text-gray-900'
								}`}
							>
								{tab}
							</button>
						))}
					</div>
					<div className='relative w-full lg:w-72 shrink-0'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<input
							type='text'
							placeholder='Mahsulot nomini qidirish...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm font-montserrat'
						/>
					</div>
				</div>

				<div className='overflow-x-auto min-h-120'>
					<table className='w-full text-left border-collapse'>
						<thead>
							<tr className='bg-gray-50/50 border-b border-gray-100 text-gray-500'>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6 w-16'>
									Rasm
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Mahsulot
								</th>
								{/* YANGLIK: Ombordagi soni ustuni */}
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Omborda
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Holat
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6 text-right'>
									Narx
								</th>
								<th className='py-4 px-6 text-right'></th>
							</tr>
						</thead>
						<tbody
							className={`divide-y divide-gray-100 font-montserrat transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}
						>
							{filteredProducts.length > 0 ? (
								filteredProducts.map(product => {
									const { color, border } = getStatusConfig(product.status)
									const hasDiscount = !!product.discountPrice

									// Birinchi rasmni (agar bor bo'lsa) olish
									const firstImage =
										product.images && product.images.length > 0
											? product.images[0]
											: null

									return (
										<tr
											key={product._id}
											className='group hover:bg-gray-50/50 transition-colors'
										>
											{/* Rasm */}
											<td className='py-4 px-6'>
												<div className='relative w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden'>
													{firstImage ? (
														<Image
															src={firstImage}
															alt={product.title}
															fill
															sizes='(max-width: 768px) 48px, 48px'
															className='object-cover'
														/>
													) : (
														<ImageIcon className='w-5 h-5 text-gray-400' />
													)}
												</div>
											</td>

											{/* Nomi va Kategoriya nomi */}
											<td className='py-4 px-6'>
												<div className='flex flex-col'>
													<span className='font-space-grotesk text-sm font-bold text-gray-900 max-w-75 truncate'>
														{product.title}
													</span>
													<span className='flex items-center text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider'>
														<Tag className='w-3 h-3 mr-1.5' />
														{product.category?.title || 'Kategoriyasiz'}
													</span>
												</div>
											</td>

											{/* YANGLIK: Ombordagi soni */}
											<td className='py-4 px-6 whitespace-nowrap'>
												<span
													className={`font-space-grotesk text-sm font-bold ${
														product.stock <= 5 ? 'text-red-500' : 'text-black'
													}`}
												>
													{product.stock || 0} ta
												</span>
											</td>

											{/* Holati */}
											<td className='py-4 px-6 whitespace-nowrap'>
												<Badge
													variant='outline'
													className={`text-[10px] font-bold px-2.5 py-1 ${color} ${border}`}
												>
													{product.status}
												</Badge>
											</td>

											{/* Narxi */}
											<td className='py-4 px-6 text-right whitespace-nowrap'>
												<div className='flex flex-col items-end'>
													<span className='font-space-grotesk text-sm font-bold text-gray-900'>
														$
														{(hasDiscount
															? product.discountPrice!
															: product.price
														).toLocaleString(undefined, {
															minimumFractionDigits: 2,
														})}
													</span>
													{hasDiscount && (
														<span className='text-[11px] font-semibold text-gray-400 line-through mt-0.5 bg-gray-100 px-1.5 py-0.5 rounded-md'>
															$
															{product.price.toLocaleString(undefined, {
																minimumFractionDigits: 2,
															})}
														</span>
													)}
												</div>
											</td>

											{/* Harakatlar (Hover Actions) */}
											<td className='py-4 px-6 text-right whitespace-nowrap'>
												<div className='flex items-center justify-end gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
													<button
														onClick={() => handleEdit(product)}
														className='flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 hover:text-black hover:border-black bg-white shadow-sm transition-colors cursor-pointer'
														title='Tahrirlash'
													>
														<Pencil className='w-3.5 h-3.5' />
													</button>
													<button
														onClick={() =>
															handleDelete(product._id, product.title)
														}
														className='flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 bg-white shadow-sm transition-colors cursor-pointer'
														title='O`chirish'
													>
														<Trash2 className='w-3.5 h-3.5' />
													</button>
												</div>
											</td>
										</tr>
									)
								})
							) : (
								<tr>
									{/* YANGLIK: colSpan 5 dan 6 ga o'zgartirildi, chunki yangi ustun qo'shildi */}
									<td
										colSpan={6}
										className='py-20 text-center text-sm text-gray-500 font-medium'
									>
										{searchTerm
											? 'Mahsulot topilmadi.'
											: "Hozircha mahsulotlar yo'q."}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
