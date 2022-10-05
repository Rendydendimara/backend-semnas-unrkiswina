import { NextFunction, Request, Response } from 'express';
import { getListKategoriMakalahUseCase } from '../../repositories/KategoriMakalah/KategoriMakalah';

export const getListKategoriMakalahController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    await getListKategoriMakalahUseCase(res, next);
  } catch (err) {
    next(err);
  }
};
