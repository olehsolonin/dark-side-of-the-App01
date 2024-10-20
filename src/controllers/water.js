import * as waterServices from '../services/water.js';
import createHttpError from 'http-errors';


export const addWaterController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await waterServices.addWater({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully added an entry',
    data,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await waterServices.deleteWater({_id: id, userId});

  if (!data) {
    next(createHttpError(404, `Not found`));
    return;
  }

  res.status(204).send();
};

export const patchWaterController = async (req, res, next) => {
  
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await waterServices.patchWater({ _id: id, userId }, { ...req.body });
  
  if (!result) {
    next(createHttpError(404, `Not found`));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfuly updated',
    data: result.data,
  });

};

export const getWaterByDayController = async (req, res) => {
  const { _id: userId, dailyNorm } = req.user; 
  const { date } = req.query;
  const data = await waterServices.getWaterByDay(date, userId);
  const totalWaterPerDay = data.reduce((acc, value) => acc + value.volume, 0);
  const percentPerDay = Math.round((totalWaterPerDay > dailyNorm)
    ? 100
    : (totalWaterPerDay / dailyNorm * 100));


  res.status(200).json({
    status: 200,
    message: 'Successfully loaded water per day',
    data: { totalWaterPerDay, percentPerDay, servings: data.length, data, userId: req._id },
  });
};

export const getWaterByMonthController = async (req, res) => {
  const { _id: userId, dailyNorm } = req.user; 
  const { date } = req.query;
  const waterByMonth = await waterServices.getWaterByMonth(date, dailyNorm, userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully loaded water per month',
    data: { dailyNorm, ...waterByMonth, userId: req._id },
  });
};

