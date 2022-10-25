import { NextFunction, Request, Response } from 'express';
import KategoriMakalah from '../../models/kategoriMakalah';
import { Types } from 'mongoose';
import Makalah from '../../models/makalah';
import { STATUS_MAKALAH } from '../../utils/makalah';
import config from '../../config';
import User from '../../models/user';

export const assignReviewerToReviewMakalahUseCase = async (
  payload: {
    makalahId: string;
    reviewerId: any;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    const makalah = await Makalah.findById(payload.makalahId);
    if (!makalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah tidak ditemukan',
      });
    }
    const reviewer = await User.findOne({
      _id: payload.reviewerId,
      type_user: 'reviewer',
    });
    if (!reviewer) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Reviewer tidak ditemukan',
      });
    }
    makalah.reviewer = payload.reviewerId;
    await makalah.save();

    return res.send({
      success: true,
      data: null,
      message: 'Success assign reviewer to makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const removeReviewerToReviewMakalahUseCase = async (
  makalahId: string,
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
    makalah.reviewer = null;
    await makalah.save();
    return res.send({
      success: true,
      data: null,
      message: 'Success remove reviewer in makalah',
    });
  } catch (e) {
    next(e);
  }
};
