// src/db/models/student.js 

import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ['male', 'female', 'other'],
		},
		avgMark: {
			type: Number,
			required: true,
		},
		onDuty: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const UsersCollection = model('users', usersSchema);

export default UsersCollection;