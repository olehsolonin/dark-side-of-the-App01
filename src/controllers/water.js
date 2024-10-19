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
  const { _id: userId, dailyWaterIntake } = req.user; //the name of the value should be changed
  const { date } = req.query;

  const waterByDay = await waterServices.getWaterByDay(date, userId);
  const totalWaterPerDay = waterByDay.reduce((acc, value) => acc + value.volume, 0);
  const percentPerDay = Math.round((totalWaterPerDay > dailyWaterIntake)
    ? 100
    : (totalWaterPerDay / dailyWaterIntake * 100));


  res.status(200).json({
    status: 200,
    message: 'Successfully got water per day',
    data: { totalWaterPerDay, percentPerDay, waterByDay, userId: req._id },
  });
};

export const getWaterByMonthController = async (req, res) => {
  const { _id: userId, dailyWaterIntake } = req.user; //the name of the value should be changed
  const { date } = req.query;

  const waterByMonth = await waterServices.getWaterByMonth(date, dailyWaterIntake, userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully got water per month',
    data: { waterByMonth, userId: req._id },
  });
};

