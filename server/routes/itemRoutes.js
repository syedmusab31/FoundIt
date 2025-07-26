import express from 'express';
import multer from 'multer';
import {
    getLostItems,
    getFoundItems,
    createLostItem,
    createFoundItem,
    updateItemStatus,
    deleteItem,
    getMyActiveItems,
    getMyResolvedItems,
  } from '../controllers/itemController.js';

  import userAuth from '../middlewares/userAuth.js';

  const router = express.Router();
  const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

  // Public routes
router.get('/lost', getLostItems);
router.get('/found', getFoundItems);

// Private Routes (Protected)
router.post('/lost/new', userAuth, upload.single('image'), createLostItem); // Create a new lost item
router.post('/found/new', userAuth, upload.single('image'), createFoundItem); // Create a new found item
router.patch('/:id/status', userAuth, updateItemStatus); // Update item status
router.delete('/:id', userAuth, deleteItem); // Delete an item
router.get('/my/active', userAuth, getMyActiveItems); // Get active items listed by logged-in user
router.get('/my/resolved', userAuth, getMyResolvedItems); // Get resolved items listed by logged-in user

export default router;