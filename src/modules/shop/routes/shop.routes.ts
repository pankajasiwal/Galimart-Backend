import express from 'express';
import { login, register } from '../controllers/shop.controller.js';
import { refreshToken } from '../../shared/controller/auth.js';

const shopRoutes = express.Router();

shopRoutes.post('/auth/signup', register);
shopRoutes.post('/auth/login', login);
shopRoutes.post('/auth/refresh', refreshToken);

export default shopRoutes;
