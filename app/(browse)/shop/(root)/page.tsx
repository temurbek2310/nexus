import { getCategories } from '@/lib/actions/category.actions'
import { getProducts } from '@/lib/actions/product.actions'
import ShopClient from '../_components/shop-client'

const ITEMS_PER_PAGE = 15

// 1. MANTIQNI TASHQARIGA OLIB CHIQAMIZ (try...catch shu yerda bo'ladi)
async function fetchShopData(params: any) {
	try {
		const rawProducts = (await getProducts({})) as any[]
		const rawCategories = (await getCategories({})) as any[]

		// 1. Kategoriyalarni tayyorlash
		const activeCategories = rawCategories.filter(c => c.status === 'Faol')
		const formattedCategories = [
			{ title: 'Barchasi', slug: 'barchasi' },
			...activeCategories.map(c => ({
				title: c.title,
				slug: c.slug || c.title.toLowerCase(),
			})),
		]

		// 2. Mahsulotlarni filtrlash
		let validProducts = rawProducts.filter(p => p.status === 'Faol')

		if (params.filterParam === 'sale') {
			validProducts = validProducts.filter(
				p => (p.discountPrice ?? 0) > 0 && p.discountPrice < p.price,
			)
		}

		if (params.q) {
			validProducts = validProducts.filter(p => {
				const brandObj = p.specs?.find(
					(s: any) =>
						s.key.toLowerCase() === 'brend' || s.key.toLowerCase() === 'brand',
				)
				const brand = brandObj?.value.toLowerCase() || ''
				return (
					p.title.toLowerCase().includes(params.q) || brand.includes(params.q)
				)
			})
		}

		if (params.categoryParam !== 'barchasi') {
			validProducts = validProducts.filter(p => {
				const catSlug =
					typeof p.category === 'object' ? p.category?.slug : p.category
				return catSlug?.toLowerCase() === params.categoryParam
			})
		}

		if (params.min > 0) {
			validProducts = validProducts.filter(
				p => (p.discountPrice || p.price) >= params.min,
			)
		}

		if (params.max > 0) {
			validProducts = validProducts.filter(
				p => (p.discountPrice || p.price) <= params.max,
			)
		}

		// 3. Tartiblash (Sorting)
		validProducts.sort((a, b) => {
			const priceA = a.discountPrice || a.price
			const priceB = b.discountPrice || b.price

			switch (params.sort) {
				case 'price-asc':
					return priceA - priceB
				case 'price-desc':
					return priceB - priceA
				case 'name-asc':
					return a.title.localeCompare(b.title)
				case 'name-desc':
					return b.title.localeCompare(a.title)
				case 'newest':
				default:
					return b._id.toString().localeCompare(a._id.toString())
			}
		})

		// 4. Paginatsiya
		const totalPages = Math.ceil(validProducts.length / ITEMS_PER_PAGE)
		const paginated = validProducts.slice(
			(params.currentPage - 1) * ITEMS_PER_PAGE,
			params.currentPage * ITEMS_PER_PAGE,
		)

		// 5. Formatlash
		const formattedProducts = paginated.map(p => {
			const brandObj = p.specs?.find(
				(s: any) =>
					s.key.toLowerCase() === 'brend' || s.key.toLowerCase() === 'brand',
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

		return {
			products: formattedProducts,
			categories: formattedCategories,
			totalCount: validProducts.length,
			totalPages,
			error: null,
		}
	} catch (error) {
		console.error('Sahifani yuklashda xato:', error)
		return {
			products: [],
			categories: [],
			totalCount: 0,
			totalPages: 0,
			error: true,
		}
	}
}

// 2. ASOSIY KOMPONENT (try...catch siz va toza JSX bilan)
export default async function ShopPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const params = await searchParams

	// URL parametrlarini o'qish
	const parsedParams = {
		q: typeof params.q === 'string' ? params.q.toLowerCase() : '',
		categoryParam:
			typeof params.category === 'string'
				? params.category.toLowerCase()
				: 'barchasi',
		min: typeof params.min === 'string' ? Number(params.min) : 0,
		max: typeof params.max === 'string' ? Number(params.max) : 0,
		sort: typeof params.sort === 'string' ? params.sort : 'newest',
		filterParam: typeof params.filter === 'string' ? params.filter : '',
		currentPage: typeof params.page === 'string' ? Number(params.page) : 1,
	}

	// Yordamchi funksiyani chaqiramiz
	const { products, categories, totalCount, totalPages, error } =
		await fetchShopData(parsedParams)

	// Agar xato bo'lsa (Xato JSX ni try...catch ichida emas, bu yerda qaytaramiz)
	if (error) {
		return (
			<div className='text-center py-32 text-red-500 font-bold'>
				Ma'lumotlarni yuklashda xatolik yuz berdi.
			</div>
		)
	}

	// Xatosiz va muvaffaqiyatli Render
	return (
		<ShopClient
			products={products}
			categories={categories}
			totalCount={totalCount}
			totalPages={totalPages}
			currentPage={parsedParams.currentPage}
			currentSort={parsedParams.sort}
		/>
	)
}
