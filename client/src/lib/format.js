import { env } from '../config/env';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export const formatDate = (value) => (value ? dateFormatter.format(new Date(value)) : '');

export const formatCount = (value) => new Intl.NumberFormat('en-US').format(value ?? 0);

export const resolveAssetUrl = (path) => {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  return `${env.apiOrigin}${path.startsWith('/') ? path : `/${path}`}`;
};

export const toWhatsAppLink = (phone) => {
  const digits = (phone ?? '').replace(/\D/g, '');
  const international = digits.startsWith('0') ? `92${digits.slice(1)}` : digits;
  return `https://wa.me/${international}`;
};
