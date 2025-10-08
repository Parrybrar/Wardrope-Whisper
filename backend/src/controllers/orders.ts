import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware';

export const ordersRouter = Router();

const orders: Array<{ id: string; userId: string; items: Array<{ productId: string; qty: number }>; total: number }> = [];

ordersRouter.use(requireAuth);

ordersRouter.get('/', (req: AuthRequest, res) => {
  const userOrders = orders.filter(o => o.userId === req.userId);
  res.json(userOrders);
});

ordersRouter.post('/', (req: AuthRequest, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  const total = Number(req.body?.total ?? 0);
  const id = `${Date.now()}`;
  const order = { id, userId: req.userId as string, items, total };
  orders.push(order);
  res.status(201).json(order);
});


