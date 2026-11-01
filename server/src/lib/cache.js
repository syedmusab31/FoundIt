import Redis from 'ioredis';
import { env } from '../config/env.js';
import { logger } from './logger.js';

const KEY_PREFIX = 'foundit:';

class MemoryStore {
  constructor(maxEntries = 1_000) {
    this.maxEntries = maxEntries;
    this.entries = new Map();
  }

  async get(key) {
    const entry = this.entries.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.entries.delete(key);
      return null;
    }
    this.entries.delete(key);
    this.entries.set(key, entry);
    return entry.value;
  }

  async set(key, value, ttlSeconds) {
    if (this.entries.has(key)) this.entries.delete(key);
    else if (this.entries.size >= this.maxEntries) {
      this.entries.delete(this.entries.keys().next().value);
    }
    this.entries.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
    });
  }

  async del(key) {
    this.entries.delete(key);
  }

  async incr(key) {
    const next = Number((await this.get(key)) ?? 0) + 1;
    await this.set(key, String(next));
    return next;
  }
}

class RedisStore {
  constructor(url) {
    this.client = new Redis(url, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5_000,
      commandTimeout: 2_000,
    });
    this.client.on('error', (error) => logger.warn(`Redis error: ${error.message}`));
  }

  get(key) {
    return this.client.get(key);
  }

  set(key, value, ttlSeconds) {
    return ttlSeconds ? this.client.set(key, value, 'EX', ttlSeconds) : this.client.set(key, value);
  }

  del(key) {
    return this.client.del(key);
  }

  incr(key) {
    return this.client.incr(key);
  }
}

const createStore = () => {
  if (env.REDIS_URL) {
    logger.info('Cache: using Redis');
    return new RedisStore(env.REDIS_URL);
  }
  logger.info('Cache: using in-memory store');
  return new MemoryStore();
};

const store = globalThis.__founditCacheStore ?? createStore();
globalThis.__founditCacheStore = store;

const safely = async (operation, fallback) => {
  try {
    return await operation();
  } catch (error) {
    logger.warn(`Cache operation failed: ${error.message}`);
    return fallback;
  }
};

const versionKey = (namespace) => `${KEY_PREFIX}${namespace}:version`;

const namespacedKey = async (namespace, key) => {
  const version = (await safely(() => store.get(versionKey(namespace)), null)) ?? '0';
  return `${KEY_PREFIX}${namespace}:v${version}:${key}`;
};

export const cache = {
  async get(namespace, key) {
    const fullKey = await namespacedKey(namespace, key);
    const raw = await safely(() => store.get(fullKey), null);
    return raw === null ? null : JSON.parse(raw);
  },

  async set(namespace, key, value, ttlSeconds = env.CACHE_TTL_SECONDS) {
    const fullKey = await namespacedKey(namespace, key);
    await safely(() => store.set(fullKey, JSON.stringify(value), ttlSeconds));
  },

  async remember(namespace, key, ttlSeconds, resolver) {
    const cached = await this.get(namespace, key);
    if (cached !== null) return { value: cached, hit: true };
    const value = await resolver();
    await this.set(namespace, key, value, ttlSeconds);
    return { value, hit: false };
  },

  async delete(namespace, key) {
    const fullKey = await namespacedKey(namespace, key);
    await safely(() => store.del(fullKey));
  },

  async invalidate(namespace) {
    await safely(() => store.incr(versionKey(namespace)));
  },
};

export const CacheNamespace = Object.freeze({
  ITEMS: 'items',
  USERS: 'users',
});
