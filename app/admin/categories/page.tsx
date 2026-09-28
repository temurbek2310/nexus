import { getCategories } from '@/lib/actions/category.actions'
import { Suspense } from 'react'
import CategoriesClient from './_components/CategoriesClient'

interface PageProps {
	searchParams: Promise<{ q?: string }>
}

async function CategoriesData({ searchParams }: PageProps) {
	const resolvedParams = await searchParams
	const query = resolvedParams?.q || ''

	// DB dan ma'lumotlarni tortish
	const categories = await getCategories({ query })

	return <CategoriesClient initialCategories={categories} query={query} />
}

export default function AdminCategoriesPage({ searchParams }: PageProps) {
	return (
		<Suspense
			fallback={
				<div className='flex flex-col items-center justify-center min-h-[60vh] space-y-4'>
					<div className='w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin'></div>
					<p className='font-montserrat text-sm font-medium text-gray-500 animate-pulse'>
						Kategoriyalar yuklanmoqda...
					</p>
				</div>
			}
		>
			<CategoriesData searchParams={searchParams} />
		</Suspense>
	)
}
