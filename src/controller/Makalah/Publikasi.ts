import { NextFunction, Request, Response } from 'express';
import {
  assignReviewerToReviewMakalahUseCase,
  removeReviewerToReviewMakalahUseCase,
} from '../../repositories/Makalah/Publikasi';

export const assignReviewerToReviewMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { makalahId, reviewerId } = req.body;
    if (!(makalahId && reviewerId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await assignReviewerToReviewMakalahUseCase(
      {
        makalahId,
        reviewerId,
      },
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const removeReviewerToReviewMakalahController = async (
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
    await removeReviewerToReviewMakalahUseCase(makalahId, res, next);
  } catch (err) {
    next(err);
  }
};
