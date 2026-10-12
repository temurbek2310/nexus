import { getUserOrders } from '@/lib/actions/order.actions'
import { currentUser } from '@clerk/nextjs/server'
import UserDashboardClient from '../_components/user-dashboard-client'

export const dynamic = 'force-dynamic'

export default async function UserDashboardPage() {
	// 1. Bazadan faqat shu foydalanuvchining buyurtmalarini olamiz
	const orders = await getUserOrders()

	// Clerk orqali joriy mijozning ismini olamiz
	const user = await currentUser()
	const firstName = user?.firstName || 'Mijoz'

	// 2. Statistikani real ma'lumotlar asosida hisoblaymiz
	let totalSpent = 0
	let activeOrders = 0
	let completedOrders = 0

	orders.forEach((order: any) => {
		// Agar bekor qilinmagan bo'lsa va to'langan bo'lsa, xarajatga qo'shamiz
		if (order.paymentStatus === "To'landi") {
			totalSpent += order.total
		}

		// Statuslarga qarab sanaymiz
		const status = order.orderStatus || 'Yangi'
		if (
			['Yangi', 'Tayyorlanmoqda', 'Qadoqlanmoqda', "Yo'lda"].includes(status)
		) {
			activeOrders++
		} else if (status === 'Yetkazib berildi') {
			completedOrders++
		}
	})

	const stats = {
		totalSpent,
		activeOrders,
		completedOrders,
		totalSaved: 0, // Agar wishlist (saqlanganlar) bazangiz bo'lsa, shu yerda hisoblaysiz
	}

	return (
		<UserDashboardClient orders={orders} stats={stats} firstName={firstName} />
	)
}
