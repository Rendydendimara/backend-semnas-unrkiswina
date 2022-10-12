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
  getDashboardInfoUserController,
} from '../../controller/User/User';
import {
  createAdminUserController,
  getListUserController,
  changeStatusSuspendUserController,
  getDashboardInfoController,
} from '../../controller/User/Admin';
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

userRouter.get(
  '/admin/list-user',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(getListUserController)
);
userRouter.post(
  '/admin/user-change-suspend',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(changeStatusSuspendUserController)
);

userRouter.get(
  '/admin/dashboard',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(getDashboardInfoController)
);

userRouter.get(
  '/dashboard',
  asyncErrorHandler(isAuth()),
  asyncErrorHandler(getDashboardInfoUserController)
);
export default userRouter;
