import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { generateAuthToken, verifyRefreshToken } from '../../../utils/jwt.js';
import { verifyAndRotateRefreshToken } from '../services/jwt.service.js';

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createHttpError(400, 'Refresh token is required');

    const tokens = await verifyAndRotateRefreshToken(refreshToken);

    return res.success('Token refreshed', tokens, 200);
  } catch (error) {
    next(error);
  }
};
