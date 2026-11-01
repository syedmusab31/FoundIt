import { Router } from 'express';
import mongoose from 'mongoose';
import { authRouter } from './auth.routes.js';
import { itemRouter } from './item.routes.js';

export const healthHandler = (_req, res) => {
  res.set('Cache-Control', 'no-store').json({
    success: true,
    data: {
      status: 'ok',
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      uptime: Math.round(process.uptime()),
    },
  });
};

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/items', itemRouter);
