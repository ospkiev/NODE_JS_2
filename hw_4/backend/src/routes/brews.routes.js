import { Router } from 'express';
import { z } from 'zod';
import { makeClassInvoker } from 'awilix-express';
import rateLimit from 'express-rate-limit';

import { BrewsController } from '../controllers/brews.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import { registry } from '../openapi/registry.js';
import { BrewsDTO } from "../dto/brews.dto.js";
import { validateParams } from "../middlewares/validateParams.js";

const router = Router();
const ctl = makeClassInvoker(BrewsController);

// Rate limiter for POST /brews - 10 requests per minute
const brewsPostRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many POST requests to /api/brews, please try again later.',
    retryAfter: '60 seconds'
  },
  standardHeaders: true,
  legacyHeaders: false, 
});

const paramsSchema = z.object({
  id: z.string().describe('Brews ID') // опис path-param
}); // для реєстрації path-param

router.get(
  '/brews',
  ctl('index')
);
registry.registerPath({
  method: 'get',
  path: '/api/brews',
  tags: ['Brews'],
  responses: {
    200: {
      description: 'Array of brews',
      content: { 'application/json': { schema: z.array(BrewsDTO) } }
    }
  }
})

router.get(
  '/brews/:id',
  validateParams(paramsSchema),
  ctl('show')
);
registry.registerPath({
  method: 'get',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: { params: paramsSchema }, // опис path-param
  responses: {
    200: { description: 'Brews', content: { 'application/json': { schema: BrewsDTO } } },
    404: { description: 'Brews not found' }
  }
})

router.post(
  '/brews',
  brewsPostRateLimit, // Apply rate limiting before validation
  validate(BrewsDTO),
  asyncHandler(ctl('create'))
);
registry.registerPath({
  method: 'post',
  path: '/api/brews',
  tags: ['Brews'],
  request: {
    body: { 
      required: true, 
      content: { 
        'application/json': { 
          schema: BrewsDTO,
          example: {
            beans: "Ethiopian Yirgacheffe",
            method: "Pour Over",
            rating: 4,
            notes: "Bright and floral with citrus notes",
            brew_at: "2024-01-15T10:30:00Z"
          }
        } 
      } 
    }
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: BrewsDTO } } },
    400: { 
      description: 'Validation error - missing required fields or invalid data',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string(),
            message: z.string(),
            details: z.array(z.object({
              field: z.string(),
              message: z.string(),
              code: z.string()
            }))
          })
        }
      }
    },
    429: { description: 'Too many requests - rate limit exceeded (10 POST requests per minute)' }
  }
})

router.put(
  '/brews/:id',
  validateParams(paramsSchema),
  validate(BrewsDTO),
  asyncHandler(ctl('update'))
);
registry.registerPath({
  method: 'put',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: {
    params: paramsSchema,
    body: { required: true, content: { 'application/json': { schema: BrewsDTO } } }
  },
  responses: {
    200: { description: 'Updated brews', content: { 'application/json': { schema: BrewsDTO } } },
    400: { description: 'Validation error' },
    404: { description: 'Brews not found' }
  }
})

router.delete(
  '/brews/:id',
  asyncHandler(ctl('remove'))
);
registry.registerPath({
  method: 'delete',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: { params: paramsSchema },
  responses: {
    204: { description: 'Deleted' },
    404: { description: 'Brews not found' }
  }
})

export { router };