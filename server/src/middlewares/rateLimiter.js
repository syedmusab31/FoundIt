import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';

const buildLimiter = ({ windowMs, limit }) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skip: () => env.isTest,
    message: { success: false, message: 'Too many requests, please try again later.' },
  });

export const apiRateLimiter = buildLimiter({ windowMs: 15 * 60 * 1000, limit: 300 });

export const authRateLimiter = buildLimiter({ windowMs: 15 * 60 * 1000, limit: 20 });
