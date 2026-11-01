import mongoose from 'mongoose';
import { ITEM_STATUSES, ITEM_TYPES } from '../constants/items.js';

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    imagePublicId: { type: String },
    province: { type: String, required: true },
    type: { type: String, enum: ITEM_TYPES, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ITEM_STATUSES, default: 'active' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true },
);

itemSchema.index({ type: 1, status: 1, createdAt: -1 });
itemSchema.index({ userId: 1, status: 1, createdAt: -1 });

export const Item = mongoose.models.Item ?? mongoose.model('Item', itemSchema);
