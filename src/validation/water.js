import Joi from 'joi';
import { dateAndTime, dayDate, monthDate } from '../constants/water.js';

export const addWaterSchema = Joi.object({
  date: Joi.string().pattern(dateAndTime).required(),
  volume: Joi.number().min(1).max(5000).required(),
});

export const patchWaterSchema = Joi.object({
  date: Joi.string().pattern(dateAndTime),
  volume: Joi.number().min(1).max(5000),
});

export const queryDayWaterSchema = Joi.object({
  date: Joi.string().pattern(dayDate).required(),
});

export const queryMonthWaterSchema = Joi.object({
  date: Joi.string().pattern(monthDate).required(),
});