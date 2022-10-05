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
}
