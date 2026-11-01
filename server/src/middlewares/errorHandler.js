import mongoose from 'mongoose';
import multer from 'multer';
import { env } from '../config/env.js';
import { logger } from '../lib/logger.js';
import { ApiError } from '../utils/ApiError.js';

const normalizeError = (error) => {
  if (error instanceof ApiError) return error;

  if (error instanceof multer.MulterError) {
    const message =
      error.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5 MB or smaller' : error.message;
    return ApiError.badRequest(message, { code: error.code });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const details = Object.values(error.errors).map((issue) => ({
      field: issue.path,
      message: issue.message,
    }));
    return ApiError.badRequest(details[0]?.message ?? 'Invalid data', {
      code: 'VALIDATION_ERROR',
      details,
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return ApiError.badRequest(`Invalid value for ${error.path}`);
  }

  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern ?? {})[0] ?? 'field';
    return ApiError.conflict(`An account with this ${field} already exists`, {
      code: 'DUPLICATE_KEY',
    });
  }

  if (error?.type === 'entity.parse.failed') {
    return ApiError.badRequest('Malformed JSON body');
  }

  const status = error?.statusCode ?? error?.status;
  if (Number.isInteger(status) && status >= 400 && status < 500) {
    return new ApiError(status, status === 404 ? 'Resource not found' : error.message);
  }

  return new ApiError(500, 'Internal server error');
};

export const notFoundHandler = (req, _res, next) => {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
};

export const errorHandler = (error, req, res, _next) => {
  const apiError = normalizeError(error);

  if (apiError.statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} failed`, error);
  }

  const body = { success: false, message: apiError.message };
  if (apiError.code) body.code = apiError.code;
  if (apiError.details) body.details = apiError.details;
  if (!env.isProduction && apiError.statusCode >= 500) body.stack = error.stack;

  res.status(apiError.statusCode).json(body);
};
