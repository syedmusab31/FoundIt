import { env } from '../config/env.js';
import { AUTH_COOKIE_NAME } from '../constants/auth.js';
import { authService } from '../services/auth.service.js';
import { sendSuccess } from '../utils/sendResponse.js';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = () => ({
  httpOnly: true,
  secure: env.isProduction || env.COOKIE_SAME_SITE === 'none',
  sameSite: env.COOKIE_SAME_SITE,
  path: '/',
});

export const authController = {
  async register(req, res) {
    const { emailSent } = await authService.register(req.validated.body);
    sendSuccess(res, {
      statusCode: 201,
      message: emailSent
        ? 'Account created. A verification code has been sent to your email.'
        : 'Account created, but the verification email could not be sent. Please request a new code.',
      data: { emailSent },
    });
  },

  async verifyEmail(req, res) {
    await authService.verifyEmail(req.validated.body);
    sendSuccess(res, { message: 'Email verified successfully. You can now sign in.' });
  },

  async resendVerification(req, res) {
    await authService.resendVerification(req.validated.body);
    sendSuccess(res, {
      message: 'If the account exists and is not yet verified, a new code has been sent.',
    });
  },

  async login(req, res) {
    const { token, user } = await authService.login(req.validated.body);
    res.cookie(AUTH_COOKIE_NAME, token, { ...cookieOptions(), maxAge: SEVEN_DAYS_MS });
    sendSuccess(res, { message: 'Signed in successfully', data: { user } });
  },

  logout(_req, res) {
    res.clearCookie(AUTH_COOKIE_NAME, cookieOptions());
    sendSuccess(res, { message: 'Signed out successfully' });
  },

  async getCurrentUser(req, res) {
    const user = await authService.getProfile(req.user.id);
    sendSuccess(res, { data: { user } });
  },

  async requestPasswordReset(req, res) {
    await authService.requestPasswordReset(req.validated.body);
    sendSuccess(res, { message: 'If an account exists for this email, a reset code has been sent.' });
  },

  async verifyPasswordResetOtp(req, res) {
    await authService.verifyPasswordResetOtp(req.validated.body);
    sendSuccess(res, { message: 'Code verified' });
  },

  async resetPassword(req, res) {
    await authService.resetPassword(req.validated.body);
    sendSuccess(res, { message: 'Password reset successfully. You can now sign in.' });
  },
};
