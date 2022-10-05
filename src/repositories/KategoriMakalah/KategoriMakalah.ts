import { NextFunction, Response } from 'express';
import KategoriMakalah from '../../models/kategoriMakalah';

export const getListKategoriMakalahUseCase = async (
  res: Response,
  next: NextFunction
) => {
  try {
    const kategori = await KategoriMakalah.find();
    return res.send({
      success: true,
      data: kategori,
      message: 'Success get kategori makalah',
    });
  } catch (e) {
    next(e);
  }
};
