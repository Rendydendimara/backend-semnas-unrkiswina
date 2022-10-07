import { NextFunction, Response } from 'express';
import Makalah from '../../models/makalah';
import VideoPresentasi from '../../models/videoPresentasi';
import { STATUS_VIDEO_PRESENTASI } from '../../utils/videoPresentasi';

export const createVideoPresentasiUseCase = async (
  payload: {
    link: string;
    userId: string;
    makalahId: string;
    keterangan: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    const oldVideoPresentasi = await VideoPresentasi.findOne({
      user: payload.userId,
    });
    if (oldVideoPresentasi) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Link video presentasi sudah ada',
      });
    }
    const makalah = await Makalah.findOne({
      is_deleted: false,
      _id: payload.makalahId,
    });
    if (!makalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Makalah tidak ditemukan',
      });
    }
    if (String(makalah.user) !== payload.userId) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Akses dilarang',
      });
    }
    const videoPresentasi = await VideoPresentasi.create({
      is_deleted: false,
      status: STATUS_VIDEO_PRESENTASI.WAITING_CONFIRMATION,
      user: payload.userId,
      makalah: payload.makalahId,
      link_video: payload.link,
      keterangan: payload.keterangan,
      created_at: new Date(),
    });

    return res.send({
      success: true,
      data: videoPresentasi,
      message: 'Success create video presentasi',
    });
  } catch (e) {
    next(e);
  }
};

export const updateVideoPresentasiUseCase = async (
  payload: {
    link: string;
    userId: string;
    keterangan: string;
  },
  videoPresentasiId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoPresentasi = await VideoPresentasi.findOne({
      _id: videoPresentasiId,
      is_deleted: false,
    });

    if (!videoPresentasi) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Video presentasi tidak ditemukan',
      });
    }

    if (String(videoPresentasi.user) !== String(payload.userId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Akses dilarang',
      });
    }

    videoPresentasi.link_video = payload.link || videoPresentasi.link_video;
    videoPresentasi.keterangan =
      payload.keterangan || videoPresentasi.keterangan;
    videoPresentasi.updated_at = new Date();

    await videoPresentasi.save();
    return res.send({
      success: true,
      data: videoPresentasi,
      message: 'Success update video presentasi',
    });
  } catch (e) {
    next(e);
  }
};

export const deleteVideoPresentasiUseCase = async (
  userId: string,
  videoPresentasiId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoPresentasi = await VideoPresentasi.findOne({
      _id: videoPresentasiId,
      is_deleted: false,
    });

    if (!videoPresentasi) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Video presentasi tidak ditemukan',
      });
    }
    if (String(videoPresentasi.user) !== String(userId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Akses dilarang',
      });
    }
    videoPresentasi.is_deleted = true;
    videoPresentasi.deleted_at = new Date();
    await videoPresentasi.save();
    return res.send({
      success: true,
      data: videoPresentasi,
      message: 'Success delete video presentasi',
    });
  } catch (e) {
    next(e);
  }
};

export const findVideoPresentasiByUserUseCase = async (
  userId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoPresentasi = await VideoPresentasi.find({
      user: userId,
      is_deleted: false,
    })
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      })
      .populate({
        path: 'makalah',
        select: '_id judul_makalah category',
      });

    return res.send({
      success: true,
      data: videoPresentasi,
      message: 'Success find video presentasi',
    });
  } catch (e) {
    next(e);
  }
};

export const findVideoPresentasiByIdUseCase = async (
  videoPresentasiId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoPresentasi = await VideoPresentasi.findOne({
      _id: videoPresentasiId,
      is_deleted: false,
    })
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      })
      .populate({
        path: 'makalah',
        select: '_id judul_makalah category',
      });

    return res.send({
      success: true,
      data: videoPresentasi,
      message: 'Success find video presentasi',
    });
  } catch (e) {
    next(e);
  }
};

export const getListVideoPresentasiUseCase = async (
  res: Response,
  next: NextFunction
) => {
  try {
    const videoPresentasi = await VideoPresentasi.find({
      is_deleted: false,
      is_suspend: false,
    })
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      })
      .populate({
        path: 'makalah',
        select: '_id judul_makalah category',
      });

    return res.send({
      success: true,
      data: videoPresentasi,
      message: 'Success get list video presentasi',
    });
  } catch (e) {
    next(e);
  }
};
