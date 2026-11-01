import { cache, CacheNamespace } from '../lib/cache.js';
import { Item } from '../models/item.model.js';
import { ApiError } from '../utils/ApiError.js';
import { storageService } from './storage.service.js';

const OWNER_FIELDS = 'name';
const ITEM_DETAIL_TTL_SECONDS = 120;
const STATS_TTL_SECONDS = 300;

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const normalizeImagePath = (image) => {
  if (!image || /^https?:\/\//i.test(image)) return image;
  const relative = image.replace(/\\/g, '/').replace(/^\.?\/*/, '');
  return `/${relative}`;
};

const serializeItem = (item) => {
  const owner = item.userId && typeof item.userId === 'object' && 'name' in item.userId
    ? { id: item.userId._id.toString(), name: item.userId.name }
    : null;

  return {
    id: item._id.toString(),
    title: item.title,
    description: item.description,
    image: normalizeImagePath(item.image),
    category: item.category,
    province: item.province,
    type: item.type,
    status: item.status,
    phone: item.phone,
    ownerId: owner?.id ?? item.userId?.toString(),
    owner,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

const buildDayRange = (isoDate) => {
  const start = new Date(`${isoDate}T00:00:00.000Z`);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return { $gte: start, $lt: end };
};

const buildPublicFilter = ({ type, q, category, province, date }) => {
  const filter = { status: 'active' };
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (province) filter.province = province;
  if (date) filter.createdAt = buildDayRange(date);
  if (q) {
    const pattern = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ title: pattern }, { description: pattern }];
  }
  return filter;
};

const findOwnedItem = async (itemId, userId) => {
  const item = await Item.findById(itemId).select('userId imagePublicId').lean();
  if (!item) throw ApiError.notFound('Item not found');
  if (item.userId.toString() !== userId) throw ApiError.forbidden();
  return item;
};

const invalidateItems = () => cache.invalidate(CacheNamespace.ITEMS);

export const itemService = {
  async listPublicItems(query) {
    const cacheKey = `list:${JSON.stringify(query)}`;
    return cache.remember(CacheNamespace.ITEMS, cacheKey, undefined, async () => {
      const { page, limit } = query;
      const filter = buildPublicFilter(query);

      const [documents, total] = await Promise.all([
        Item.find(filter)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('userId', OWNER_FIELDS)
          .lean(),
        Item.countDocuments(filter),
      ]);

      return {
        items: documents.map(serializeItem),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.max(1, Math.ceil(total / limit)),
          hasNextPage: page * limit < total,
        },
      };
    });
  },

  async getItemById(itemId) {
    const { value, hit } = await cache.remember(
      CacheNamespace.ITEMS,
      `detail:${itemId}`,
      ITEM_DETAIL_TTL_SECONDS,
      async () => {
        const item = await Item.findById(itemId).populate('userId', OWNER_FIELDS).lean();
        return item ? serializeItem(item) : null;
      },
    );
    if (!value) throw ApiError.notFound('Item not found');
    return { value, hit };
  },

  async getStats() {
    return cache.remember(CacheNamespace.ITEMS, 'stats', STATS_TTL_SECONDS, async () => {
      const [statusBreakdown, categoryBreakdown] = await Promise.all([
        Item.aggregate([{ $group: { _id: { type: '$type', status: '$status' }, count: { $sum: 1 } } }]),
        Item.aggregate([
          { $match: { status: 'active' } },
          { $group: { _id: '$category', count: { $sum: 1 } } },
        ]),
      ]);

      const totals = { total: 0, active: 0, resolved: 0, activeLost: 0, activeFound: 0 };
      for (const { _id, count } of statusBreakdown) {
        totals.total += count;
        totals[_id.status] = (totals[_id.status] ?? 0) + count;
        if (_id.status === 'active') {
          if (_id.type === 'lost') totals.activeLost += count;
          if (_id.type === 'found') totals.activeFound += count;
        }
      }

      const categories = Object.fromEntries(categoryBreakdown.map(({ _id, count }) => [_id, count]));
      return { ...totals, categories };
    });
  },

  async listUserItems(userId, { status, type }) {
    const filter = { userId };
    if (status) filter.status = status;
    if (type) filter.type = type;
    const documents = await Item.find(filter).sort({ createdAt: -1 }).lean();
    return documents.map(serializeItem);
  },

  async createItem(userId, payload, imageFile) {
    if (!imageFile) throw ApiError.badRequest('An image of the item is required');

    const { url, publicId } = await storageService.uploadImage(imageFile);
    try {
      const item = await Item.create({ ...payload, userId, image: url, imagePublicId: publicId });
      await invalidateItems();
      return serializeItem(item.toObject());
    } catch (error) {
      await storageService.deleteImage(publicId);
      throw error;
    }
  },

  async updateItemStatus(itemId, userId, status) {
    await findOwnedItem(itemId, userId);
    const item = await Item.findByIdAndUpdate(itemId, { status }, { new: true }).lean();
    await invalidateItems();
    return serializeItem(item);
  },

  async deleteItem(itemId, userId) {
    const item = await findOwnedItem(itemId, userId);
    await Item.deleteOne({ _id: itemId });
    await Promise.all([invalidateItems(), storageService.deleteImage(item.imagePublicId)]);
  },
};
