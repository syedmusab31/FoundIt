import { env } from '../config/env.js';
import { mailTransport } from '../config/mailer.js';
import { logger } from '../lib/logger.js';

const sendEmail = async ({ to, subject, html, text }) => {
  if (!mailTransport) {
    logger.warn(`SMTP not configured — email "${subject}" to ${to} was not sent`);
    return;
  }
  await mailTransport.sendMail({
    from: env.SENDER_EMAIL ?? env.SMTP_USER,
    to,
    subject,
    html,
    text,
  });
};

export const emailService = {
  sendVerificationCode: (to, otp) =>
    sendEmail({
      to,
      subject: 'Verify your FoundIt account',
      html: `<p>Your verification code is <strong>${otp}</strong>.</p><p>It expires in 30 minutes.</p>`,
    }),

  sendPasswordResetCode: (to, otp) =>
    sendEmail({
      to,
      subject: 'Your FoundIt password reset code',
      html: `
        <p>You requested to reset your password.</p>
        <p>Your reset code is <strong>${otp}</strong>. It expires in 15 minutes.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    }),

  sendPasswordChanged: (to) =>
    sendEmail({
      to,
      subject: 'Your FoundIt password was changed',
      text: `Your password was updated successfully. If this wasn't you, reset your password at ${env.CLIENT_URL}/forgot-password immediately.`,
    }),
};
