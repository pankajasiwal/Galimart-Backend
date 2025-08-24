import type { Response, Request, NextFunction } from 'express';
import { ShopOwnerSchema } from '../../../schema/user.schema.js';
import { createShopUser } from '../services/shopAuth.services.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedValues = ShopOwnerSchema.parse(req.body);

    if (validatedValues) {
      const shopUser = await createShopUser(validatedValues);

      return res.status(201).json({ sucess: true, message: 'Successfully Register', response: shopUser });
    }
  } catch (error) {
    next(error);
  }
};

export const login = (req: Request, res: Response) => {};
