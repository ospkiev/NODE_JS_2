import { createContainer, asClass } from 'awilix';
import { UsersModel }       from './models/users.model.js';
import { UsersService }     from './services/users.service.js';
import { UsersController }  from './controllers/users.controller.js';
import {objectMap} from "./utils/Object.map.js";

const usersModule = {
  // DATA
  usersModel: UsersModel,
  // BUSINESS
  usersService: UsersService,
  // HTTP
  usersController: UsersController
}

/**
 * injectionMode: ‘CLASSIC’ означає:
 * Awilix дивиться імена параметрів конструктора і підставляє
 * відповідні реєстраційні токени.
 */

export const container = createContainer({ injectionMode: 'CLASSIC' })
  .register(
    objectMap(usersModule, value => asClass(value)[value.scope]())
  );
