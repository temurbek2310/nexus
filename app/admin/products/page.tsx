import { getCategories } from '@/lib/actions/category.actions'
import { getProducts } from '@/lib/actions/product.actions'
import { Suspense } from 'react'
import ProductsClient from './_components/ProductsClient'

interface PageProps {
	searchParams: Promise<{ q?: string }>
}

async function ProductsData({ searchParams }: PageProps) {
	const resolvedParams = await searchParams
	const query = resolvedParams?.q || ''

	// DB dan ma'lumotlarni tortish (Promise.all orqali bir vaqtda ikkovini parallel tortamiz, bu tezroq ishlashini ta'minlaydi)
	const [products, categories] = await Promise.all([
		getProducts({ query }),
		getCategories({}), // Kategoriyalar ro'yxati (Forma uchun kerak)
	])

	return (
		<ProductsClient
			initialProducts={products}
			categories={categories}
			query={query}
		/>
	)
}

export default function AdminProductsPage({ searchParams }: PageProps) {
	return (
		<Suspense
			fallback={
				<div className='flex flex-col items-center justify-center min-h-[60vh] space-y-4'>
					<div className='w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin'></div>
					<p className='font-montserrat text-sm font-medium text-gray-500 animate-pulse'>
						Mahsulotlar yuklanmoqda...
					</p>
				</div>
			}
		>
			<ProductsData searchParams={searchParams} />
		</Suspense>
	)
}
