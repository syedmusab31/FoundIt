import mongoose from 'mongoose';
import { z } from 'zod';
import { ITEM_CATEGORIES, ITEM_STATUSES, ITEM_TYPES, PROVINCES } from '../constants/items.js';

const emptyToUndefined = (value) => (value === '' ? undefined : value);

export const itemIdParamsSchema = z.object({
  id: z.string().refine((value) => mongoose.isValidObjectId(value), 'Invalid item id'),
});

export const createItemSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(120),
  description: z.string().trim().min(10, 'Description must be at least 10 characters').max(2000),
  category: z.enum(ITEM_CATEGORIES, { error: 'Select a valid category' }),
  province: z.enum(PROVINCES, { error: 'Select a valid province' }),
  type: z.enum(ITEM_TYPES, { error: 'Type must be "lost" or "found"' }),
  phone: z.string().trim().regex(/^\+?\d{10,15}$/, 'Phone number must be 10–15 digits'),
});

export const updateItemStatusSchema = z.object({
  status: z.enum(ITEM_STATUSES),
});

export const listItemsQuerySchema = z.object({
  type: z.preprocess(emptyToUndefined, z.enum(ITEM_TYPES).optional()),
  q: z.preprocess(emptyToUndefined, z.string().trim().max(100).optional()),
  category: z.preprocess(emptyToUndefined, z.string().trim().max(60).optional()),
  province: z.preprocess(emptyToUndefined, z.string().trim().max(60).optional()),
  date: z.preprocess(
    emptyToUndefined,
    z.iso.date({ error: 'Date must be in YYYY-MM-DD format' }).optional(),
  ),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export const listMyItemsQuerySchema = z.object({
  status: z.preprocess(emptyToUndefined, z.enum(ITEM_STATUSES).optional()),
  type: z.preprocess(emptyToUndefined, z.enum(ITEM_TYPES).optional()),
});
