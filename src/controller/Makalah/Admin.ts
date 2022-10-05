import { NextFunction, Request, Response } from 'express';
import { updateStatusMakalahUseCase } from '../../repositories/Makalah/Admin';

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
