import crypto from 'node:crypto';
import { OTP_LENGTH } from '../constants/auth.js';

export const generateOtp = () =>
  crypto.randomInt(0, 10 ** OTP_LENGTH).toString().padStart(OTP_LENGTH, '0');

export const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex');

export const isOtpValid = (otp, storedHash, expiresAt) => {
  if (!otp || !storedHash || !expiresAt || Date.now() > expiresAt) return false;
  const candidate = Buffer.from(hashOtp(otp), 'hex');
  const expected = Buffer.from(storedHash, 'hex');
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
};
