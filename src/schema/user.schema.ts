import * as z from 'zod';

const contactSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/),
  email: z.email().optional(),
  address: z.string().min(10),
  pincode: z.string().regex(/^[0-9]{6}$/),
  state: z.string().min(2),
  city: z.string().min(2),
});

export const ShopOwnerSchema = contactSchema.extend({
  password: z.string().min(6),
  ownerName: z.string().min(3),
  shopName: z.string().min(5),
  shopDescription: z.string().min(5),
});

export const customerSchema = contactSchema.extend({
  name: z.string().min(3),
  password: z.string().min(6),
});

export type IShopOwnerInput = z.infer<typeof ShopOwnerSchema>;
export type ICustomerInput = z.infer<typeof customerSchema>;
