import type { Response, Request, NextFunction } from 'express';
import { ShopOwnerSchema } from '../../../schema/user.schema.js';
import { registerShopOwner, loginShopUser } from '../services/shopAuth.services.js';
import createHttpError from 'http-errors';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedValues = ShopOwnerSchema.parse(req.body);

    if (validatedValues) {
      const response = await registerShopOwner(validatedValues);

      return res.success('Successfully Registered', response, 201);
    }
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      throw createHttpError(400, 'Phone and password are required');
    }

    const response = await loginShopUser(phone, password);

    return res.success('Login successful', response, 200);
  } catch (error) {
    next(error);
  }
};
