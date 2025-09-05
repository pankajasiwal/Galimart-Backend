import type { NextFunction, Request, Response } from 'express';

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = (message: string, data?: any, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data: data || null,
    });
  };
  next();
};

declare global {
  namespace Express {
    interface Response {
      success: (message: string, data?: any, statusCode?: number) => Response;
    }
  }
}
