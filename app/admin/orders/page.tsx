import { getAllOrdersAdmin } from '@/lib/actions/order.actions'
import AdminOrdersClient from './_components/admin-orders-client'

export const dynamic = 'force-dynamic' // Har safar yangi ma'lumot olishi uchun

export default async function AdminOrdersPage() {
	const result = await getAllOrdersAdmin()

	return (
		<AdminOrdersClient
			initialOrders={result.orders || []}
			stats={result.stats}
		/>
	)
}
