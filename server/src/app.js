import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { ensureDatabase } from './middlewares/ensureDatabase.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { apiRateLimiter } from './middlewares/rateLimiter.js';
import { apiRouter, healthHandler } from './routes/index.js';
import { LOCAL_UPLOAD_DIR } from './services/storage.service.js';

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: (origin, callback) => callback(null, !origin || env.clientOrigins.includes(origin)),
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Cache'],
    maxAge: 600,
  }),
);
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.use(cookieParser());
if (!env.isTest) app.use(morgan(env.isProduction ? 'combined' : 'dev'));

app.use('/uploads', express.static(LOCAL_UPLOAD_DIR, { maxAge: '7d', immutable: true, fallthrough: false }));

app.get('/', (_req, res) => res.json({ success: true, message: 'FoundIt API' }));
app.get('/api/health', healthHandler);
app.use('/api', apiRateLimiter, ensureDatabase, apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
