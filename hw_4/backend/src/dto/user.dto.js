import { z } from 'zod';
import { registry } from '../openapi/registry.js';

export const UserDTO = z.object({
  name:  z.string().min(2),
  email: z.string().email()
})

/* реєструємо схему */
registry.register('User', UserDTO);
