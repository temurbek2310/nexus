import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema(
	{
		title: { type: String, required: true },
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
		price: { type: Number, required: true },
		discountPrice: { type: Number, default: null },
		description: { type: String, required: true },
		stock: { type: Number, required: true, default: 0 }, // YANGLIK: Mahsulot soni
		images: [{ type: String }], // Rasmlar URL manzilidan iborat ro'yxat (array)
		specs: [
			{
				key: { type: String },
				value: { type: String },
			},
		], // Dinamik xususiyatlar (Kamera: 4/3 CMOS)
		status: {
			type: String,
			enum: ['Faol', 'Qolmagan', 'Qoralama'],
			default: 'Faol',
		},
	},
	{ timestamps: true },
)

const Product = models.Product || model('Product', ProductSchema)

export default Product
