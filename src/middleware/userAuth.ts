import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/jwt';
import User from '../models/user';

// handle verify token
export const isAuth =
  (type?: string) =>
  async (req: Request | any, res: Response, next: NextFunction) => {
    const token =
      req.headers['semnasunkriswinasumba-token'] || req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        success: false,
        data: null,
        message: 'Token diperlukan untuk otentikasi',
      });
    }
    try {
      const user = await User.findOne({ token: token });
      if (!user) {
        return res.status(401).send({
          success: false,
          data: null,
          message: 'Pengguna tidak login',
        });
      }
      const decoded = jwt.verify(token, JWT_SECRET);
      if (type) {
        if (user.type_user !== type) {
          return res.status(401).send({
            success: false,
            data: null,
            message: 'Akses ditolak',
          });
        }
      }
      req.user = decoded;
    } catch (err) {
      if (err.message === 'jwt expired') {
        return res.status(401).send({
          success: false,
          data: null,
          message: 'Token kedaluwarsa',
        });
      }
      return res.status(401).send({
        success: false,
        data: null,
        message: err.message,
      });
    }
    return next();
  };
