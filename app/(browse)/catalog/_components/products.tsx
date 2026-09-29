import { getProducts } from '@/lib/actions/product.actions'
import { Loader2 } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import { Suspense } from 'react'
import ProductsClient, { Product } from './ProductsClient'

// Backend tipizatsiyasi
interface IBackendProduct {
	_id: { toString: () => string } | string
	title: string
	status: string
	price: number
	discountPrice?: number | null
	images?: string[]
	category?: { _id?: string | { toString: () => string } } | string | null
	specs?: { key: string; value: string }[]
}

// 1. ESLint qoidalarini buzmaydigan, toza Server Mantiq
async function fetchAndFormatProducts(): Promise<{
	products: Product[]
	error: string | null
}> {
	try {
		const allProducts = (await getProducts({})) as IBackendProduct[]

		if (!allProducts || allProducts.length === 0) {
			return { products: [], error: null }
		}

		// Faqat faol mahsulotlarni ajratib olamiz
		const valid = allProducts.filter(p => p.status === 'Faol')

		// Avval hamma ma'lumotni aralashtiramiz (har safar turli xil chiqishi uchun)
		for (let i = valid.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[valid[i], valid[j]] = [valid[j], valid[i]]
		}

		const selected: IBackendProduct[] = []
		const categoryCounts: Record<string, number> = {}

		// 1-bosqich: Har xil kategoriyalardan eng ko'pi bilan 2 tadan tanlab olamiz (Xilma-xillik uchun)
		for (const p of valid) {
			const catId =
				typeof p.category === 'object' && p.category?._id
					? p.category._id.toString()
					: p.category?.toString() || 'no-category'

			if ((categoryCounts[catId] || 0) < 2) {
				selected.push(p)
				categoryCounts[catId] = (categoryCounts[catId] || 0) + 1
			}

			if (selected.length === 12) break
		}

		// 2-bosqich: Agar kategoriyalar kamligi sabab 12 ta to'lmasa, qolgan ixtiyoriy narsalarni qo'shamiz
		if (selected.length < 12) {
			for (const p of valid) {
				if (!selected.find(s => s._id.toString() === p._id.toString())) {
					selected.push(p)
				}
				if (selected.length === 12) break
			}
		}

		// Client qismi kutayotgan UI interfeysiga formatlaymiz
		const formattedProducts: Product[] = selected.map(p => {
			const brandObj = p.specs?.find(
				s => s.key.toLowerCase() === 'brend' || s.key.toLowerCase() === 'brand',
			)

			return {
				id: p._id.toString(),
				brand: brandObj?.value || 'NEXUS',
				name: p.title,
				oldPrice: p.discountPrice ? p.price.toString() : null,
				price: (p.discountPrice || p.price).toString(),
				image:
					p.images && p.images.length > 0 ? p.images[0] : '/placeholder.png',
			}
		})

		return { products: formattedProducts, error: null }
	} catch (err: unknown) {
		console.error('Barcha mahsulotlarni yuklashda xatolik:', err)
		const errorMessage =
			err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi"
		return { products: [], error: errorMessage }
	}
}

// 2. Keshlovchi funksiya (soatiga yangilanadi)
const getCachedProducts = unstable_cache(
	async () => {
		return await fetchAndFormatProducts()
	},
	['home-all-products-v1'],
	{ revalidate: 3600 },
)

// 3. Asosiy Data render qismi
const ProductsData = async () => {
	const { products, error } = await getCachedProducts()

	if (error) {
		return (
			<div className='py-10 text-center text-red-500 font-bold border border-red-200 bg-red-50 m-10 rounded-xl'>
				Mahsulotlarni yuklashda xatolik yuz berdi: {error}
			</div>
		)
	}

	if (products.length === 0) return null

	return <ProductsClient products={products} />
}

export default function Products() {
	return (
		<Suspense
			fallback={
				<div className='w-full py-32 flex flex-col items-center justify-center gap-3 text-gray-400 bg-white border-t border-gray-200'>
					<Loader2 className='w-8 h-8 animate-spin' />
					<p className='font-montserrat text-sm'>Mahsulotlar yuklanmoqda...</p>
				</div>
			}
		>
			<ProductsData />
		</Suspense>
	)
}
