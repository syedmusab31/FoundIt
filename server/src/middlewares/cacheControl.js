export const cacheControl =
  ({ maxAge = 0, staleWhileRevalidate = 0, scope = 'public' } = {}) =>
  (_req, res, next) => {
    const directives = [scope, `max-age=${maxAge}`];
    if (staleWhileRevalidate) directives.push(`stale-while-revalidate=${staleWhileRevalidate}`);
    res.set('Cache-Control', directives.join(', '));
    next();
  };

export const noStore = (_req, res, next) => {
  res.set('Cache-Control', 'private, no-store');
  next();
};
