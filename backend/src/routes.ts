import { Router } from 'express';
import { authRouter } from './controllers/auth';
import { catalogRouter } from './controllers/catalog';
import { ordersRouter } from './controllers/orders';
import { recommendationsRouter } from './controllers/recommendations';

export const router = Router();

router.use('/auth', authRouter);
router.use('/catalog', catalogRouter);
router.use('/orders', ordersRouter);
router.use('/recommendations', recommendationsRouter);


