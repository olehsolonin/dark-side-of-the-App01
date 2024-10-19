import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { userSignupSchema, userSigninSchema } from '../validation/auth-user.js';
import * as authControllers from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
	'/signup',
	validateBody(userSignupSchema),
	ctrlWrapper(authControllers.signupController),
);
authRouter.post(
	'/signin',
	validateBody(userSigninSchema),
	ctrlWrapper(authControllers.signinController),
);

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));


export default authRouter;
