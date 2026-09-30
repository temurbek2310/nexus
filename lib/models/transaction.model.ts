import { Schema, model, models } from 'mongoose'

const TransactionSchema = new Schema(
	{
		order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		stripePaymentIntentId: { type: String, required: true },
		amount: { type: Number, required: true },
		currency: { type: String, default: 'usd' },
		status: {
			type: String,
			enum: ['success', 'pending', 'failed'],
			default: 'pending',
		},
		// YANGI QO'SHILGAN MAYDONLAR:
		receiptUrl: { type: String }, // Stripe'ning tayyor PDF kvitansiya havolasi
		cardBrand: { type: String }, // Masalan: "visa", "mastercard"
		cardLast4: { type: String }, // Masalan: "4242"
	},
	{ timestamps: true },
)

const Transaction =
	models.Transaction || model('Transaction', TransactionSchema)

export default Transaction
