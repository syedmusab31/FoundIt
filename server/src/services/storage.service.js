import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { cloudinary } from '../config/cloudinary.js';
import { env } from '../config/env.js';
import { logger } from '../lib/logger.js';
import { ApiError } from '../utils/ApiError.js';

export const LOCAL_UPLOAD_DIR = path.resolve('uploads');

const EXTENSIONS = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: env.CLOUDINARY_FOLDER,
        resource_type: 'image',
        transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => (error ? reject(error) : resolve(result)),
    );
    stream.end(file.buffer);
  });

const uploadToLocalDisk = async (file) => {
  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  const fileName = `${Date.now()}-${crypto.randomUUID()}${EXTENSIONS[file.mimetype] ?? ''}`;
  await fs.writeFile(path.join(LOCAL_UPLOAD_DIR, fileName), file.buffer);
  return { url: `/uploads/${fileName}`, publicId: `local:${fileName}` };
};

export const storageService = {
  async uploadImage(file) {
    if (env.isCloudinaryConfigured) {
      const result = await uploadToCloudinary(file);
      return { url: result.secure_url, publicId: result.public_id };
    }
    if (env.isServerless) {
      throw new ApiError(503, 'Image storage is not configured on this deployment');
    }
    return uploadToLocalDisk(file);
  },

  async deleteImage(publicId) {
    if (!publicId) return;
    try {
      if (publicId.startsWith('local:')) {
        await fs.rm(path.join(LOCAL_UPLOAD_DIR, path.basename(publicId.slice(6))), { force: true });
      } else if (env.isCloudinaryConfigured) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      logger.warn(`Failed to delete image ${publicId}: ${error.message}`);
    }
  },
};
