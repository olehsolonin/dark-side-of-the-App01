import WaterCollection from "../db/models/water.js";


export const addWater = payload => WaterCollection.create(payload);

export const deleteWater = id => WaterCollection.findOneAndDelete(id);

export const patchWater = async (id, data, options = {}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    id,
    data,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    });
  
  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
  };

  export const getWaterByDay = async (date, userId) => {
  return await WaterCollection.find({
    date: { $gte: `${date}T00:00:00`, $lt: `${date}T23:59:59` },
    userId,
  });
};

export const getWaterByMonth = async ( date, dailyWaterIntake, userId ) => {
  
};