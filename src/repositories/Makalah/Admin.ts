import { NextFunction, Response } from 'express';
import Makalah from '../../models/makalah';

export const updateStatusMakalahUseCase = async (
  makalahId: string,
  statusMakalah: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalah = await Makalah.findById(makalahId);
    if (!makalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah tidak ditemukan',
      });
    }
    makalah.status_makalah = statusMakalah;
    makalah.updated_at = new Date();
    await makalah.save();

    return res.send({
      success: true,
      data: makalah,
      message: 'Success change status makalah',
    });
  } catch (e) {
    next(e);
  }
};
