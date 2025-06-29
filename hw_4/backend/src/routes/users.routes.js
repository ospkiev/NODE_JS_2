import {Router} from 'express';
import {z} from 'zod';
import {makeClassInvoker} from 'awilix-express';

import {UsersController} from '../controllers/users.controller.js';
import {asyncHandler} from '../middlewares/asyncHandler.js';
import {validate} from '../middlewares/validate.js';
import {registry} from '../openapi/registry.js';
import {UserDTO} from "../dto/user.dto.js";
import {validateParams} from "../middlewares/validateParams.js";

const router = Router();
const ctl = makeClassInvoker(UsersController);

const paramsSchema = z.object({
  id: z.string().describe('User ID') // опис path-param
}); // для реєстрації path-param

router.get(
  '/users',
  ctl('index')
);
registry.registerPath({
  method: 'get',
  path: '/api/users',
  tags: ['Users'],
  responses: {
    200: {
      description: 'Array of users',
      content: {'application/json': {schema: z.array(UserDTO)}}
    }
  }
})

router.get(
  '/users/:id',
  validateParams(paramsSchema),
  ctl('show')
);
registry.registerPath({
  method: 'get',
  path: '/api/users/{id}',
  tags: ['Users'],
  request: {params: paramsSchema}, // опис path-param
  responses: {
    200: {description: 'User', content: {'application/json': {schema: UserDTO}}},
    404: {description: 'User not found'}
  }
})

router.post(
  '/users',
  validate(UserDTO),
  asyncHandler(ctl('create'))
);
registry.registerPath({
  method: 'post',
  path: '/api/users',
  tags: ['Users'],
  request: {
    body: {required: true, content: {'application/json': {schema: UserDTO}}}
  },
  responses: {
    201: {description: 'Created', content: {'application/json': {schema: UserDTO}}},
    400: {description: 'Validation error'}
  }
})

router.put(
  '/users/:id',
  validateParams(paramsSchema),
  validate(UserDTO),
  asyncHandler(ctl('update'))
);
registry.registerPath({
  method: 'put',
  path: '/api/users/{id}',
  tags: ['Users'],
  request: {
    params: paramsSchema,
    body: {required: true, content: {'application/json': {schema: UserDTO}}}
  },
  responses: {
    200: {description: 'Updated user', content: {'application/json': {schema: UserDTO}}},
    400: {description: 'Validation error'},
    404: {description: 'User not found'}
  }
})

router.delete(
  '/users/:id',
  asyncHandler(ctl('remove'))
);
registry.registerPath({
  method: 'delete',
  path: '/api/users/{id}',
  tags: ['Users'],
  request: {params: paramsSchema},
  responses: {
    204: {description: 'Deleted'},
    404: {description: 'User not found'}
  }
})

export {router};