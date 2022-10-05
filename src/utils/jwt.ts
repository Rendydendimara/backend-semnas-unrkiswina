import { JWT_EXPIRES_IN } from '../config/jwt';
import { JWT_SECRET } from '../config/jwt';
import jwt from 'jsonwebtoken';

export const createJWTToken = (user: {
  id: string;
  email: string;
  is_verify: boolean;
  user_type: string;
}) =>
  jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      user_type: user.user_type,
      is_verify: user.is_verify,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN, // token expires 2 hour
    }
  );
