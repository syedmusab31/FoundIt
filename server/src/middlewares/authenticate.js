import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AUTH_COOKIE_NAME } from '../constants/auth.js';
import { ApiError } from '../utils/ApiError.js';

const extractToken = (req) => {
  const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];
  if (cookieToken) return cookieToken;
  const header = req.get('authorization');
  return header?.startsWith('Bearer ') ? header.slice(7) : null;
};

export const authenticate = (req, _res, next) => {
  const token = extractToken(req);
  if (!token) throw ApiError.unauthorized();

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch (error) {
    const message = error.name === 'TokenExpiredError' ? 'Session expired' : 'Invalid session';
    throw ApiError.unauthorized(message);
  }
};
