// src/db/models/student.js 

import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			default: 'user'
		},
		dailyWaterIntake: {
			type: Number,
			required: false,
			default: 1800
		},
		gender: {
			type: String,
			enum: ['male', 'female', ''],
			default: 'female',
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
		},
		weight: {
			type: Number,
			required: false,
		},
		activity: {
			type: Number,
			required: false,
		}
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const UsersCollection = model('user', usersSchema);

export default UsersCollection;