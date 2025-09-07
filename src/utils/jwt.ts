import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import createHttpError from 'http-errors';

const accessTokenSecret = config.AccessTokenSecret as string;
const refreshTokenSecret = config.RefreshTokenSecret as string;

type IJwtPayload = {
  userId: string;
  role: string;
};

export const generateAccessToken = (payload: IJwtPayload) => {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: IJwtPayload) => {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, accessTokenSecret);
  } catch (error) {
    throw createHttpError(401, 'Invalid Access token or experied');
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const verifiedPayload = jwt.verify(token, refreshTokenSecret);
    return verifiedPayload as IJwtPayload;
  } catch (error) {
    throw createHttpError(403, 'Invalid Refresh token or experied');
  }
};

export const generateAuthToken = (payload: IJwtPayload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken: accessToken, refreshToken: refreshToken };
};
