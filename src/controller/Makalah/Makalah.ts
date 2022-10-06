import { NextFunction, Request, Response } from 'express';
import {
  createMakalahUseCase,
  updateMakalahUseCase,
  deleteMakalahUseCase,
  findMakalahByUserUseCase,
  findMakalahByIdUseCase,
  getListMakalahUseCase,
} from '../../repositories/Makalah/Makalah';

export const createMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, judul_makalah, keterangan, userId } = req.body;
    if (!(category && judul_makalah && keterangan && userId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await createMakalahUseCase(
      {
        category,
        judul_makalah,
        keterangan,
        userId,
      },
      req,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const updateMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, judul_makalah, keterangan, userId } = req.body;
    if (
      !(
        category &&
        judul_makalah &&
        keterangan &&
        userId &&
        req.params.makalahId
      )
    ) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await updateMakalahUseCase(
      {
        category,
        judul_makalah,
        keterangan,
        userId,
      },
      req.params.makalahId,
      req,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const deleteMakalahController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.makalahId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await deleteMakalahUseCase(
      req.user.user_id,
      req.params.makalahId,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const findMakalahByUserController = async (
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
    await findMakalahByUserUseCase(userId, res, next);
  } catch (err) {
    next(err);
  }
};

export const findMakalahByIdController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.makalahId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await findMakalahByIdUseCase(req.params.makalahId, res, next);
  } catch (err) {
    next(err);
  }
};

export const getListMakalahController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    await getListMakalahUseCase(res, next);
  } catch (err) {
    next(err);
  }
};
