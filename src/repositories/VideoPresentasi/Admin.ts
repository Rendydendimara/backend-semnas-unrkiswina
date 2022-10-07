import { NextFunction, Response } from 'express';
import VideoPresentasi from '../../models/videoPresentasi';

export const updateStatusVideoPresentasiUseCase = async (
  videoPresentasiId: string,
  status: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoPresentasi = await VideoPresentasi.findById(videoPresentasiId);
    if (!videoPresentasi) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Video presentasi tidak ditemukan',
      });
    }
    videoPresentasi.status = status;
    videoPresentasi.updated_at = new Date();
    await videoPresentasi.save();

    return res.send({
      success: true,
      data: videoPresentasi,
      message: 'Success change status video presentasi',
    });
  } catch (e) {
    next(e);
  }
};
