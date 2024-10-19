// src/db/models/student.js 

import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateOptions } from "./hooks.js";

const usersSchema = new Schema(
	{
		name: {
			type: String,
			required: false,
			default: 'user'
		},
		dailyNorm: {
			type: Number,
			required: false,
			default: 1800
		},
		gender: {
			type: String,
			enum: ['Man', 'Woman', 'transformer'],
			default: 'Woman',
			required: false
		},
		email: {
			type: String,
			match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: false,
			default: ''
		}
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

usersSchema.post("save", handleSaveError);

usersSchema.pre("findOneAndUpdate", setUpdateOptions);

usersSchema.post("findOneAndUpdate", handleSaveError);

export const UsersCollection = model('user', usersSchema);

export default UsersCollection;