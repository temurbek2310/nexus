import { getUserAddresses } from '@/lib/actions/address.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import AddressesClient from './_components/AddressesClient'

// 1. Ma'lumotlarni va foydalanuvchini aniqlovchi Ichki Server Komponent
async function AddressesDataFetcher() {
	const { userId } = await auth()

	if (!userId) {
		redirect('/')
	}

	const addresses = await getUserAddresses(userId)

	return <AddressesClient initialAddresses={addresses} clerkId={userId} />
}

// 2. Asosiy Sahifa (Static Qobiq)
export default function AddressesPage() {
	return (
		// auth() va bazaga so'rov ketayotgan vaqtda chiroyli Vercel-style skeleton chiqib turadi
		<Suspense
			fallback={
				<div className='flex flex-col gap-6 pb-10 pt-4 animate-pulse'>
					<div className='h-8 w-48 bg-gray-200 rounded-md'></div>
					<div className='h-4 w-64 bg-gray-100 rounded-md mt-2'></div>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-4'>
						<div className='h-48 w-full bg-gray-100 rounded-xl border border-gray-200'></div>
						<div className='h-48 w-full bg-gray-100 rounded-xl border border-gray-200 hidden md:block'></div>
						<div className='h-48 w-full bg-gray-100 rounded-xl border border-gray-200 hidden xl:block'></div>
					</div>
				</div>
			}
		>
			<AddressesDataFetcher />
		</Suspense>
	)
}
