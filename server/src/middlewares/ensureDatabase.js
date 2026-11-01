import { connectDatabase } from '../config/database.js';

export const ensureDatabase = async (_req, _res, next) => {
  await connectDatabase();
  next();
};
