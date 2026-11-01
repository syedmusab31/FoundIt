import { ApiError } from '../utils/ApiError.js';

const formatIssues = (issues) =>
  issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message }));

export const validate =
  (schemas) =>
  (req, _res, next) => {
    req.validated = {};
    for (const [source, schema] of Object.entries(schemas)) {
      const result = schema.safeParse(req[source] ?? {});
      if (!result.success) {
        const details = formatIssues(result.error.issues);
        throw ApiError.badRequest(details[0]?.message ?? 'Invalid request', {
          code: 'VALIDATION_ERROR',
          details,
        });
      }
      req.validated[source] = result.data;
    }
    next();
  };
