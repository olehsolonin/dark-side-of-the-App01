import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import {
	getUserInfoController,
	addUserPhotoController,
	patchUserController,
} from '../controllers/user.js';
import { updateUserSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.use(authenticate);

// Отримати інформацію про користувача
userRouter.get('/', ctrlWrapper(getUserInfoController));

// Додати/змінити фото користувача
userRouter.post(
	'/photo',
	upload.single('photo'),
	ctrlWrapper(addUserPhotoController),
);

// Оновити інформацію про користувача
userRouter.patch(
	'/:userID',
	//   jsonParser,
	validateBody(updateUserSchema),
	ctrlWrapper(patchUserController),
);

export default userRouter;
