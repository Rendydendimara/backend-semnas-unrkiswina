import { NextFunction, Request, Response } from 'express';
import { getStatisticsUseCase } from '../../repositories/Shared/Shared';
import { getSertificationUseCase } from '../../repositories/Shared/Sheets';

export const getStatisticsController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    await getStatisticsUseCase(res, next);
  } catch (err) {
    next(err);
  }
};

export const getSertificationController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    await getSertificationUseCase(res, next);
  } catch (err) {
    next(err);
  }
};
