import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '@/interfaces';

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: {
				values: ['ADMIN', 'CLIENT'],
				message: '{VALUE} is not valid',
				default: 'CLIENT',
				required: true,
			},
		},
	},
	{ timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
