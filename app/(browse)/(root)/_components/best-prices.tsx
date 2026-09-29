import { getProducts } from '@/lib/actions/product.actions'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import BestPricesClient, { Product } from './BestPricesClient'

// 1. TIPLAR (any larni o'rniga)
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

// 2. MANTIQ REACT KOMPONENTIDAN TASHQARIGA OLIB CHIQILDI
// Bu Math.random() va try...catch errorlarini yo'qotadi
async function fetchAndFormatBestPrices(): Promise<{
	products: Product[]
	error: string | null
}> {
	try {
		const allProducts = (await getProducts({})) as IBackendProduct[]

		if (!allProducts || allProducts.length === 0) {
			return { products: [], error: null }
		}

		let valid = allProducts.filter(
			p => p.status === 'Faol' && (p.discountPrice ?? 0) > 0,
		)

		if (valid.length < 7) {
			const others = allProducts.filter(
				p => p.status === 'Faol' && !p.discountPrice,
			)
			valid = [...valid, ...others]
		}

		// Aralashtirish
		for (let i = valid.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[valid[i], valid[j]] = [valid[j], valid[i]]
		}

		const selected: IBackendProduct[] = []
		const seenCategories = new Set<string>()

		for (const p of valid) {
			const catId =
				typeof p.category === 'object' && p.category?._id
					? p.category._id.toString()
					: p.category?.toString() || 'no-category'

			if (!seenCategories.has(catId)) {
				selected.push(p)
				seenCategories.add(catId)
			}
			if (selected.length === 7) break
		}

		if (selected.length < 7) {
			for (const p of valid) {
				if (!selected.find(s => s._id.toString() === p._id.toString())) {
					selected.push(p)
				}
				if (selected.length === 7) break
			}
		}

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
		console.error('BestPrices xatoligi:', err)
		const errorMessage =
			err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi"
		return { products: [], error: errorMessage }
	}
}

// 3. ASOSIY KOMPONENT (Toza holatda)
const BestPricesData = async () => {
	// Try...catch JSX ichida emas, tashqaridagi funksiyada bajarildi
	const { products, error } = await fetchAndFormatBestPrices()

	// Agar xatolik bo'lsa
	if (error) {
		return (
			<div className='py-10 text-center text-red-500 font-bold border border-red-200 bg-red-50 m-10 rounded-xl'>
				Qaynoq takliflarni yuklashda xatolik yuz berdi: {error}
			</div>
		)
	}

	// Agar ma'lumot bo'lmasa
	if (products.length === 0) return null

	// Muvaffaqiyatli holat
	return <BestPricesClient products={products} />
}

export default function BestPrices() {
	return (
		<Suspense
			fallback={
				<div className='w-full py-32 flex flex-col items-center justify-center gap-3 text-gray-400 bg-white border-b border-gray-200'>
					<Loader2 className='w-8 h-8 animate-spin' />
					<p className='font-montserrat text-sm'>
						Qaynoq takliflar yuklanmoqda...
					</p>
				</div>
			}
		>
			<BestPricesData />
		</Suspense>
	)
}
