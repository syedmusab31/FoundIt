import { z } from 'zod';
import { OTP_LENGTH } from '../constants/auth.js';

const email = z.string().trim().toLowerCase().pipe(z.email('Invalid email address'));
const password = z.string().min(6, 'Password must be at least 6 characters').max(128);
const otp = z
  .string()
  .trim()
  .regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), `Code must be ${OTP_LENGTH} digits`);

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
  email,
  password,
  phone: z.string().trim().regex(/^\d{10,15}$/, 'Phone number must be 10–15 digits'),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});

export const emailSchema = z.object({ email });

export const verifyOtpSchema = z.object({ email, otp });

export const resetPasswordSchema = z.object({ email, otp, newPassword: password });
