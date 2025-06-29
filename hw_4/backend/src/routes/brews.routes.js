import { Router } from 'express';
import { z } from 'zod';
import { makeClassInvoker } from 'awilix-express';

import { BrewsController } from '../controllers/brews.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import { registry } from '../openapi/registry.js';
import { BrewsDTO } from "../dto/brews.dto.js";
import { validateParams } from "../middlewares/validateParams.js";

const router = Router();
const ctl = makeClassInvoker(BrewsController);

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
  validate(BrewsDTO),
  asyncHandler(ctl('create'))
);
registry.registerPath({
  method: 'post',
  path: '/api/brews',
  tags: ['Brews'],
  request: {
    body: { required: true, content: { 'application/json': { schema: BrewsDTO } } }
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: BrewsDTO } } },
    400: { description: 'Validation error' }
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