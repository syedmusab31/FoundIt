import multer from 'multer';
import { IMAGE_MAX_BYTES, IMAGE_MIME_TYPES } from '../constants/items.js';
import { ApiError } from '../utils/ApiError.js';

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: IMAGE_MAX_BYTES, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (IMAGE_MIME_TYPES.includes(file.mimetype)) return callback(null, true);
    callback(ApiError.badRequest('Only JPEG, PNG, WEBP or GIF images are allowed'));
  },
});

export const uploadSingleImage = (fieldName) => imageUpload.single(fieldName);
