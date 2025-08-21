import express from 'express';
import shopRoutes from '../../modules/shop/routes/shop.routes.js';
import customerRoutes from '../../modules/customer/routes/customer.routes.js';

const v1Routes = express.Router();

v1Routes.use('/v1/shop', shopRoutes);
v1Routes.use('/v1/customer', customerRoutes);

export default v1Routes;
