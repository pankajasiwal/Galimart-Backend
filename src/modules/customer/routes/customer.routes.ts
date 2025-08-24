import express from 'express';

const customerRoutes = express.Router();

customerRoutes.get('/auth', (req, res) => {
  return res.json({ message: 'customer authenticated' });
});

export default customerRoutes;
