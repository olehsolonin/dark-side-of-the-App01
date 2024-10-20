import Joi from "joi";

import { emailRegexp } from "../constants/users.js";

export const userSignupSchema = Joi.object({
	// name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(8).max(64).required(),
});

export const userSigninSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(8).max(64).required(),
}); 