import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true, // Slug doim takrorlanmas bo'lishi kerak
		},
		image: {
			type: String,
			default: null, // Rasm bo'lmasligi ham mumkin
		},
		productCount: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			enum: ['Faol', 'Faol emas'],
			default: 'Faol',
		},
	},
	{
		timestamps: true,
	},
)

const Category = models.Category || model('Category', CategorySchema)

export default Category
