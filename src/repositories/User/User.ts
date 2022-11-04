import { NextFunction, Request, Response } from 'express';
import VideoPresentasi from '../../models/videoPresentasi';
import Makalah from '../../models/makalah';
import User from '../../models/user';
import PembayaranMakalah from '../../models/pembayaranMakalah';
import { Types } from 'mongoose';

export const getDashboardInfoUseCase = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    // user
    let makalah = undefined;
    let pembayaranMakalah = undefined;
    let videoPresentasi = undefined;
    const user = await User.findById(
      new Types.ObjectId(req.user.user_id)
    ).select(
      '_id nama_lengkap email gender pekerjaan no_telfon profile_image type_user created_at is_suspend deleted_at updated_at is_verify'
    );
    if (req.user.user_type === 'pemakalah') {
      makalah = await Makalah.findOne({
        user: user._id,
        is_deleted: false,
      }).select('judul_makalah status_makalah category created_at');
      pembayaranMakalah = await PembayaranMakalah.findOne({
        user: user._id,
      }).select('status created_at');
      videoPresentasi = await VideoPresentasi.findOne({
        user: user._id,
        is_deleted: false,
      }).select('status link_video created_at');
    }
    const data: any = {
      makalah: makalah,
      pembayaranMakalah: pembayaranMakalah,
      videoPresentasi: videoPresentasi,
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

export const getUserProfileUseCase = async (
  userId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(userId).select(
      '_id nama_lengkap email gender pekerjaan no_telfon profile_image type_user'
    );

    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Pengguna tidak ditemukan',
      });
    }

    return res.send({
      success: true,
      data: user,
      message: 'Success get user profile',
    });
  } catch (e) {
    next(e);
  }
};
