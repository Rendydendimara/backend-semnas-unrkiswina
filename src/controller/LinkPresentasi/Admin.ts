import { NextFunction, Request, Response } from 'express';
import { updateStatusVideoPresentasiUseCase } from '../../repositories/VideoPresentasi/Admin';

export const updateStatusVideoPresentasiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { videoPresentasiId, status } = req.body;
    if (!(status && videoPresentasiId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await updateStatusVideoPresentasiUseCase(
      videoPresentasiId,
      status,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};
