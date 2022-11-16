import { NextFunction, Response } from 'express';
import Makalah from '../../models/makalah';
import User from '../../models/user';

export const getStatisticsUseCase = async (
  res: Response,
  next: NextFunction
) => {
  try {
    // user
    const countUserActive = await User.countDocuments({ is_suspend: false });
    const countUserPemakalah = await User.countDocuments({
      is_suspend: false,
      type_user: 'pemakalah',
    });
    const countUserPeserta = await User.countDocuments({
      is_suspend: false,
      type_user: 'peserta',
    });
    // makalah
    const makalah = await Makalah.find({
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
      });

    const data = {
      statistic: {
        totalUser: String(countUserActive),
        userPemakalah: String(countUserPemakalah),
        userPeserta: String(countUserPeserta),
        totalMakalah: makalah.length,
      },
      makalah: makalah,
    };

    return res.send({
      success: true,
      data: data,
      message: 'Success get info dashboard',
    });
  } catch (e) {
    next(e);
  }
};
