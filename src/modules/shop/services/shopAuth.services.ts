import { Role } from '../../../../generated/prisma/index.js';
import db from '../../../config/db.js';
import type { IShopOwnerInput } from '../../../schema/user.schema.js';

export const createShopUser = async (userDetail: IShopOwnerInput) => {
  const user = await db.shopOwner.create({
    data: {
      ownerName: userDetail.ownerName,
      shopName: userDetail.shopName,
      shopDescription: userDetail.shopDescription,
      user: {
        create: {
          password: userDetail.password,
          role: Role.SHOP_OWNER,
        },
      },
      contact: {
        create: {
          address: userDetail.address,
          city: userDetail.city,
          pincode: parseInt(userDetail.pincode),
          state: userDetail.state,
          phone: userDetail.phone,
        },
      },
    },
    include: {
      user: true,
    },
  });

  return user;
};
