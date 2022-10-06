import { NextFunction, Response } from 'express';
import PembayaranMakalah from '../../models/pembayaranMakalah';

export const updatePembayaranMakalahUseCase = async (
  payload: {
    nama_pengirim: string;
    statusPembayaran: string;
    category_harga_makalah: string;
    peruntukan: string;
    keterangan: string;
    harga: string;
    bank_pengirim: string;
    jumlah_transfer: string;
    tanggal_konfirmasi_pembayaran: any;
  },
  pembayaranMakalahId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const pembayaranMakalah = await PembayaranMakalah.findById(
      pembayaranMakalahId
    );
    if (!pembayaranMakalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Pembayaran makalah tidak ditemukan',
      });
    }
    pembayaranMakalah.nama_pengirim =
      payload.nama_pengirim || pembayaranMakalah.nama_pengirim;
    pembayaranMakalah.status =
      payload.statusPembayaran || pembayaranMakalah.status;
    pembayaranMakalah.category_harga_makalah =
      payload.category_harga_makalah ||
      pembayaranMakalah.category_harga_makalah;
    pembayaranMakalah.peruntukan =
      payload.peruntukan || pembayaranMakalah.peruntukan;
    pembayaranMakalah.keterangan =
      payload.keterangan || pembayaranMakalah.keterangan;
    pembayaranMakalah.harga = payload.harga || pembayaranMakalah.harga;
    pembayaranMakalah.bank_pengirim =
      payload.bank_pengirim || pembayaranMakalah.bank_pengirim;
    pembayaranMakalah.jumlah_transfer =
      payload.jumlah_transfer || pembayaranMakalah.jumlah_transfer;
    pembayaranMakalah.tanggal_konfirmasi_pembayaran =
      payload.tanggal_konfirmasi_pembayaran ||
      pembayaranMakalah.tanggal_konfirmasi_pembayaran;

    await pembayaranMakalah.save();
    return res.send({
      success: true,
      data: pembayaranMakalah,
      message: 'Success update pembayaran makalah',
    });
  } catch (e) {
    next(e);
  }
};

export const updateStatusPembayaranMakalahUseCase = async (
  statusPembayaran: string,
  pembayaranMakalahId: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const pembayaranMakalah = await PembayaranMakalah.findById(
      pembayaranMakalahId
    );
    if (!pembayaranMakalah) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Pembayaran makalah tidak ditemukan',
      });
    }
    pembayaranMakalah.status = statusPembayaran;
    pembayaranMakalah.updated_at = new Date();
    await pembayaranMakalah.save();

    return res.send({
      success: true,
      data: pembayaranMakalah,
      message: 'Success change status pembayaran makalah',
    });
  } catch (e) {
    next(e);
  }
};
