import { getProducts } from '@/lib/actions/product.actions'
import { Loader2 } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import { Suspense } from 'react'
import DiscountProductsClient, {
	DiscountProduct,
} from './discount-products-client'

interface IBackendProduct {
	_id: { toString: () => string } | string
	title: string
	status: string
	price: number
	discountPrice?: number | null
	images?: string[]
	specs?: { key: string; value: string }[]
}

async function fetchDiscountedProducts(): Promise<{
	products: DiscountProduct[]
	error: string | null
}> {
	try {
		const allProducts = (await getProducts({})) as IBackendProduct[]

		if (!allProducts || allProducts.length === 0) {
			return { products: [], error: null }
		}

		// Faqat faol va chegirmasi bor mahsulotlarni ajratamiz
		const discountedProducts = allProducts.filter(
			p =>
				p.status === 'Faol' &&
				(p.discountPrice ?? 0) > 0 &&
				p.discountPrice! < p.price,
		)

		// Chegirma FOIZIGA qarab eng kattasini birinchiga o'tkazamiz
		discountedProducts.sort((a, b) => {
			const discountA = ((a.price - a.discountPrice!) / a.price) * 100
			const discountB = ((b.price - b.discountPrice!) / b.price) * 100
			return discountB - discountA
		})

		// Eng zo'r 7 ta chegirmali mahsulotni olamiz
		const top7 = discountedProducts.slice(0, 7)

		const formattedProducts: DiscountProduct[] = top7.map((p, index) => {
			const brandObj = p.specs?.find(
				s => s.key.toLowerCase() === 'brend' || s.key.toLowerCase() === 'brand',
			)

			let tagText = undefined
			if (index === 0) tagText = 'Eng katta chegirma'
			else if (index === 3) tagText = 'Yozgi taklif'
			else if (index === 6) tagText = 'Yangi'

			return {
				id: p._id.toString(),
				brand: brandObj?.value || 'NEXUS',
				name: p.title,
				oldPrice: p.price,
				price: p.discountPrice!,
				image:
					p.images && p.images.length > 0 ? p.images[0] : '/placeholder.png',
				tag: tagText,
			}
		})

		return { products: formattedProducts, error: null }
	} catch (err: unknown) {
		console.error('DiscountProducts yuklashda xatolik:', err)
		const errorMessage = err instanceof Error ? err.message : "Noma'lum xato"
		return { products: [], error: errorMessage }
	}
}

const getCachedDiscountedProducts = unstable_cache(
	async () => {
		return await fetchDiscountedProducts()
	},
	['discounts-page-data-v1'],
	{ revalidate: 3600 },
)

const DiscountProductsData = async () => {
	const { products, error } = await getCachedDiscountedProducts()

	if (error) {
		return (
			<div className='py-10 text-center text-red-500 font-bold border border-red-200 bg-red-50 m-10 rounded-xl'>
				Chegirmalarni yuklashda xatolik yuz berdi: {error}
			</div>
		)
	}

	if (products.length === 0) return null

	return <DiscountProductsClient products={products} />
}

export default function DiscountProducts() {
	return (
		<Suspense
			fallback={
				<div className='w-full py-32 flex flex-col items-center justify-center gap-3 text-gray-400 bg-[#FAFAFA]'>
					<Loader2 className='w-8 h-8 animate-spin' />
					<p className='font-montserrat text-sm'>
						Qaynoq chegirmalar yuklanmoqda...
					</p>
				</div>
			}
		>
			<DiscountProductsData />
		</Suspense>
	)
}
