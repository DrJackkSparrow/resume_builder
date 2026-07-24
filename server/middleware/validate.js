import { ZodError } from 'zod';

/**
 * Higher-order middleware factory that takes a Zod schema
 * and validates the request body against it.
 * 
 * @param {import('zod').ZodSchema} schema 
 * @returns {import('express').RequestHandler}
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      // Parse the incoming request body against the strict Zod schema
      // This will throw a ZodError if validation fails
      schema.parse(req.body);
      
      // If validation succeeds, move to the next middleware or controller
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Intercept validation failures and return a detailed 400 Bad Request
        // We map the Zod issues to a cleaner format for the frontend to consume
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message
        }));

        return res.status(400).json({
          error: 'Validation failed',
          details: validationErrors
        });
      }
      
      // Fallback for unexpected errors during validation
      console.error('Unexpected error in validation middleware', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};
