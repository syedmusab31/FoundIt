import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../lib/logger.js';

mongoose.set('strictQuery', true);

const globalCache = globalThis.__founditMongoose ?? { connection: null, promise: null };
globalThis.__founditMongoose = globalCache;

export const connectDatabase = async () => {
  if (globalCache.connection) return globalCache.connection;

  if (!globalCache.promise) {
    globalCache.promise = mongoose
      .connect(env.MONGODB_URI, {
        dbName: env.MONGODB_DB_NAME,
        maxPoolSize: env.isServerless ? 5 : 10,
        serverSelectionTimeoutMS: 10_000,
      })
      .then((instance) => {
        logger.info(`MongoDB connected (${instance.connection.name})`);
        return instance;
      })
      .catch((error) => {
        globalCache.promise = null;
        throw error;
      });
  }

  globalCache.connection = await globalCache.promise;
  return globalCache.connection;
};

export const disconnectDatabase = async () => {
  if (!globalCache.connection) return;
  await mongoose.disconnect();
  globalCache.connection = null;
  globalCache.promise = null;
};
