import { NextFunction, Request, Response } from 'express';
import {
  getMakalahByReviewerIdUseCase,
  addReviewerMakalahUseCase,
  getListReviewerUseCase,
} from '../../repositories/Makalah/Reviewer';

export const getListReviewerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getListReviewerUseCase(res, next);
  } catch (err) {
    next(err);
  }
};

export const getMakalahByReviewerIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewerId = req.params.reviewerId;
    if (!reviewerId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await getMakalahByReviewerIdUseCase(reviewerId, res, next);
  } catch (err) {
    next(err);
  }
};

export const addReviewerMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { feedback, score, makalahId, statusMakalah, reviewerId } = req.body;
    if (!(feedback && score && makalahId && statusMakalah && reviewerId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await addReviewerMakalahUseCase(
      {
        feedback,
        score,
        makalahId,
        statusMakalah,
        reviewerId,
      },
      req,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};
