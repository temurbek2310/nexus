import { Schema, model, models } from 'mongoose'

const AddressSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		type: { type: String, enum: ['Uy', 'Ishxona', 'Boshqa'], default: 'Uy' },
		isDefault: { type: Boolean, default: false },
		recipient: { type: String, required: true },
		phone: { type: String, required: true },
		region: { type: String, required: true },
		fullAddress: { type: String, required: true },
	},
	{ timestamps: true },
)

const Address = models.Address || model('Address', AddressSchema)

export default Address
