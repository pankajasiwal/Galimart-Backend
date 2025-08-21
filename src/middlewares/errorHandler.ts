import type { NextFunction, Response, Request } from 'express';
import createError, { HttpError } from 'http-errors';
import { config } from '../config/config.js';

/**
 * Not Found handler (for unknown routes)
 */
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(createError(404, `Route ${req.originalUrl} not found`));
}

/**
 * Global Error Handler
 */
export function globalErrorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Handle Prisma errors gracefully
  if ((err as any).code?.startsWith('P')) {
    return res.status(400).json({
      success: false,
      message: 'Database error',
      details: (err as any).message,
    });
  }

  // Validation errors (example: Zod / Joi / Yup)
  if ((err as any).name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      details: (err as any).errors || err.message,
    });
  }

  // Dev vs Prod response
  if (config.env === 'development') {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      stack: err.stack,
      error: err,
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
}
