import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { randomBytes } from "crypto";
import { accessTokenLifetime, refreshTokenLifetime } from "../constants/users.js";

import SessionCollection from "../db/models/session.js";
import authUserModel from "../db/models/auth-user.js";

export const signup = async (payload) => {
	const { email, password } = payload;
	const user = await authUserModel.findOne({ email });
	if (user) {
		throw createHttpError(409, "Email already exist");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const data = await authUserModel.create({ ...payload, password: hashPassword });
	delete data._doc.password;

	return data._doc;
};

export const signin = async (payload) => {
	const { email, password } = payload;
	const user = await authUserModel.findOne({ email });
	if (!user) {
		throw createHttpError(401, "Email or password invalid");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw createHttpError(401, "Email or password invalid");
	}

	await SessionCollection.deleteOne({ userId: user._id });

	const accessToken = randomBytes(30).toString("base64");
	const refreshToken = randomBytes(30).toString("base64");
	const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
	const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

	const userSession = await SessionCollection.create({
		userId: user._id,
		accessToken,
		refreshToken,
		accessTokenValidUntil,
		refreshTokenValidUntil,
	});

	return userSession;
};