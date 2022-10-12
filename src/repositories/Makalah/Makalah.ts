import { NextFunction, Request, Response } from 'express';
import KategoriMakalah from '../../models/kategoriMakalah';
import { Types } from 'mongoose';
import Makalah from '../../models/makalah';
import { STATUS_MAKALAH } from '../../utils/makalah';
import config from '../../config';
export const createMakalahUseCase = async (
  payload: {
    category: string;
    judul_makalah: string;
    keterangan: string;
    userId: string;
  },
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalahOld = await Makalah.findOne({
      user: req.user.user_id,
      is_deleted: false,
    });
    if (makalahOld) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah sudah ada',
      });
    }
    const category = await KategoriMakalah.findById(payload.category);
    if (!category) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Kategori makalah tidak ditemukan',
      });
    }
    if (!req.files.makalah_pdf) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Dokumen PDF makalah harus diinput',
      });
    }
    if (!req.files.makalah_word) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Dokumen WORD makalah harus diinput',
      });
    }

    const newMakalah = await Makalah.create({
      judul_makalah: payload.judul_makalah,
      keterangan: payload.keterangan,
      category: payload.category,
      status_makalah: STATUS_MAKALAH.WAITING_CONFIRMATION,
      is_suspend: false,
      user: payload.userId,
      created_at: new Date(),
    });
    const port = config.PORT || '8080';
    if (req.files.makalah_pdf[0].path) {
      const imagePath =
        config.NODE_ENV === 'development'
          ? `${req.protocol}://${req.hostname}:${port}/${req.files.makalah_pdf[0].path}`
          : `${req.protocol}://${req.hostname}/${req.files.makalah_pdf[0].path}`;
      newMakalah.file_pdf_makalah = imagePath;
    }
    if (req.files.makalah_word[0].path) {
      const imagePath =
        config.NODE_ENV === 'development'
          ? `${req.protocol}://${req.hostname}:${port}/${req.files.makalah_word[0].path}`
          : `${req.protocol}://${req.hostname}/${req.files.makalah_word[0].path}`;
      newMakalah.file_word_makalah = imagePath;
    }
    await newMakalah.save();
    return res.send({
      success: true,
      data: newMakalah,
      message: 'Success create makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const updateMakalahUseCase = async (
  payload: {
    category: string;
    judul_makalah: string;
    keterangan: string;
    userId: string;
  },
  makalahId: string,
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalah = await Makalah.findOne({
      _id: makalahId,
      is_suspend: false,
    });

    if (!makalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah tidak ditemukan',
      });
    }

    if (String(makalah.user) !== String(payload.userId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Akses dilarang',
      });
    }

    const category = await KategoriMakalah.findById(payload.category);
    if (!category) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Kategori makalah tidak ditemukan',
      });
    }

    makalah.judul_makalah = payload.judul_makalah || makalah.judul_makalah;
    makalah.keterangan = payload.keterangan || makalah.keterangan;
    makalah.category = new Types.ObjectId(payload.category) || makalah.category;
    makalah.updated_at = new Date();

    const port = config.PORT || '8080';
    if (req.files.makalah_pdf && req.files.makalah_pdf[0].path) {
      const imagePath =
        config.NODE_ENV === 'development'
          ? `${req.protocol}://${req.hostname}:${port}/${req.files.makalah_pdf[0].path}`
          : `${req.protocol}://${req.hostname}/${req.files.makalah_pdf[0].path}`;
      makalah.file_pdf_makalah = imagePath || makalah.file_pdf_makalah;
    }
    if (req.files.makalah_word && req.files.makalah_word[0].path) {
      const imagePath =
        config.NODE_ENV === 'development'
          ? `${req.protocol}://${req.hostname}:${port}/${req.files.makalah_word[0].path}`
          : `${req.protocol}://${req.hostname}/${req.files.makalah_word[0].path}`;
      makalah.file_word_makalah = imagePath || makalah.file_word_makalah;
    }
    await makalah.save();
    return res.send({
      success: true,
      data: makalah,
      message: 'Success update makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const deleteMakalahUseCase = async (
  userId: string,
  makalahId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalah = await Makalah.findOne({
      _id: makalahId,
      is_suspend: false,
    });
    console.log('makalah', makalah);
    if (!makalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah tidak ditemukan',
      });
    }
    if (String(makalah.user) !== String(userId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Akses dilarang',
      });
    }
    makalah.is_deleted = true;
    makalah.deleted_at = new Date();
    await makalah.save();
    return res.send({
      success: true,
      data: makalah,
      message: 'Success delete makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const findMakalahByUserUseCase = async (
  userId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalah = await Makalah.find({
      user: userId,
      is_deleted: false,
    })
      .populate({
        path: 'category',
        select: '_id category_name',
      })
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      });

    return res.send({
      success: true,
      data: makalah,
      message: 'Success find makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const findMakalahByIdUseCase = async (
  makalahId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const makalah = await Makalah.findOne({
      _id: makalahId,
      is_deleted: false,
    })
      .populate({
        path: 'category',
        select: '_id category_name',
      })
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      });

    return res.send({
      success: true,
      data: makalah,
      message: 'Success find makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const getListMakalahUseCase = async (
  res: Response,
  next: NextFunction
) => {
  try {
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

    return res.send({
      success: true,
      data: makalah,
      message: 'Success get list makalah',
    });
  } catch (e) {
    next(e);
  }
};
