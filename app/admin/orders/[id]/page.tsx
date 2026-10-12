import { getOrderByIdAdmin } from '@/lib/actions/order.actions'
import { redirect } from 'next/navigation'
import AdminOrderDetailsClient from './_components/admin-order-details-client'

export const dynamic = 'force-dynamic'

export default async function AdminOrderDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const data = await getOrderByIdAdmin(id)

	if (!data || !data.order) {
		redirect('/admin/orders')
	}

	return (
		<AdminOrderDetailsClient
			initialOrder={data.order}
			transaction={data.transaction}
		/>
	)
}
