import { NextFunction, Request, Response } from 'express';
import {
  updateStatusMakalahUseCase,
  uploadLOAMakalahUseCase,
  sendLOAMakalahByEmailPemakalahUseCase,
} from '../../repositories/Makalah/Admin';

export const updateStatusMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { makalahId, status } = req.body;
    if (!(status && makalahId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await updateStatusMakalahUseCase(makalahId, status, res, next);
  } catch (err) {
    next(err);
  }
};

export const uploadLOAMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { makalahId, userId } = req.body;
    if (!(makalahId && userId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await uploadLOAMakalahUseCase({ makalahId, userId }, req, res, next);
  } catch (err) {
    next(err);
  }
};

export const sendLOAMakalahByEmailPemakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalahId = req.params.makalahId;
    if (!makalahId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await sendLOAMakalahByEmailPemakalahUseCase(makalahId, res, next);
  } catch (err) {
    next(err);
  }
};
