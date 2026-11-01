import { env } from '../config/env.js';

const write = (level, message, meta) => {
  if (env.isTest && level !== 'error') return;
  const line = `[${new Date().toISOString()}] ${level.toUpperCase()} ${message}`;
  const output = level === 'error' ? console.error : console.log;
  if (meta !== undefined) output(line, meta);
  else output(line);
};

export const logger = {
  info: (message, meta) => write('info', message, meta),
  warn: (message, meta) => write('warn', message, meta),
  error: (message, meta) => write('error', message, meta),
};
