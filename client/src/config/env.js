const apiUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

const apiOrigin = /^https?:\/\//i.test(apiUrl) ? new URL(apiUrl).origin : '';

export const env = Object.freeze({
  apiUrl,
  apiOrigin,
});
