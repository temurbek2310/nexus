import { getOrderById } from '@/lib/actions/order.actions'
import { redirect } from 'next/navigation'
import OrderDetailsClient from './_components/order-details-client'

export default async function OrderDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const data = await getOrderById(id)

	// Agar buyurtma topilmasa yoki boshqa odamniki bo'lsa, ro'yxatga qaytarib yuboramiz
	if (!data || !data.order) {
		redirect('/dashboard/orders')
	}

	return (
		<OrderDetailsClient order={data.order} transaction={data.transaction} />
	)
}
