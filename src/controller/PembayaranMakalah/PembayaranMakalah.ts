import { NextFunction, Request, Response } from 'express';
import {
  uploadBuktiPembayaranMakalahUseCase,
  findPembayaranMakalahByMakalahUseCase,
  getListPembayaranMakalahUseCase,
  findPembayaranMakalahByIdUseCase,
} from '../../repositories/PembayaranMakalah/PembayaranMakalah';

export const uploadBuktiPembayaranMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { makalah } = req.body;
    if (!makalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await uploadBuktiPembayaranMakalahUseCase(
      {
        makalah,
      },
      req,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const findPembayaranMakalahByMakalahController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { makalahId } = req.body;
    if (!makalahId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await findPembayaranMakalahByMakalahUseCase(makalahId, res, next);
  } catch (err) {
    next(err);
  }
};

export const getListPembayaranMakalahController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    await getListPembayaranMakalahUseCase(res, next);
  } catch (err) {
    next(err);
  }
};

export const findPembayaranMakalahByIdController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.pembayaranMakalahId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await findPembayaranMakalahByIdUseCase(
      req.params.pembayaranMakalahId,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};
