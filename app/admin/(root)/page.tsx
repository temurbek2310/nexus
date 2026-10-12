import { getAllOrdersAdmin } from '@/lib/actions/order.actions'
import AdminDashboardClient from '../_components/admin-dashboard-client'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
	// Avval yozgan funksiyamizni chaqiramiz
	const result = await getAllOrdersAdmin()

	return (
		<AdminDashboardClient
			orders={result.orders || []}
			stats={
				result.stats || {
					totalOrders: 0,
					newOrders: 0,
					shippingOrders: 0,
					totalRevenue: 0,
				}
			}
		/>
	)
}
