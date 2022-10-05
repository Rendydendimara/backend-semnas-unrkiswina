import { NextFunction, Response, Request } from 'express';
import { emailPattern } from '../../utils/reqex';
import User from '../../models/user';
import {
  serviceSendEmailRegister,
  sendEmailResetPassword,
} from '../../service/email/auth';
import { createJWTToken } from '../../utils/jwt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/jwt';
import { hashingPassword } from '../../service/password';
import { randomString } from '../../utils/string';
import moment from 'moment';

export const resigterUserUseCase = async (
  payload: {
    nama_lengkap: string;
    gender: string;
    password: string;
    pekerjaan: string;
    no_telfon: string;
    email: string;
    type_user: string;
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
      type_user: payload.type_user,
      is_suspend: false,
      is_verify: false,
      password: payload.password,
      created_at: new Date(),
      token_verify: tokenVerify,
    });

    const token = createJWTToken({
      id: String(newUser._id),
      email: newUser.email,
      user_type: payload.type_user,
      is_verify: false,
    });

    newUser.token = token;
    await newUser.save();
    await serviceSendEmailRegister({
      username: payload.nama_lengkap,
      email: payload.email,
      userId: newUser._id,
      tokenVerify: tokenVerify,
    });
    return res.send({
      success: true,
      data: newUser,
      message: 'Success register',
    });
  } catch (e) {
    next(e);
  }
};

export const loginUseCase = async (
  payload: {
    email: string;
    password: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      email: payload.email,
      is_suspend: false,
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Email atau password salah',
      });
    }
    const validate: boolean = await user.isValidPassword(payload.password);

    if (!validate) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Email atau password salah',
      });
    }

    const token = createJWTToken({
      id: String(user._id),
      email: user.email,
      user_type: user.type_user,
      is_verify: user.is_verify,
    });

    user.token = token;
    user.save(); // save after add user token, running on

    return res.send({
      success: true,
      data: user,
      message: 'Success login',
    });
  } catch (e) {
    next(e);
  }
};

export const chekUserLoginUseCase = async (
  token: string,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ token: token });

  if (!user) {
    return res.status(400).send({
      success: false,
      data: null,
      message: 'Token tidak valid',
    });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    return res.status(200).send({
      success: true,
      data: user,
      message: 'Login success',
    });
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Token kedaluwarsa',
      });
    }
    next(err);
  }
};

export const logoutUserUseCase = async (
  userId: string,
  res: Response,
  next: NextFunction
) => {
  // check if user already exist
  const oldUser = await User.findById(userId);
  if (oldUser) {
    oldUser.token = '';
    oldUser.save();
    return res.send({
      success: true,
      data: null,
      message: 'Success logout',
    });
  } else {
    return res.status(400).send({
      success: true,
      data: null,
      message: 'Error logout',
    });
  }
};

export const verifyUserUseCase = async (
  payload: {
    userId: string;
    tokenVerify: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      _id: payload.userId,
      token_verify: payload.tokenVerify,
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Token verify tidak valid',
      });
    }
    if (user.is_verify) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'User sudah terverifikasi',
      });
    }
    user.is_verify = true;
    user.verify_at = new Date();
    user.updated_at = new Date();
    await user.save();
    return res.status(200).send({
      success: true,
      data: user,
      message: 'Berhasil verifikasi',
    });
  } catch (err) {
    next(err);
  }
};

export const sendOTPResetPasswordUserUseCase = async (
  email: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      email: email,
      is_suspend: false,
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'User tidak ditemukan',
      });
    }

    if (user.create_otp_reset_password_at) {
      if (!moment(new Date()).isAfter(user.create_otp_reset_password_at)) {
        return res.status(400).send({
          success: false,
          data: null,
          message:
            'Tunggu beberapa saat untuk melakukan request reset password',
        });
      }
    }

    user.otp_reset_password = randomString(5);
    user.create_otp_reset_password_at = moment(new Date())
      .add(10, 'minutes')
      .toDate();
    await user.save();

    await sendEmailResetPassword({
      username: user.nama_lengkap,
      email: user.email,
      userId: user._id,
      otpResetPassword: user.otp_reset_password,
    });

    return res.status(200).send({
      success: true,
      data: null,
      message: 'Berhasil kirim link reset password',
    });
  } catch (err) {
    next(err);
  }
};

export const verifyResetPasswordUserUseCase = async (
  payload: {
    email: string;
    password: string;
    otpResetPassword: string;
  },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      email: payload.email,
      is_suspend: false,
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'User tidak ditemukan',
      });
    }

    if (user.otp_reset_password !== payload.otpResetPassword) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'OTP Reset password salah',
      });
    }
    const hashPass: any = await hashingPassword(payload.password);
    user.password = hashPass;
    user.otp_reset_password = null;
    user.create_otp_reset_password_at = null;
    await user.save();

    return res.status(200).send({
      success: true,
      data: null,
      message: 'Berhasil reset password',
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfileUserUseCase = async (
  payload: {
    nama_lengkap: string;
    gender: 'L' | 'P';
    pekerjaan: string;
    no_telfon: string;
  },
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = await User.findOne({
      _id: req.user.user_id,
      is_suspend: false,
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'User tidak ditemukan',
      });
    }
    if (payload.no_telfon && user.no_telfon !== payload.no_telfon) {
      let userNomorTelfon = await User.findOne({
        no_telfon: payload.no_telfon,
      });
      if (userNomorTelfon) {
        return res.status(400).send({
          success: false,
          data: null,
          message: 'Nomor telfon sudah ada',
        });
      }
    }

    user.nama_lengkap = payload.nama_lengkap || user.nama_lengkap;
    user.gender = payload.gender || user.gender;
    user.pekerjaan = payload.pekerjaan || user.pekerjaan;
    user.no_telfon = payload.no_telfon || user.no_telfon;

    if (req.file) {
      const port = process.env.PORT || '8080';
      const imagePath =
        process.env.NODE_ENV === 'development'
          ? `${req.protocol}://${req.hostname}:${port}/${req.file.path}`
          : `${req.protocol}://${req.hostname}/${req.file.path}`;

      user.profile_image = imagePath || user.profile_image;
    }

    await user.save();

    return res.send({
      success: true,
      data: user,
      message: 'Success update profile user',
    });
  } catch (e) {
    next(e);
  }
};
