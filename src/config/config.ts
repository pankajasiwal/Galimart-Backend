import { config as conf } from 'dotenv';

conf();

const _config = {
  PORT: process.env.PORT,
  env: process.env.NODE_ENV,
  AccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  RefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

export const config = Object.freeze(_config);
