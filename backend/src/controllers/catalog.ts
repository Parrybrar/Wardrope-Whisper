import { Router } from 'express';

export const catalogRouter = Router();

const catalog = [
  { id: '1', name: 'Classic Tee', price: 19.99, sizes: ['S','M','L'], image: '' },
  { id: '2', name: 'Denim Jacket', price: 79.99, sizes: ['M','L','XL'], image: '' },
  { id: '3', name: 'Chino Pants', price: 49.99, sizes: ['S','M','L','XL'], image: '' },
];

catalogRouter.get('/', (_req, res) => {
  res.json(catalog);
});

catalogRouter.get('/:id', (req, res) => {
  const item = catalog.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});


