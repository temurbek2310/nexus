import { getProducts } from '@/lib/actions/product.actions'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import CoolestGadgetsClient, { Gadget } from './CoolestGadgetsClient'

// 1. TIPLAR (any larni o'rniga)
interface IBackendProduct {
	_id: { toString: () => string } | string
	title: string
	status: string
	price: number
	discountPrice?: number | null
	images?: string[]
	specs?: { key: string; value: string }[]
}

// 2. MANTIQ REACT KOMPONENTIDAN TASHQARIGA OLIB CHIQILDI
async function fetchAndFormatCoolestGadgets(): Promise<{
	gadgets: Gadget[]
	error: string | null
}> {
	try {
		const allProducts = (await getProducts({})) as IBackendProduct[]

		if (!allProducts || allProducts.length === 0) {
			return { gadgets: [], error: null }
		}

		// Faqat Faol holatdagilarni ajratamiz
		const activeProducts = allProducts.filter(p => p.status === 'Faol')

		// Qimmat narxdan arzonga qarab saralaymiz
		activeProducts.sort((a, b) => {
			const priceA = a.discountPrice ?? a.price
			const priceB = b.discountPrice ?? b.price
			return priceB - priceA
		})

		// Eng qimmat 7 tasini olamiz
		const top7 = activeProducts.slice(0, 7)

		// Client uchun formatlash
		const formattedGadgets: Gadget[] = top7.map(p => {
			const brandObj = p.specs?.find(
				s => s.key.toLowerCase() === 'brend' || s.key.toLowerCase() === 'brand',
			)
			const finalPrice = p.discountPrice || p.price

			return {
				id: p._id.toString(),
				brand: brandObj?.value || 'NEXUS',
				name: p.title,
				price: finalPrice.toString(),
				// MANA SHU QATOR QO'SHILADI:
				oldPrice: p.discountPrice ? p.price.toString() : null,
				image:
					p.images && p.images.length > 0 ? p.images[0] : '/placeholder.png',
			}
		})

		return { gadgets: formattedGadgets, error: null }
	} catch (err: unknown) {
		console.error('CoolestGadgets xatoligi:', err)
		const errorMessage =
			err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi"
		return { gadgets: [], error: errorMessage }
	}
}

// 3. ASOSIY KOMPONENT (Toza holatda)
const CoolestGadgetsData = async () => {
	const { gadgets, error } = await fetchAndFormatCoolestGadgets()

	if (error) {
		return (
			<div className='py-10 text-center text-red-500 font-bold border border-red-200 bg-red-50 m-10 rounded-xl'>
				Gadjetlarni yuklashda xatolik yuz berdi: {error}
			</div>
		)
	}

	if (gadgets.length === 0) return null

	return <CoolestGadgetsClient gadgets={gadgets} />
}

export default function CoolestGadgets() {
	return (
		<Suspense
			fallback={
				<div className='w-full py-32 flex flex-col items-center justify-center gap-3 text-gray-400 bg-white border-b border-gray-200'>
					<Loader2 className='w-8 h-8 animate-spin' />
					<p className='font-montserrat text-sm'>
						Innovatsion gadjetlar yuklanmoqda...
					</p>
				</div>
			}
		>
			<CoolestGadgetsData />
		</Suspense>
	)
}
