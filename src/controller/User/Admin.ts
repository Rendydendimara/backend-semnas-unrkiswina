import { NextFunction, Request, Response } from 'express';
import {
  createAdminUserUseCase,
  getListUserUseCase,
  changeStatusSuspendUserUseCase,
  getDashboardInfoUseCase,
  createUserPublikasiOrReviewerUseCase,
  changeUserTypeUseCase,
} from '../../repositories/User/Admin';

export const createAdminUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nama_lengkap, gender, password, pekerjaan, no_telfon, email } =
      req.body;
    if (!(nama_lengkap && gender && password && email)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await createAdminUserUseCase(
      {
        nama_lengkap,
        gender,
        password,
        pekerjaan,
        no_telfon,
        email,
      },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const getListUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getListUserUseCase(res, next);
  } catch (err) {
    next(err);
  }
};

export const changeStatusSuspendUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, isSuspend } = req.body;
    if (!(userId && isSuspend !== undefined)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await changeStatusSuspendUserUseCase(
      {
        userId,
        isSuspend: Boolean(isSuspend),
      },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const getDashboardInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getDashboardInfoUseCase(res, next);
  } catch (err) {
    next(err);
  }
};

export const createUserPublikasiOrReviewerController = async (
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
    if (!(nama_lengkap && password && email)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await createUserPublikasiOrReviewerUseCase(
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

export const changeUserTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, userType } = req.body;
    if (!(email && userType)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    if (
      !['peserta', 'pemakalah', 'admin', 'publikasi', 'reviewer'].includes(
        userType
      )
    ) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'User type salah',
      });
    }
    await changeUserTypeUseCase(
      {
        email,
        userType,
      },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};
