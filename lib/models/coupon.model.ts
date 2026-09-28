import { Schema, model, models } from 'mongoose'

const couponSchema = new Schema(
	{
		code: { type: String, required: true, unique: true, uppercase: true },
		type: { type: String, enum: ['Foyiz', 'Summa'], required: true },
		value: { type: Number, required: true },
		usageCount: { type: Number, default: 0 },
		usageLimit: { type: Number, default: null }, // Null bo'lsa cheksiz
		expiryDate: { type: Date, required: true },
		status: {
			type: String,
			enum: ['Faol', "Muddat o'tgan", "To'xtatilgan"],
			default: 'Faol',
		},
	},
	{ timestamps: true },
)

const Coupon = models.Coupon || model('Coupon', couponSchema)
export default Coupon
