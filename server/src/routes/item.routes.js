import { Router } from 'express';
import { itemController } from '../controllers/item.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { cacheControl, noStore } from '../middlewares/cacheControl.js';
import { uploadSingleImage } from '../middlewares/upload.js';
import { validate } from '../middlewares/validate.js';
import {
  createItemSchema,
  itemIdParamsSchema,
  listItemsQuerySchema,
  listMyItemsQuerySchema,
  updateItemStatusSchema,
} from '../validators/item.validator.js';

export const itemRouter = Router();

const publicCache = cacheControl({ maxAge: 30, staleWhileRevalidate: 60 });

itemRouter.get('/', publicCache, validate({ query: listItemsQuerySchema }), itemController.listItems);
itemRouter.get('/stats', cacheControl({ maxAge: 120, staleWhileRevalidate: 300 }), itemController.getStats);
itemRouter.get('/mine', noStore, authenticate, validate({ query: listMyItemsQuerySchema }), itemController.listMyItems);
itemRouter.get('/:id', publicCache, validate({ params: itemIdParamsSchema }), itemController.getItem);

itemRouter.post(
  '/',
  authenticate,
  uploadSingleImage('image'),
  validate({ body: createItemSchema }),
  itemController.createItem,
);
itemRouter.patch(
  '/:id/status',
  authenticate,
  validate({ params: itemIdParamsSchema, body: updateItemStatusSchema }),
  itemController.updateItemStatus,
);
itemRouter.delete('/:id', authenticate, validate({ params: itemIdParamsSchema }), itemController.deleteItem);
