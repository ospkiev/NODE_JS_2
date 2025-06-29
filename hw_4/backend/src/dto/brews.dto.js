import { z } from 'zod';
import { registry } from '../openapi/registry.js';

export const BrewsDTO = z.object({
  beans: z.string().min(2, 'Beans field is required and must be at least 2 characters long'),
  method: z.string().min(2, 'Method field is required and must be at least 2 characters long'),
  rating: z.string()
    .optional()
    .refine(val => !val || (/^[1-5]$/.test(val)), {
      message: 'Rating must be a string between "1" and "5"',
    }),
  notes: z.string().optional(),
  brew_at: z.string().optional(),
})

/* реєструємо схему */
registry.register('Brews', BrewsDTO);
