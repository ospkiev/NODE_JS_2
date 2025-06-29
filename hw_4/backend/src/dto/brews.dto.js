import { z } from 'zod';
import { registry } from '../openapi/registry.js';

export const BrewsDTO = z.object({
  beans: z.string().min(2),
  method: z.string().min(2),
})

/* реєструємо схему */
registry.register('Brews', BrewsDTO);
