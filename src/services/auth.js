import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { randomBytes } from "crypto";
import { accessTokenLifetime, refreshTokenLifetime } from "../constants/users.js";

import SessionCollection from "../db/models/session.js";
import UsersCollection from "../db/models/users.js";


const createSession = () => {
	const accessToken = randomBytes(30).toString("base64");
	const refreshToken = randomBytes(30).toString("base64");
	const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
	const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

	return {
		accessToken,
		refreshToken,
		accessTokenValidUntil,
		refreshTokenValidUntil,
	};
};

export const signup = async (payload) => {
	const { email, password } = payload;
	const user = await UsersCollection.findOne({ email });
	if (user) {
		throw createHttpError(409, "Email already exist");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const data = await UsersCollection.create({ ...payload, password: hashPassword });
	delete data._doc.password;

	return data._doc;
};

export const signin = async (payload) => {
	const { email, password } = payload;
	const user = await UsersCollection.findOne({ email });
	if (!user) {
		throw createHttpError(401, "Email or password invalid");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw createHttpError(401, "Email or password invalid");
	}

	await SessionCollection.deleteOne({ userId: user._id });

	const sessionData = createSession();

	const userSession = await SessionCollection.create({
		userId: user._id,
		...sessionData,
	});

	return userSession;
};

export const refreshSession = async ({ refreshToken, sessionId }) => {
	const oldSession = await SessionCollection.findOne({
		_id: sessionId,
		refreshToken,
	});

	if (!oldSession) {
		throw createHttpError(401, "Session not found");
	}

	if (new Date() > oldSession.refreshTokenValidUntil) {
		throw createHttpError(401, "Session token expired");
	}

	await SessionCollection.deleteOne({ _id: sessionId });

	const sessionData = createSession();

	const userSession = await SessionCollection.create({
		userId: oldSession.userId,
		...sessionData,
	});

	return userSession;
};

export const signout = async (sessionId) => {
	await SessionCollection.deleteOne({ _id: sessionId });
};

export const findSessionByAccessToken = accessToken => SessionCollection.findOne({ accessToken });

export const findUser = filter => SessionCollection.findOne(filter);