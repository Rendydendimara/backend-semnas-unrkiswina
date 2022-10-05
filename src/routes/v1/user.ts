import express from 'express';
import { isAuth } from '../../middleware/userAuth';
import {
  checkUserLoginController,
  registerUserController,
  loginUserController,
  logoutUserController,
  verifyUserController,
  sendOTPResetPasswordUserController,
  verifyResetPasswordUserController,
  updateProfileUserController,
} from '../../controller/User/User';
import { createAdminUserController } from '../../controller/User/Admin';
import { asyncErrorHandler } from '../../middleware';
import imageProfile from '../../config/multer/imageProfile';

const userRouter = express.Router();

userRouter.post('/register', asyncErrorHandler(registerUserController));
userRouter.post('/login', asyncErrorHandler(loginUserController));
userRouter.post('/check-login', asyncErrorHandler(checkUserLoginController));
userRouter.post('/verify', asyncErrorHandler(verifyUserController));
userRouter.post(
  '/create-otp-forgot-password',
  asyncErrorHandler(sendOTPResetPasswordUserController)
);
userRouter.post(
  '/verify-forgot-password',
  asyncErrorHandler(verifyResetPasswordUserController)
);
userRouter.put(
  '/update-profile',
  asyncErrorHandler(isAuth()),
  imageProfile.single('imageProfile'),
  asyncErrorHandler(updateProfileUserController)
);
userRouter.post(
  '/admin/create-admin',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(createAdminUserController)
);
userRouter.get(
  '/logout',
  asyncErrorHandler(isAuth()),
  asyncErrorHandler(logoutUserController)
);

export default userRouter;
