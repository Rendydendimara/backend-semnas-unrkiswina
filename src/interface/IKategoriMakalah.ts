import { Types } from 'mongoose';

export interface IKategoriMakalah {
  _id: Types.ObjectId | Record<string, unknown>;
  category_name: string;
  created_at: Date;
  deleted_at: Date | null;
  updated_at: Date | null;
}
