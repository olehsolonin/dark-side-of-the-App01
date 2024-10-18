// src/server.js

import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { UPLOAD_DIR } from './constants/index.js';
import authRouter from './routers/auth.js';

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
	app.use('/auth', authRouter);

	app.use('/uploads', express.static(UPLOAD_DIR));

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
