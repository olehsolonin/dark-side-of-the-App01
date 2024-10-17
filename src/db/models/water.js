import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
	{
		date: {
			type: String,
			required: true,
		},
		volume: { type: Number, required: true },
		userId: { type: Schema.Types.ObjectId, ref: 'user', required: true, },
	},
	{ timestamps: true, versionKey: false },
);

export const WaterCollection = model('water', waterSchema);

export default WaterCollection;
