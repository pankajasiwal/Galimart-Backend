import createHttpError from 'http-errors';
import { Role } from '../../../../generated/prisma/index.js';
import db from '../../../config/db.js';
import type { IShopOwnerInput } from '../../../schema/user.schema.js';
import { hashPassword, validatePassword } from '../../../utils/passwordUtils.js';
import { generateAuthToken } from '../../../utils/jwt.js';
import { rotateRefreshToken } from '../../shared/services/jwt.service.js';

export const registerShopOwner = async (userDetail: IShopOwnerInput) => {
  return db.$transaction(async (tsx) => {
    // Check if this user (via phone) already exists
    const existing = await tsx.shopOwner.findFirst({
      where: {
        ownerName: userDetail.ownerName,
        contact: { phone: userDetail.phone },
      },
    });

    if (existing) {
      throw createHttpError(409, 'Shop owner with this name and phone already exists');
    }

    // Create Contact
    const contact = await tsx.contact.create({
      data: {
        address: userDetail.address,
        city: userDetail.city,
        pincode: parseInt(userDetail.pincode),
        state: userDetail.state,
        phone: userDetail.phone,
      },
    });

    // Create ShopOwner + User
    const shopOwner = await tsx.shopOwner.create({
      data: {
        ownerName: userDetail.ownerName,
        shopName: userDetail.shopName,
        shopDescription: userDetail.shopDescription,
        user: {
          create: {
            password: await hashPassword(userDetail.password),
            role: Role.SHOP_OWNER,
          },
        },
        contact: {
          connect: { id: contact.id },
        },
      },
      include: {
        user: { select: { id: true, role: true } },
        contact: true,
      },
    });

    const authTokens = await rotateRefreshToken({ userId: shopOwner.userId, role: shopOwner.user.role }, tsx);

    return { shopOwner, ...authTokens };
  });
};

export const loginShopUser = async (phone: string, password: string) => {
  return db.$transaction(async (tsx) => {
    // Find shop owner by phone
    const shopOwner = await tsx.shopOwner.findFirst({
      where: { contact: { phone } },
      include: { user: true, contact: true },
    });

    if (!shopOwner) {
      throw createHttpError(404, 'Shop owner not found');
    }

    // Compare password
    const hashedPassword = shopOwner.user.password;
    const isMatch = await validatePassword({ password, hashedPassword });
    if (!isMatch) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const authTokens = await rotateRefreshToken({ userId: shopOwner.userId, role: shopOwner.user.role }, tsx);

    return {
      shopOwner,
      ...authTokens,
    };
  });
};
