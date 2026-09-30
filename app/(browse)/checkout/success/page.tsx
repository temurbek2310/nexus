import { Suspense } from 'react'
import SuccessClient from './_components/success-client'

export default function CheckoutSuccessPage() {
	return (
		<Suspense
			fallback={
				<div className='min-h-screen bg-[#FAFAFA] flex items-center justify-center font-montserrat'>
					<div className='flex flex-col items-center gap-4'>
						<div className='w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin'></div>
						<p className='text-gray-600 font-medium'>Yuklanmoqda...</p>
					</div>
				</div>
			}
		>
			<SuccessClient />
		</Suspense>
	)
}
