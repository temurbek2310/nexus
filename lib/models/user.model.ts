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
			sparse: true, // Unique bo'lsa-da, null/undefined qiymatlarda xato bermasligi uchun
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
		savedProducts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{
		timestamps: true,
	},
)

const User = models.User || model('User', UserSchema)

export default User
