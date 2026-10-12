import { getUserOrders } from '@/lib/actions/order.actions'
import OrdersClient from './_components/orders-client'

export default async function OrdersPage() {
	const orders = await getUserOrders()

	return <OrdersClient initialOrders={orders} />
}
