import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import Makalah from '../../models/makalah';
import User from '../../models/user';

export const getListReviewerUseCase = async (
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.find({
      type_user: 'reviewer',
    }).select('_id nama_lengkap');

    return res.send({
      success: true,
      data: user,
      message: 'Success get list reviewer',
    });
  } catch (e) {
    next(e);
  }
};

export const getMakalahByReviewerIdUseCase = async (
  reviewerId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalah = await Makalah.find({
      reviewer: reviewerId,
      is_deleted: false,
      is_suspend: false,
    })
      .populate({
        path: 'category',
        select: '_id category_name',
      })
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      })
      .populate({
        path: 'reviewer',
        select: '_id nama_lengkap',
      });

    return res.send({
      success: true,
      data: makalah,
      message: 'Success get makalah by reviewer id',
    });
  } catch (e) {
    next(e);
  }
};

export const addReviewerMakalahUseCase = async (
  payload: {
    feedback: string;
    score: number;
    makalahId: string;
    statusMakalah: string;
    reviewerId: string;
  },
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalah = await Makalah.findOne({
      _id: payload.makalahId,
      is_deleted: false,
      is_suspend: false,
    });

    if (!makalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah tidak ditemukan',
      });
    }
    if (String(makalah.reviewer) !== payload.reviewerId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Akses dilarang',
      });
    }

    const port = config.PORT || '8080';
    if (req.file && req.file.path) {
      const imagePath =
        config.NODE_ENV === 'development'
          ? `${req.protocol}://${req.hostname}:${port}/${req.file.path}`
          : `${config.BACKEND_URL}/${req.file.path}`;
      makalah.file_reviwer_makalah = imagePath || makalah.file_reviwer_makalah;
    }
    const score = payload.score ? Number(payload.score) : 0;
    makalah.feedback = payload.feedback || makalah.feedback;
    makalah.score = score || makalah.score;
    makalah.status_makalah = payload.statusMakalah || makalah.status_makalah;
    makalah.is_reviewed = true;
    makalah.reviewed_at = new Date();
    await makalah.save();
    return res.send({
      success: true,
      data: makalah,
      message: 'Success add reviewer makalah',
    });
  } catch (e) {
    next(e);
  }
};
