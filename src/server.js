// src/server.js
import cookieParser from 'cookie-parser';
import express from 'express';
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { UPLOAD_DIR } from './constants/index.js';
import authRouter from './routers/auth.js';
import waterRouter from './routers/water.js';
import userRouter from './routers/users.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
	const app = express();

	app.use(express.json());
	app.use(cors());
	app.use(cookieParser());

	// app.use(
	// 	pino({
	// 		transport: {
	// 			target: 'pino-pretty',
	// 		},
	// 	}),
	// );
	app.use('/auth', authRouter);
	app.use('/users', userRouter);
	app.use('/water', waterRouter);
	app.use('/uploads', express.static(UPLOAD_DIR));

	app.use(notFoundHandler);
	app.use(errorHandler);

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};
