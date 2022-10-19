import { NextFunction, Request, Response } from 'express';
import {
  chekUserLoginUseCase,
  loginUseCase,
  logoutUserUseCase,
  resigterUserUseCase,
  verifyUserUseCase,
  sendOTPResetPasswordUserUseCase,
  verifyResetPasswordUserUseCase,
  updateProfileUserUseCase,
  reSendLinkVerifikasiUseCase,
} from '../../repositories/User/Auth';
import { getDashboardInfoUseCase } from '../../repositories/User/User';
export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      nama_lengkap,
      gender,
      password,
      pekerjaan,
      no_telfon,
      email,
      type_user,
    } = req.body;
    if (!(nama_lengkap && gender && password && type_user && email)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await resigterUserUseCase(
      {
        nama_lengkap,
        gender,
        password,
        pekerjaan,
        no_telfon,
        email,
        type_user,
      },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await loginUseCase({ email, password }, res, next);
  } catch (err) {
    next(err);
  }
};

export const checkUserLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await chekUserLoginUseCase(token, res, next);
  } catch (err) {
    next(err);
  }
};

export const logoutUserController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    await logoutUserUseCase(req.user.user_id, res, next);
  } catch (err) {
    next(err);
  }
};

export const verifyUserController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, tokenVerify } = req.body;
    if (!(userId && tokenVerify)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await verifyUserUseCase(
      {
        userId,
        tokenVerify,
      },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const sendOTPResetPasswordUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await sendOTPResetPasswordUserUseCase(email, res, next);
  } catch (err) {
    next(err);
  }
};

export const verifyResetPasswordUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, otpResetPassword } = req.body;
    if (!(email && password && otpResetPassword)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await verifyResetPasswordUserUseCase(
      { email, password, otpResetPassword },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const updateProfileUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nama_lengkap, gender, pekerjaan, no_telfon } = req.body;
    if (!(nama_lengkap && gender && no_telfon && pekerjaan)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await updateProfileUserUseCase(
      { nama_lengkap, gender, pekerjaan, no_telfon },
      req,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const getDashboardInfoUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getDashboardInfoUseCase(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const reSendLinkVerifikasiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await reSendLinkVerifikasiUseCase(email, res, next);
  } catch (err) {
    next(err);
  }
};
