import { NextFunction, Request, Response } from 'express';
import {
  createVideoPresentasiUseCase,
  deleteVideoPresentasiUseCase,
  findVideoPresentasiByIdUseCase,
  findVideoPresentasiByUserUseCase,
  getListVideoPresentasiUseCase,
  updateVideoPresentasiUseCase,
} from '../../repositories/VideoPresentasi/VideoPresentasi';

export const createVideoPresentasiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { link, userId, makalahId, keterangan } = req.body;
    if (!(link && userId && makalahId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await createVideoPresentasiUseCase(
      {
        link,
        userId,
        makalahId,
        keterangan,
      },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const updateVideoPresentasiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { link, userId, keterangan } = req.body;
    if (!(link && keterangan && userId && req.params.videoPresentasiId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await updateVideoPresentasiUseCase(
      {
        link,
        userId,
        keterangan,
      },
      req.params.videoPresentasiId,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const deleteVideoPresentasiController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.videoPresentasiId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await deleteVideoPresentasiUseCase(
      req.user.user_id,
      req.params.videoPresentasiId,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const findVideoPresentasiByUserController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await findVideoPresentasiByUserUseCase(userId, res, next);
  } catch (err) {
    next(err);
  }
};

export const findVideoPresentasiByIdController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.videoPresentasiId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await findVideoPresentasiByIdUseCase(
      req.params.videoPresentasiId,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const getListVideoPresentasiController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    await getListVideoPresentasiUseCase(res, next);
  } catch (err) {
    next(err);
  }
};
