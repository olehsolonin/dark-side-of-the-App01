// src/services/students.js 
import { Types } from 'mongoose';
import { UsersCollection } from '../db/models/student.js';

export const getAllUsers = async () => {
	const users = await UsersCollection.find();
	return users;
};

export const getUserById = async (userId) => {
	if (!Types.ObjectId.isValid(userId)) {
		return null;  // Возвращаем null, если ID невалиден
	}
	const user = await UsersCollection.findById(userId);  // Передаем напрямую userId
	return user;
};

