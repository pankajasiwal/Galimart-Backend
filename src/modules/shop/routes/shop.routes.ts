import express from 'express';
import { login, register } from '../controllers/shop.controller.js';

const shopRoutes = express.Router();

shopRoutes.post('/auth/signup', register);
shopRoutes.post('/auth/login', login);

export default shopRoutes;
