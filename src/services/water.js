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

export const getWaterByMonth = async (date, dailyNorm, userId) => {
  const [year, month] = date.split('-');
  const daysInMonth = new Date(year, month, 0).getDate();
  const lastDayOfMonth = daysInMonth.toString();

   const stages = [
    {
      $match: {
        userId,
        date: {
          $gte: `${date}-01T00:00:00`,
          $lt: `${date}-${lastDayOfMonth}T23:59:59`
        }
      }
    },
    {
      $group: {
        _id: {$substr: ["$date", 0, 10]},
        totalVolume: { $sum: '$volume' },
        servings: { $count: { } },
        percent: { $sum: 0 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ];
  const data = await WaterCollection.aggregate(stages);
  
  data.forEach(water => {
    water.percent = Math.round((water.totalVolume > dailyNorm)
    ? 100
    : (water.totalVolume / dailyNorm * 100));
  });

  return data;
};