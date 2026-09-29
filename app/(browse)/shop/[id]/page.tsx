import { getProductById } from '@/lib/actions/product.actions'
import { notFound } from 'next/navigation'
import ProductDetailsClient from '../_components/product-details-client'

// 1. BEKENDDAN KELADIGAN MA'LUMOT TIPI
interface BackendProduct {
	_id: { toString: () => string } | string
	title: string
	description?: string
	price: number
	discountPrice?: number | null
	images?: string[]
	category?: { title: string } | string
	specs?: { key: string; value: string }[]
	status: string
}

// 2. CLIENT UCHUN KETADIGAN MA'LUMOT TIPI (TS2304 xatosini oldini olish uchun shu yerda yozildi)
interface FormattedProduct {
	id: string
	brand: string
	name: string
	description: string
	price: number
	oldPrice: number | null
	category: string
	images: string[]
	specs: { key: string; value: string }[]
}

// 3. MA'LUMOT TORTISH FUNKSIYASI (ESLint error-boundaries xatosini bartaraf qiladi)
async function fetchProductData(
	id: string,
): Promise<{ product: FormattedProduct | null; error: boolean }> {
	try {
		const rawProduct = (await getProductById(id)) as BackendProduct

		// Agar mahsulot topilmasa yoki faol bo'lmasa, null qaytaramiz
		if (!rawProduct || rawProduct.status !== 'Faol') {
			return { product: null, error: false }
		}

		// Brendni xususiyatlar ichidan izlab topish
		const brandObj = rawProduct.specs?.find(
			s => s.key.toLowerCase() === 'brend' || s.key.toLowerCase() === 'brand',
		)

		// Kategoriyani formatlash
		const categoryName =
			typeof rawProduct.category === 'object' && rawProduct.category !== null
				? rawProduct.category.title
				: (rawProduct.category as string) || 'Umumiy'

		// Client ga ketadigan ma'lumotni tayyorlaymiz
		const formattedProduct: FormattedProduct = {
			id: rawProduct._id.toString(),
			brand: brandObj?.value || 'NEXUS',
			name: rawProduct.title,
			description:
				rawProduct.description ||
				'Bu mahsulot uchun hozircha tavsif kiritilmagan.',
			price: rawProduct.discountPrice || rawProduct.price,
			oldPrice: rawProduct.discountPrice ? rawProduct.price : null,
			category: categoryName,
			images:
				rawProduct.images && rawProduct.images.length > 0
					? rawProduct.images
					: ['/placeholder.png'],
			specs: rawProduct.specs || [],
		}

		return { product: formattedProduct, error: false }
	} catch (error) {
		console.error('Mahsulotni yuklashda xatolik:', error)
		return { product: null, error: true }
	}
}

// 4. ASOSIY KOMPONENT (try...catch ishlatilmaydi, to'g'ridan to'g'ri JSX qaytariladi)
export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	const { product, error } = await fetchProductData(id)

	// Agar xatolik bo'lsa yoki mahsulot topilmasa - 404 (Topilmadi) sahifasini ko'rsatamiz
	if (error || !product) {
		return notFound()
	}

	// Muvaffaqiyatli Render (as any orqali TS interfeys to'qnashuvlari chetlab o'tiladi)
	return <ProductDetailsClient product={product} />
}
