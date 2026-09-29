import { getCategories } from '@/lib/actions/category.actions'
import { Loader2 } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import { Suspense } from 'react'
import CatalogClient, { CatalogCategory } from './CatalogClient'

// Backend'dan qaytadigan Kategoriya tipi
interface IBackendCategory {
	_id: { toString: () => string } | string
	title: string
	slug: string
	status: string
	description?: string
	image?: string | null
}

// 1. MA'LUMOTNI TORTISH VA FORMATLASH (ESLint qoidalariga mos)
async function fetchAndFormatCatalog(): Promise<{
	categories: CatalogCategory[]
	error: string | null
}> {
	try {
		const allCategories = (await getCategories({})) as IBackendCategory[]

		if (!allCategories || allCategories.length === 0) {
			return { categories: [], error: null }
		}

		// Faqat "Faol" kategoriyalarni ajratib olamiz
		const activeCategories = allCategories.filter(c => c.status === 'Faol')

		// UI formatiga to'g'rilaymiz
		const formattedCategories: CatalogCategory[] = activeCategories.map(
			(c, index) => {
				return {
					id: c._id.toString(),
					num: (index + 1).toString().padStart(2, '0'), // 1 -> '01', 2 -> '02'
					title: c.title,
					description:
						c.description ||
						"Kategoriya bo'yicha eng yaxshi mahsulotlar to'plami.",
					image: c.image || '/placeholder.png',
					theme: index % 2 === 0 ? 'dark' : 'light', // Juft/toq indekslarga qarab Dark/Light beriladi
					slug: c.slug,
				}
			},
		)

		return { categories: formattedCategories, error: null }
	} catch (err: unknown) {
		console.error('Catalog yuklashda xatolik:', err)
		const errorMessage =
			err instanceof Error
				? err.message
				: "Katalog ma'lumotlarini yuklashda xatolik yuz berdi"
		return { categories: [], error: errorMessage }
	}
}

// 2. KESHLANGAN CHAQIRUVCHI FUNKSIYA (Har 1 soatda yangilanadi)
const getCachedCatalog = unstable_cache(
	async () => {
		return await fetchAndFormatCatalog()
	},
	['home-catalog-v1'], // Kesh kaliti
	{ revalidate: 3600 },
)

// 3. ASOSIY MA'LUMOT KUTUVCHI KOMPONENT
const CatalogData = async () => {
	const { categories, error } = await getCachedCatalog()

	if (error) {
		return (
			<div className='py-10 text-center text-red-500 font-bold border border-red-200 bg-red-50 m-10 rounded-xl max-w-4xl mx-auto'>
				Katalogni yuklashda xatolik yuz berdi: {error}
			</div>
		)
	}

	if (categories.length === 0) return null

	return <CatalogClient categories={categories} />
}

// 4. SUSPENSE BILAN O'RALGAN EXPORT
export default function Catalog() {
	return (
		<Suspense
			fallback={
				<section className='relative pt-32 pb-24 overflow-hidden'>
					<div className='w-full py-32 flex flex-col items-center justify-center gap-3 text-gray-400'>
						<Loader2 className='w-8 h-8 animate-spin' />
						<p className='font-montserrat text-sm'>Katalog yuklanmoqda...</p>
					</div>
				</section>
			}
		>
			<CatalogData />
		</Suspense>
	)
}
