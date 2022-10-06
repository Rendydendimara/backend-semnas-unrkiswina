import { NextFunction, Request, Response } from 'express';
import {
  updateStatusPembayaranMakalahUseCase,
  updatePembayaranMakalahUseCase,
} from '../../repositories/PembayaranMakalah/Admin';

export const updateStatusPembayaranMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { statusPembayaran, pembayaranMakalahId } = req.body;
    if (!(statusPembayaran && pembayaranMakalahId)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await updateStatusPembayaranMakalahUseCase(
      statusPembayaran,
      pembayaranMakalahId,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

export const updatePembayaranMakalahController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      nama_pengirim,
      statusPembayaran,
      category_harga_makalah,
      peruntukan,
      keterangan,
      harga,
      bank_pengirim,
      jumlah_transfer,
      tanggal_konfirmasi_pembayaran,
    } = req.body;
    if (
      !(
        nama_pengirim &&
        statusPembayaran &&
        category_harga_makalah &&
        peruntukan &&
        bank_pengirim &&
        jumlah_transfer &&
        tanggal_konfirmasi_pembayaran &&
        req.params.makalahId
      )
    ) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Semua data diperlukan',
      });
    }
    await updatePembayaranMakalahUseCase(
      {
        nama_pengirim,
        statusPembayaran,
        category_harga_makalah,
        peruntukan,
        keterangan,
        harga,
        bank_pengirim,
        jumlah_transfer,
        tanggal_konfirmasi_pembayaran,
      },
      req.params.makalahId,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};
