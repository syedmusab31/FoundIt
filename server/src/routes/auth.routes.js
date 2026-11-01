import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { noStore } from '../middlewares/cacheControl.js';
import { authRateLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validate.js';
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from '../validators/auth.validator.js';

export const authRouter = Router();

authRouter.use(noStore);

authRouter.post('/register', authRateLimiter, validate({ body: registerSchema }), authController.register);
authRouter.post('/verify-email', authRateLimiter, validate({ body: verifyOtpSchema }), authController.verifyEmail);
authRouter.post('/verify-email/resend', authRateLimiter, validate({ body: emailSchema }), authController.resendVerification);
authRouter.post('/login', authRateLimiter, validate({ body: loginSchema }), authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', authenticate, authController.getCurrentUser);

authRouter.post('/password/forgot', authRateLimiter, validate({ body: emailSchema }), authController.requestPasswordReset);
authRouter.post('/password/verify-otp', authRateLimiter, validate({ body: verifyOtpSchema }), authController.verifyPasswordResetOtp);
authRouter.post('/password/reset', authRateLimiter, validate({ body: resetPasswordSchema }), authController.resetPassword);
