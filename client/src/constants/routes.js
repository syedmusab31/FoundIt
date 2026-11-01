export const ROUTES = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  LOST_ITEMS: '/lost',
  FOUND_ITEMS: '/found',
  NEW_LOST_ITEM: '/lost/new',
  NEW_FOUND_ITEM: '/found/new',
  ITEM_DETAIL: '/items/:itemId',
  DASHBOARD: '/dashboard',
});

export const buildItemDetailPath = (itemId) => `/items/${itemId}`;
