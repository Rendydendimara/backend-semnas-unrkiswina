import { NextFunction, Response, Request } from 'express';
import Makalah from '../../models/makalah';
import PembayaranMakalah from '../../models/pembayaranMakalah';
import { STATUS_PEMBAYARAN_MAKALAH } from '../../utils/pembayaranMakalah';
import config from '../../config';
export const uploadBuktiPembayaranMakalahUseCase = async (
  payload: { makalah: string },
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Foto bukti pembayaran makalah harus diinput',
      });
    }

    const makalah = await Makalah.findOne({
      _id: payload.makalah,
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

    const makalahPembayaranOld = await PembayaranMakalah.findOne({
      makalah: payload.makalah,
    });

    if (makalahPembayaranOld) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Bukti pembayaran sudah diinput',
      });
    }

    if (String(makalah.user) !== req.user.user_id) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Akses ditolak',
      });
    }

    const port = config.PORT || '8080';
    const imagePath =
      config.NODE_ENV === 'development'
        ? `${req.protocol}://${req.hostname}:${port}/${req.file.path}`
        : `${config.BACKEND_URL}/${req.file.path}`;

    const pembayaranMakalah = await PembayaranMakalah.create({
      bukti_transfer: imagePath,
      user: req.user.user_id,
      makalah: payload.makalah,
      status: STATUS_PEMBAYARAN_MAKALAH.WAITING_CONFIRMATION,
      created_at: new Date(),
    });
    return res.send({
      success: true,
      data: pembayaranMakalah,
      message: 'Success upload bukti pembayaran makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const findPembayaranMakalahByMakalahUseCase = async (
  makalahId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const pembayaranMakalah = await PembayaranMakalah.findOne({
      makalah: makalahId,
    }).populate({
      path: 'user',
      select: '_id nama_lengkap',
    });

    return res.send({
      success: true,
      data: pembayaranMakalah,
      message: 'Success get pembayaran makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const getListPembayaranMakalahUseCase = async (
  res: Response,
  next: NextFunction
) => {
  try {
    const pembayaranMakalah = await PembayaranMakalah.find()
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      })
      .populate({
        path: 'makalah',
        select: '_id judul_makalah status_makalah bukti_transfer',
      });

    return res.send({
      success: true,
      data: pembayaranMakalah,
      message: 'Success get pembayaran makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const findPembayaranMakalahByIdUseCase = async (
  id: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const pembayaranMakalah = await PembayaranMakalah.findOne({
      _id: id,
    })
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      })
      .populate({
        path: 'makalah',
        select: '_id judul_makalah status_makalah bukti_transfer',
      });
    return res.send({
      success: true,
      data: pembayaranMakalah,
      message: 'Success get detail pembayaran makalah',
    });
  } catch (e) {
    next(e);
  }
};
