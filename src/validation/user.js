import Joi from 'joi';

export const updateUserSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string().min(8).max(64),
	gender: Joi.string().valid('Man', 'Woman'),
	dailyNorm: Joi.string(),
	dailyWaterIntake: Joi.string(),
});

export const updateDailyNormSchema = Joi.object({
	dailyNorm: Joi.string().required(),
});
