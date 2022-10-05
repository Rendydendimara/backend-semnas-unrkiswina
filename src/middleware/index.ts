import { Request, Response, NextFunction } from 'express';

// middleware untuk menghandle error
export const asyncErrorHandler =
  (fn: Function) => (req: Request | any, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)) // melakukan resolve
      .catch(next); // jika terjadi error
  };
