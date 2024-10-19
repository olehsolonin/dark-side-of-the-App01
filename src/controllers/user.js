import { getUser, addUserPhoto, patchUser } from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloundary.js';
import { deleteFileFromCloudinary } from '../utils/deleteFileFromCloundary.js';

// Получение информации о пользователе
export const getUserInfoController = async (req, res) => {
  const user = await getUser(req.user._id);
  res.status(200).json({
    status: 200,
    message: 'Successfully found a user!',
    data: user[0],
  });
};

// Добавление или замена фото пользователя
export const addUserPhotoController = async (req, res) => {
  const userId = req.user._id;
  const photo = req.file;
  const user = await getUser(userId);
  const oldPhoto = user[0].photo;

  if (oldPhoto) {
    await deleteFileFromCloudinary(oldPhoto);
  }

  const photoURL = await saveFileToCloudinary(photo);
  const updatedUser = await addUserPhoto(userId, photoURL);

  res.status(200).json({
    status: 200,
    message: 'Photo has been added successfully',
    data: { photoUrl: updatedUser.photo },
    // data: updatedUser,
  });
};

// Обновление данных пользователя
export const patchUserController = async (req, res) => {
  const userId = req.user._id;
  const updatedUser = await patchUser(userId, req.body);

  res.status(200).json({
    status: 200,
    message: 'User has been updated successfully',
    data: updatedUser,
  });
};
