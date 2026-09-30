import { getUserAddresses } from '@/lib/actions/address.actions'
import { auth } from '@clerk/nextjs/server'
import CheckoutClient from './_components/checkout-client'

export default async function CheckoutPage() {
	await auth.protect()
	let initialAddresses = []

	try {
		initialAddresses = await getUserAddresses()
	} catch (error) {
		console.error('Manzillarni yuklashda xatolik:', error)
	}

	return <CheckoutClient initialAddresses={initialAddresses} />
}
