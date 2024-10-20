import createHttpError from "http-errors";

import * as authServices from "../services/auth.js";
import * as userServices from '../services/users.js';

const authenticate = async (req, res, next) => {
	console.log("hello");
	// const {authorization} = req.headers;
	const authorization = req.get("Authorization");
	console.log(authorization);

	if (!authorization) {
		return next(createHttpError(401, "Authorization header not found"));
	}

	const [bearer, token] = authorization.split(" ");

	if (bearer !== "Bearer") {
		return next(createHttpError(401, "Authorization header must have Bearer type"));
	}

	const session = await authServices.findSessionByAccessToken(token);

	if (!session) {
		return next(createHttpError(401, "Session not found"));
	}

	if (new Date() > session.accessTokenValidUntil) {
		return next(createHttpError(401, "Access token expired"));
	}
	// console.log(session);

	const user = await userServices.getUser(session.userId);
	if (!user) {
		return next(createHttpError(401, "User not found"));
	}

	req.user = user;
	// console.log(user);


	next();
};

export default authenticate;