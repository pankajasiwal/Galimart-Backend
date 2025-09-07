import createHttpError from 'http-errors';
import db from '../../../config/db.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../../utils/jwt.js';
import type { Prisma, PrismaClient } from '@prisma/client';

export const rotateRefreshToken = async (
  payload: { userId: string; role: string },
  prismaClient: Prisma.TransactionClient | PrismaClient = db,
) => {
  try {
    const accessToken = generateAccessToken({ userId: payload.userId, role: payload.role });
    const refreshToken = generateRefreshToken({ userId: payload.userId, role: payload.role });

    await prismaClient.refreshToken.deleteMany({ where: { userId: payload.userId } });
    await prismaClient.refreshToken.create({
      data: { token: refreshToken, userId: payload.userId },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw createHttpError(500, 'Failed to rotate refresh token');
  }
};

export const verifyAndRotateRefreshToken = async (refreshToken: string) => {
  try {
    // Check token exists in DB
    const oldRefreshToken = await db.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!oldRefreshToken) throw createHttpError(403, 'Invalid refresh token');

    // Verify signature + expiration
    const payload = verifyRefreshToken(refreshToken);
    if (typeof payload === 'string' || !payload.userId || !payload.role) {
      throw createHttpError(403, 'Invalid refresh token payload');
    }

    // Rotate using normal db client
    return rotateRefreshToken({ userId: payload.userId, role: payload.role }, db);
  } catch (error) {
    throw error;
  }
};
