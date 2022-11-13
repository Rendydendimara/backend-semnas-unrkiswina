import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import Makalah from '../../models/makalah';
import config from '../../config';
import { sendMailLOA } from '../../service/email/makalah';
import { STATUS_MAKALAH } from '../../utils/makalah';

/**
 * This use case using by admin and publikasi
 */
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

export const uploadLOAMakalahUseCase = async (
  payload: {
    makalahId: string;
    userId: string;
  },
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalahOld = await Makalah.findOne({
      _id: new mongoose.Types.ObjectId(payload.makalahId),
      user: new mongoose.Types.ObjectId(payload.userId),
      is_deleted: false,
    });
    if (!makalahOld) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah tidak ditemukan',
      });
    }
    if (!req.file) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Dokumen LOA harus diinput',
      });
    }
    if (
      makalahOld.status_makalah === STATUS_MAKALAH.WAITING_CONFIRMATION ||
      makalahOld.status_makalah === STATUS_MAKALAH.REJECT
    ) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah belum diterima',
      });
    }
    const port = config.PORT || '8080';
    if (req.file.path) {
      const filePath =
        config.NODE_ENV === 'development'
          ? `${req.protocol}://${req.hostname}:${port}/${req.file.path}`
          : `${config.BACKEND_URL}/${req.file.path}`;
      makalahOld.file_loa_makalah = filePath;
    }
    await makalahOld.save();
    return res.send({
      success: true,
      data: makalahOld,
      message: 'Success upload LOA makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const sendLOAMakalahByEmailPemakalahUseCase = async (
  makalahId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalahOld: any = await Makalah.findOne({
      _id: new mongoose.Types.ObjectId(makalahId),
      is_deleted: false,
    }).populate('user', '_id nama_lengkap email');
    if (!makalahOld) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah tidak ditemukan',
      });
    }
    if (!makalahOld.file_loa_makalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Dokumen LOA tidak ditemukan',
      });
    }
    await sendMailLOA({
      username: makalahOld.user.nama_lengkap,
      email: makalahOld.user.email,
      filename: `${makalahOld.judul_makalah} - LOA.docx`,
      linkFile: makalahOld.file_loa_makalah,
      judulMakalah: makalahOld.judul_makalah,
    });
    makalahOld.last_date_send_loa = new Date();
    await makalahOld.save();
    return res.send({
      success: true,
      data: makalahOld,
      message: 'Success send LOA to pemakalah email',
    });
  } catch (e) {
    next(e);
  }
};
