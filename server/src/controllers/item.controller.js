import { itemService } from '../services/item.service.js';
import { sendSuccess } from '../utils/sendResponse.js';

const setCacheStatus = (res, hit) => res.set('X-Cache', hit ? 'HIT' : 'MISS');

export const itemController = {
  async listItems(req, res) {
    const { value, hit } = await itemService.listPublicItems(req.validated.query);
    setCacheStatus(res, hit);
    sendSuccess(res, { data: value.items, meta: { pagination: value.pagination } });
  },

  async getStats(_req, res) {
    const { value, hit } = await itemService.getStats();
    setCacheStatus(res, hit);
    sendSuccess(res, { data: value });
  },

  async getItem(req, res) {
    const { value, hit } = await itemService.getItemById(req.validated.params.id);
    setCacheStatus(res, hit);
    sendSuccess(res, { data: value });
  },

  async listMyItems(req, res) {
    const items = await itemService.listUserItems(req.user.id, req.validated.query);
    sendSuccess(res, { data: items });
  },

  async createItem(req, res) {
    const item = await itemService.createItem(req.user.id, req.validated.body, req.file);
    sendSuccess(res, { statusCode: 201, message: 'Item listed successfully', data: item });
  },

  async updateItemStatus(req, res) {
    const item = await itemService.updateItemStatus(
      req.validated.params.id,
      req.user.id,
      req.validated.body.status,
    );
    sendSuccess(res, { message: 'Item status updated', data: item });
  },

  async deleteItem(req, res) {
    await itemService.deleteItem(req.validated.params.id, req.user.id);
    sendSuccess(res, { message: 'Item deleted' });
  },
};
