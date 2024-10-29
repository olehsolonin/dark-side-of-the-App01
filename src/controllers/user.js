import { getUser, addUserPhoto, patchUser } from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { deleteFileFromCloudinary } from '../utils/deleteFileFromCloudinary.js';
import { env } from '../utils/env.js';

// Получение информации о пользователе
export const getUserInfoController = async (req, res) => {
  // const user = await getUser(req.user._id);
  res.status(200).json({
    status: 200,
    message: 'Successfully found a user!',
    data: {
      // "dailyWaterIntake": req.user.dailyWaterIntake,
      _id: req.user._id,
      name: req.user.name,
      dailyNorm: req.user.dailyNorm,
      gender: req.user.gender,
      email: req.user.email,
      photo: req.user.photo,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    },
  });
};

// Добавление или замена фото пользователя

export const addUserPhotoController = async (req, res) => {
  const userId = req.user._id;
  const photo = req.file;
  const user = await getUser(userId);
  const oldPhoto = user.photo;

  let photoUrl = '';

  if (oldPhoto) {
    await deleteFileFromCloudinary(oldPhoto);
  }

  //   const photoURL = await saveFileToCloudinary(photo);

  if (env('ENABLE_CLOUDINARY') === 'true') {
    photoUrl = await saveFileToCloudinary(photo);
  }
  const updatedUser = await addUserPhoto(userId, photoUrl);

  res.status(200).json({
    status: 200,
    message: 'Photo has been added successfully',
    data: photoUrl,
  });
};

// Обновление данных пользователя
export const patchUserController = async (req, res) => {
  const userId = req.user._id;
  const updatedUser = await patchUser(userId, req.body);

  if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
  }

  const newData = {
    _id: updatedUser.value._id,
    name: updatedUser.value.name,
    email: updatedUser.value.email,
    gender: updatedUser.value.gender,
    dailyNorm: updatedUser.value.dailyNorm,
    photo: updatedUser.value.photo,
    createdAt: updatedUser.value.createdAt,
    updatedAt: updatedUser.value.updatedAt,
  };

  res.status(200).json({
    status: 200,
    message: 'User has been updated successfully',
    data: newData,
  });
};

export const patchDailyNormController = async (req, res, next) => {
  const userId = req.user._id;
  const { dailyNorm } = req.body;

  try {
    const updatedUser = await patchUser(userId, { dailyNorm });

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).json({
      status: 200,
      message: "User's daily norm has been updated successfully",
      data: { dailyNorm },
    });
  } catch (error) {
    next(error);
  }
};
