'use client'

import { Badge } from '@/components/ui/badge'
import { ICategory, deleteCategory } from '@/lib/actions/category.actions'
import {
	FolderTree,
	Image as ImageIcon,
	LayoutGrid,
	Link as LinkIcon,
	Pencil,
	Plus,
	Search,
	Trash2,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CategorySheet from './CategorySheet'

interface CategoriesClientProps {
	initialCategories: ICategory[]
	query: string
}

const TABS = ['Barchasi', 'Faol', 'Faol emas']

export default function CategoriesClient({
	initialCategories,
	query,
}: CategoriesClientProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [activeTab, setActiveTab] = useState<string>('Barchasi')
	const [searchTerm, setSearchTerm] = useState<string>(query)
	const [isPending, setIsPending] = useState(false)

	// Sheet states
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)

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
	const filteredCategories = initialCategories.filter(cat => {
		if (activeTab === 'Barchasi') return true
		return cat.status === activeTab
	})

	// STATISTIKA (KPI)
	const totalCategories = initialCategories.length
	const activeCategories = initialCategories.filter(
		c => c.status === 'Faol',
	).length

	// HARAKATLAR
	const handleAddNew = () => {
		setEditingCategory(null)
		setIsSheetOpen(true)
	}

	const handleEdit = (cat: ICategory) => {
		setEditingCategory(cat)
		setIsSheetOpen(true)
	}

	const handleDelete = async (id: string, title: string) => {
		if (confirm(`Rostdan ham "${title}" kategoriyasini o'chirasizmi?`)) {
			setIsPending(true)
			try {
				await deleteCategory(id)
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
			<CategorySheet
				isOpen={isSheetOpen}
				setIsOpen={setIsSheetOpen}
				initialData={editingCategory}
			/>

			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='font-space-grotesk text-3xl font-extrabold text-black tracking-tight mb-2'>
						Kategoriyalar
					</h1>
					<p className='font-montserrat text-sm text-gray-500 font-medium'>
						Do'koningizdagi bo'limlarni yarating va ularga rasm joylang.
					</p>
				</div>
				<div>
					<button
						onClick={handleAddNew}
						className='font-montserrat flex items-center gap-2 rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-all shadow-sm cursor-pointer'
					>
						<Plus className='w-4 h-4' />
						Yangi kategoriya
					</button>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6'>
				<div className='bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex items-center gap-5 hover:border-black/20 transition-all'>
					<div className='w-14 h-14 rounded-[18px] bg-gray-50 flex items-center justify-center border border-gray-100'>
						<LayoutGrid className='w-6 h-6 text-gray-600' />
					</div>
					<div>
						<p className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
							Jami Kategoriyalar
						</p>
						<h3 className='font-space-grotesk text-3xl font-bold text-black'>
							{totalCategories} ta
						</h3>
					</div>
				</div>
				<div className='bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex items-center gap-5 hover:border-black/20 transition-all'>
					<div className='w-14 h-14 rounded-[18px] bg-emerald-50 flex items-center justify-center border border-emerald-100'>
						<FolderTree className='w-6 h-6 text-emerald-600' />
					</div>
					<div>
						<p className='font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
							Faol bo'limlar
						</p>
						<h3 className='font-space-grotesk text-3xl font-bold text-black'>
							{activeCategories} ta
						</h3>
					</div>
				</div>
			</div>

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
							placeholder='Nomi yoki manzilni qidirish...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm font-montserrat'
						/>
					</div>
				</div>

				<div className='overflow-x-auto min-h-[420px] flex flex-col justify-between'>
					<table className='w-full text-left border-collapse'>
						<thead>
							<tr className='bg-gray-50/50 border-b border-gray-100 text-gray-500'>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6 w-20'>
									Rasm
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Kategoriya nomi
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Mahsulotlar
								</th>
								<th className='font-montserrat text-xs font-semibold uppercase tracking-wider py-4 px-6'>
									Holat
								</th>
								<th className='py-4 px-6 text-right'></th>
							</tr>
						</thead>
						<tbody
							className={`divide-y divide-gray-100 font-montserrat transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}
						>
							{filteredCategories.length > 0 ? (
								filteredCategories.map(cat => {
									const isFaol = cat.status === 'Faol'
									return (
										<tr
											key={cat._id}
											className='group hover:bg-gray-50/50 transition-colors'
										>
											<td className='py-4 px-6'>
												<div className='relative w-14 h-14 rounded-[14px] bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm'>
													{cat.image ? (
														<Image
															src={cat.image}
															alt={cat.title}
															fill
															sizes='(max-width: 768px) 56px, 56px'
															className='object-cover'
														/>
													) : (
														<ImageIcon className='w-5 h-5 text-gray-400' />
													)}
												</div>
											</td>
											<td className='py-4 px-6 max-w-[200px] lg:max-w-[300px]'>
												<div className='flex flex-col items-start'>
													<span className='font-space-grotesk text-base font-bold text-gray-900'>
														{cat.title}
													</span>
													{cat.description && (
														<span
															className='font-montserrat text-[13px] text-gray-500 mt-0.5 line-clamp-1 text-pretty'
															title={cat.description}
														>
															{cat.description}
														</span>
													)}
													<span className='flex items-center text-[11px] font-mono text-gray-500 mt-2 hover:text-black transition-colors cursor-pointer w-fit bg-gray-100/70 px-2 py-0.5 rounded-md border border-gray-200/50'>
														<LinkIcon className='w-3 h-3 mr-1' />/{cat.slug}
													</span>
												</div>
											</td>
											<td className='py-4 px-6 whitespace-nowrap'>
												<span
													className={`font-space-grotesk text-sm font-bold ${cat.productCount === 0 ? 'text-red-500' : 'text-black'}`}
												>
													{cat.productCount} ta
												</span>
											</td>
											<td className='py-4 px-6 whitespace-nowrap'>
												<Badge
													variant='outline'
													className={`text-[10px] font-bold px-2.5 py-1 border-none ${isFaol ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
												>
													{cat.status}
												</Badge>
											</td>
											<td className='py-4 px-6 text-right whitespace-nowrap'>
												<div className='flex items-center justify-end gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
													<button
														onClick={() => handleEdit(cat)}
														className='flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 hover:text-black hover:border-black bg-white shadow-sm transition-colors cursor-pointer'
													>
														<Pencil className='w-3.5 h-3.5' />
													</button>
													<button
														onClick={() => handleDelete(cat._id, cat.title)}
														className='flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 bg-white shadow-sm transition-colors cursor-pointer'
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
									<td
										colSpan={5}
										className='py-20 text-center text-sm text-gray-500 font-medium'
									>
										{searchTerm
											? 'Siz qidirgan kategoriya topilmadi.'
											: "Hozircha kategoriyalar yo'q."}
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
