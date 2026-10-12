import Transaction from '@/lib/models/transaction.model'
import { connectToDatabase } from '@/lib/mongoose'
import PaymentsClient from './_components/payments-client'

export const dynamic = 'force-dynamic'

export default async function AdminPaymentsPage() {
	await connectToDatabase()

	// Bazadan barcha tranzaksiyalarni olib kelamiz
	const transactionsRaw = await Transaction.find()
		.populate({
			path: 'order',
			select: 'items total',
		})
		.sort({ createdAt: -1 })
		.lean()

	// Client uchun ma'lumotlarni moslaymiz
	let totalRevenue = 0
	let pendingAmount = 0
	let refundedAmount = 0

	const transactions = transactionsRaw.map((txn: any) => {
		const amount = txn.amount || 0
		if (txn.status === 'success') totalRevenue += amount
		if (txn.status === 'pending') pendingAmount += amount
		if (txn.status === 'refunded') refundedAmount += amount

		// Tavsifni buyurtma ma'lumotidan yoki bazadagidan olamiz
		const firstItem = txn.order?.items?.[0]?.name || 'Onlayn xarid'
		const itemsCount = txn.order?.items?.length || 1
		const description = `${firstItem} ${itemsCount > 1 ? `va yana ${itemsCount - 1} ta mahsulot` : ''}`

		// Statusni o'zbekchaga o'giramiz
		let uzStatus = 'Muvaffaqiyatli'
		if (txn.status === 'pending') uzStatus = 'Kutilmoqda'
		if (txn.status === 'refunded' || txn.status === 'failed')
			uzStatus = 'Qaytarildi'

		const d = new Date(txn.createdAt)
		const months = [
			'Yan',
			'Fev',
			'Mar',
			'Apr',
			'May',
			'Iyn',
			'Iyl',
			'Avg',
			'Sen',
			'Okt',
			'Noy',
			'Dek',
		]
		const dateFormatted = `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`

		return {
			id: `INV-${txn._id.toString().slice(-6).toUpperCase()}`,
			date: dateFormatted,
			amount: amount,
			status: uzStatus,
			description: description,
			receiptUrl: txn.receiptUrl || '',
		}
	})

	const netProfit = totalRevenue - refundedAmount

	const stats = {
		totalRevenue,
		pendingAmount,
		refundedAmount,
		netProfit,
	}

	return <PaymentsClient transactions={transactions} stats={stats} />
}
