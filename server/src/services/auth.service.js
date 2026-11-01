import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import {
  BCRYPT_SALT_ROUNDS,
  EMAIL_VERIFICATION_OTP_TTL_MS,
  PASSWORD_RESET_OTP_TTL_MS,
} from '../constants/auth.js';
import { cache, CacheNamespace } from '../lib/cache.js';
import { logger } from '../lib/logger.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { generateOtp, hashOtp, isOtpValid } from '../utils/otp.js';
import { emailService } from './email.service.js';

const PROFILE_TTL_SECONDS = 300;

const issueOtp = (ttlMs) => {
  const otp = generateOtp();
  return { otp, hash: hashOtp(otp), expiresAt: Date.now() + ttlMs };
};

const findUserWithSecrets = (email, fields) => User.findOne({ email }).select(fields);

const invalidateProfile = (userId) => cache.delete(CacheNamespace.USERS, String(userId));

export const authService = {
  async register({ name, email, password, phone }) {
    if (await User.exists({ email })) {
      throw ApiError.conflict('Email is already registered', { code: 'EMAIL_TAKEN' });
    }
    if (await User.exists({ phone })) {
      throw ApiError.conflict('Phone number is already registered', { code: 'PHONE_TAKEN' });
    }

    const { otp, hash, expiresAt } = issueOtp(EMAIL_VERIFICATION_OTP_TTL_MS);
    await User.create({
      name,
      email,
      phone,
      password: await bcrypt.hash(password, BCRYPT_SALT_ROUNDS),
      verifyOtp: hash,
      verifyOtpExpireAt: expiresAt,
    });

    try {
      await emailService.sendVerificationCode(email, otp);
      return { emailSent: true };
    } catch (error) {
      logger.error('Failed to send verification email', error);
      return { emailSent: false };
    }
  },

  async verifyEmail({ email, otp }) {
    const user = await findUserWithSecrets(email, '+verifyOtp +verifyOtpExpireAt');
    if (!user) throw ApiError.badRequest('Invalid or expired verification code');
    if (user.isVerified) return;

    if (!isOtpValid(otp, user.verifyOtp, user.verifyOtpExpireAt)) {
      throw ApiError.badRequest('Invalid or expired verification code');
    }

    user.isVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();
    await invalidateProfile(user._id);
  },

  async resendVerification({ email }) {
    const user = await User.findOne({ email });
    if (!user || user.isVerified) return;

    const { otp, hash, expiresAt } = issueOtp(EMAIL_VERIFICATION_OTP_TTL_MS);
    await User.updateOne({ _id: user._id }, { verifyOtp: hash, verifyOtpExpireAt: expiresAt });
    await emailService.sendVerificationCode(email, otp);
  },

  async login({ email, password }) {
    const user = await User.findOne({ email }).select('+password');
    const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !passwordMatches) {
      throw ApiError.unauthorized('Invalid email or password', { code: 'INVALID_CREDENTIALS' });
    }
    if (!user.isVerified) {
      throw ApiError.forbidden('Please verify your email before signing in', {
        code: 'EMAIL_NOT_VERIFIED',
      });
    }

    const token = jwt.sign({ id: user._id.toString() }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    return { token, user: user.toJSON() };
  },

  async getProfile(userId) {
    const { value } = await cache.remember(
      CacheNamespace.USERS,
      String(userId),
      PROFILE_TTL_SECONDS,
      async () => {
        const user = await User.findById(userId);
        return user ? user.toJSON() : null;
      },
    );
    if (!value) throw ApiError.unauthorized('Account no longer exists');
    return value;
  },

  async requestPasswordReset({ email }) {
    const user = await User.findOne({ email });
    if (!user) return;

    const { otp, hash, expiresAt } = issueOtp(PASSWORD_RESET_OTP_TTL_MS);
    await User.updateOne({ _id: user._id }, { resetOtp: hash, resetOtpExpireAt: expiresAt });
    await emailService.sendPasswordResetCode(email, otp);
  },

  async verifyPasswordResetOtp({ email, otp }) {
    const user = await findUserWithSecrets(email, '+resetOtp +resetOtpExpireAt');
    if (!user || !isOtpValid(otp, user.resetOtp, user.resetOtpExpireAt)) {
      throw ApiError.badRequest('Invalid or expired reset code');
    }
  },

  async resetPassword({ email, otp, newPassword }) {
    const user = await findUserWithSecrets(email, '+resetOtp +resetOtpExpireAt');
    if (!user || !isOtpValid(otp, user.resetOtp, user.resetOtpExpireAt)) {
      throw ApiError.badRequest('Invalid or expired reset code');
    }

    user.password = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    await user.save();
    await invalidateProfile(user._id);

    emailService
      .sendPasswordChanged(email)
      .catch((error) => logger.warn(`Password-changed email failed: ${error.message}`));
  },
};
