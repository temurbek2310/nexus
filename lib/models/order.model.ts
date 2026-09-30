import { Schema, model, models } from 'mongoose'

const OrderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
		items: [
			{
				product: { type: Schema.Types.ObjectId, ref: 'Product' },
				name: { type: String, required: true },
				brand: { type: String, required: true },
				price: { type: Number, required: true },
				quantity: { type: Number, required: true },
				image: { type: String },
			},
		],
		subtotal: { type: Number, required: true },
		tax: { type: Number, required: true },
		shipping: { type: Number, required: true },
		total: { type: Number, required: true },
		savings: { type: Number, default: 0 },
		paymentStatus: {
			type: String,
			enum: ['Kutilmoqda', "To'landi", 'Xatolik'],
			default: 'Kutilmoqda',
		},
		orderStatus: {
			type: String,
			enum: [
				'Yangi',
				'Tayyorlanmoqda',
				"Yo'lda",
				'Yetkazib berildi',
				'Bekor qilingan',
			],
			default: 'Yangi',
		},
		stripeSessionId: { type: String },
	},
	{ timestamps: true },
)

const Order = models.Order || model('Order', OrderSchema)

export default Order
