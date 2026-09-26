import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
	{
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			unique: true,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		photo: {
			type: String,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		// E-commerce uchun qo'shimcha maydonlar (Kelajakda kerak bo'ladi)
		savedProducts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{
		timestamps: true, // createdAt va updatedAt avtomatik qo'shiladi
	},
)

// Agar model oldin yaratilgan bo'lsa o'shani ishlatadi, bo'lmasa yangi yaratadi (Next.js xatosini oldini olish uchun)
const User = models.User || model('User', UserSchema)

export default User
