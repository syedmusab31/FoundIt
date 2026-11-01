export const ITEM_TYPE = Object.freeze({ LOST: 'lost', FOUND: 'found' });

export const ITEM_STATUS = Object.freeze({ ACTIVE: 'active', RESOLVED: 'resolved' });

export const ITEM_CATEGORIES = Object.freeze([
  { name: 'Electronics', icon: '📱' },
  { name: 'Documents', icon: '📄' },
  { name: 'Keys', icon: '🔑' },
  { name: 'Bags', icon: '🎒' },
  { name: 'Jewelry', icon: '💍' },
  { name: 'Clothing & Accessories', icon: '👕' },
  { name: 'Pets', icon: '🐾' },
  { name: 'Sports Equipment', icon: '⚽' },
  { name: 'Books & Stationery', icon: '📚' },
  { name: 'Medical Items', icon: '💊' },
  { name: 'Other', icon: '📦' },
]);

export const PROVINCES = Object.freeze([
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad',
  'Gilgit-Baltistan',
  'Kashmir',
]);

export const ITEMS_PAGE_SIZE = 12;

export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
