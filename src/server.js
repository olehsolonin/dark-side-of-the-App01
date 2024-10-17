// src/server.js

import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllUsers, getUserById } from './services/users.js';


const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
	const app = express();

	app.use(express.json());
	app.use(cors());

	// app.use(
	// 	pino({
	// 		transport: {
	// 			target: 'pino-pretty',
	// 		},
	// 	}),
	// );

	app.get('/users', async (req, res) => {
		const users = await getAllUsers();

		res.status(200).json({
			data: users,
		});
	});
	app.get('/users/:userId', async (req, res, next) => {
		console.log(req.params);
		const { userId } = req.params;
		const user = await getUserById(userId);

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		res.status(200).json({ data: user });
	});




	app.use('*', (req, res, next) => {
		res.status(404).json({
			message: 'Not found',
		});
	});

	app.use((err, req, res, next) => {
		res.status(500).json({
			message: 'Something went wrong',
			error: err.message,
		});
	});

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};
