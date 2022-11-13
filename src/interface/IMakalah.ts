import { Types } from 'mongoose';

export interface IMakalah {
  _id: Types.ObjectId | Record<string, unknown>;
  judul_makalah: string;
  file_pdf_makalah: string;
  file_word_makalah: string;
  category: Types.ObjectId | Record<string, unknown>;
  user: Types.ObjectId | Record<string, unknown>;
  keterangan: string;
  status_makalah: string;
  created_at: Date;
  is_suspend: boolean;
  is_deleted: boolean;
  deleted_at: Date | null;
  updated_at: Date | null;
  reviewer: Types.ObjectId | Record<string, unknown> | null;
  feedback: string | null;
  score: number | null;
  file_reviwer_makalah: string | null;
  kode_makalah: string | null;
  metadata: string[] | null;
  is_reviewed: boolean | null;
  reviewed_at: Date | null;
  file_loa_makalah: string | null;
  last_date_send_loa: Date | null;
}
