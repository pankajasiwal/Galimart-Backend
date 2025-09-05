import db from '../../../config/db.js';

/**
 * Add a new shop for an existing ShopOwner
 */
export const addShopForOwner = async (ownerId: string, shopDetail: any) => {
  // Ensure owner exists
  const owner = await db.shopOwner.findUnique({ where: { id: ownerId } });
  if (!owner) throw new Error('Shop owner not found');

  // Create or reuse contact
  let contact = await db.contact.findFirst({ where: { phone: shopDetail.phone } });
  if (!contact) {
    contact = await db.contact.create({
      data: {
        address: shopDetail.address,
        city: shopDetail.city,
        pincode: parseInt(shopDetail.pincode),
        state: shopDetail.state,
        phone: shopDetail.phone,
      },
    });
  }

  //   // Add new shop entry
  //   return await db.shopOwner.create({
  //     data: {
  //       ownerName: owner.ownerName,
  //       shopName: shopDetail.shopName,
  //       shopDescription: shopDetail.shopDescription,
  //       userId: owner.userId,
  //       contact: { connect: { id: contact.id } },
  //     },
  //   });
};
