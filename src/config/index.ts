export const APP_NAME = 'SEMNAS UNKRISWINA SUMBA';
export const BASE_URL = '';

export const FRONTEND_DEV = 'http://localhost:3000';
export const FRONTEND_STAGGING = 'https://semnas-unkriswina.vercel.app';
export const FRONTEND_PRODUCTION = 'https://semnas-unkriswina.vercel.app';

export const FRONTEND_URL =
  process.env.NODE_ENV === 'development'
    ? FRONTEND_DEV
    : process.env.NODE_ENV === 'staging'
    ? FRONTEND_STAGGING
    : FRONTEND_PRODUCTION;

export const ROUNDED_SALT_BCRYPT = 11;
