import { getCoupons } from '@/lib/actions/coupon.actions'
import { Suspense } from 'react'
import CouponsClient from './_components/CouponsClient'

// 1. Ma'lumotlarni tortib oluvchi yordamchi Server Komponent
async function CouponsData() {
	const coupons = await getCoupons()
	return <CouponsClient initialCoupons={coupons} />
}

// 2. Asosiy Sahifa (Foydalanuvchiga darhol ko'rinadi)
export default function AdminCouponsPage() {
	return (
		<Suspense
			fallback={
				// Vercel uslubidagi chiroyli va zamonaviy Loading
				<div className='flex flex-col items-center justify-center min-h-[60vh] space-y-4'>
					<div className='w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin'></div>
					<p className='font-montserrat text-sm font-medium text-gray-500 animate-pulse'>
						Kuponlar yuklanmoqda...
					</p>
				</div>
			}
		>
			<CouponsData />
		</Suspense>
	)
}
