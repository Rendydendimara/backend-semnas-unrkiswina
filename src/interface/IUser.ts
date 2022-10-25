import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId | Record<string, unknown>;
  nama_lengkap: string;
  email: string;
  gender: 'L' | 'P';
  password: string | null;
  pekerjaan: string | null;
  no_telfon: string | null;
  profile_image: string | null;
  type_user: 'peserta' | 'pemakalah' | 'admin' | 'publikasi' | 'reviewer';
  token: string | null;
  created_at: Date;
  is_suspend: boolean;
  deleted_at: Date | null;
  updated_at: Date | null;
  is_verify: boolean;
  token_verify: string | null;
  create_token_verify_at: Date | null;
  verify_at: Date | null;
  otp_reset_password: string | null;
  create_otp_reset_password_at: Date | null;
  isValidPassword: (password: string) => Promise<boolean>;
}
