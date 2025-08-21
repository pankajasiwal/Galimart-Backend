import express from 'express';

const shopRoutes = express.Router();

shopRoutes.get('/', (req, res) => {
  return res.json({ message: 'Working' });
});

export default shopRoutes;
