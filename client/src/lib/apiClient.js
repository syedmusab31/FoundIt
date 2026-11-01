import { env } from '../config/env';

export class ApiError extends Error {
  constructor(message, { status, code, details } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const buildUrl = (path, query) => {
  const url = `${env.apiUrl}${path}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') params.set(key, value);
  }
  const search = params.toString();
  return search ? `${url}?${search}` : url;
};

const parseBody = async (response) => {
  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? response.json() : null;
};

export const request = async (path, { method = 'GET', body, query, signal } = {}) => {
  const isFormData = body instanceof FormData;
  let response;

  try {
    response = await fetch(buildUrl(path, query), {
      method,
      signal,
      credentials: 'include',
      headers: body && !isFormData ? { 'Content-Type': 'application/json' } : undefined,
      body: body && !isFormData ? JSON.stringify(body) : body,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('Unable to reach the server. Check your connection and try again.', {
      code: 'NETWORK_ERROR',
    });
  }

  const payload = await parseBody(response);

  if (!response.ok || payload?.success === false) {
    throw new ApiError(payload?.message ?? `Request failed (${response.status})`, {
      status: response.status,
      code: payload?.code,
      details: payload?.details,
    });
  }

  return payload ?? { success: true };
};

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
