import { NextFunction, Response } from 'express';
import User from '../../models/user';
import { hashingPassword } from '../../service/password';
import { createJWTToken } from '../../utils/jwt';
import { emailPattern } from '../../utils/reqex';
import { randomString } from '../../utils/string';

export const createAdminUserUseCase = async (
  payload: {
    nama_lengkap: string;
    gender: string;
    password: string;
    pekerjaan: string;
    no_telfon: string;
    email: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!emailPattern.test(payload.email)) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Invalid email',
      });
    }
    let oldUser = await User.findOne({ email: payload.email });
    if (oldUser) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Email sudah ada',
      });
    }
    if (payload.no_telfon) {
      oldUser = await User.findOne({ no_telfon: payload.no_telfon });
      if (oldUser) {
        return res.status(400).send({
          success: false,
          data: null,
          message: 'Nomor telfon sudah ada',
        });
      }
    }
    const hashPass: any = await hashingPassword(payload.password);
    const tokenVerify = randomString(5);
    payload.password = hashPass;
    const newUser = await User.create({
      nama_lengkap: payload.nama_lengkap,
      email: payload.email,
      gender: payload.gender,
      pekerjaan: payload.pekerjaan,
      no_telfon: payload.no_telfon,
      type_user: 'admin',
      is_suspend: false,
      is_verify: true,
      password: payload.password,
      created_at: new Date(),
      token_verify: tokenVerify,
    });

    const token = createJWTToken({
      id: String(newUser._id),
      email: newUser.email,
      user_type: 'admin',
      is_verify: false,
    });

    newUser.token = token;
    await newUser.save();

    return res.send({
      success: true,
      data: newUser,
      message: 'Success create admin',
    });
  } catch (e) {
    next(e);
  }
};
