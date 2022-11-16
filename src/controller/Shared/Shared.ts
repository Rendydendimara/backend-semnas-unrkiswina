import { NextFunction, Request, Response } from 'express';
import { getStatisticsUseCase } from '../../repositories/Shared/Shared';

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
