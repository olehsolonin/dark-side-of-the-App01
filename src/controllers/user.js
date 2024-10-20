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
		data: req.user,
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
	} else {
		photoUrl = await saveFileToUploadDir(photo);
	}
	const updatedUser = await addUserPhoto(userId, photoUrl);

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

	if (!updatedUser) {
		return next(createHttpError(404, 'User not found'));
	}

	res.status(200).json({
		status: 200,
		message: 'User has been updated successfully',
		data: updatedUser,
	});
};
