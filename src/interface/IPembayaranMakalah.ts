import { Types } from 'mongoose';

export interface IPembayaranMakalah {
  _id: Types.ObjectId | Record<string, unknown>;
  status: string;
  category_harga_makalah: string;
  peruntukan: string;
  user: Types.ObjectId | Record<string, unknown>;
  makalah: Types.ObjectId | Record<string, unknown>;
  keterangan: string;
  harga: string;
  bank_pengirim: string;
  nama_pengirim: string;
  jumlah_transfer: string;
  bukti_transfer: string; // link file bukti transfer
  tanggal_konfirmasi_pembayaran: Date;
  created_at: Date;
  deleted_at: Date | null;
  updated_at: Date | null;
}
