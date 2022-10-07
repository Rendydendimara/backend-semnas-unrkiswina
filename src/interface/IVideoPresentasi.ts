import { Types } from 'mongoose';

export interface IVideoPresentasi {
  _id: Types.ObjectId | Record<string, unknown>;
  status: string;
  user: Types.ObjectId | Record<string, unknown>;
  makalah: Types.ObjectId | Record<string, unknown>;
  keterangan: string;
  link_video: string;
  created_at: Date;
  is_deleted: boolean;
  deleted_at: Date | null;
  updated_at: Date | null;
}
