import dotenv from 'dotenv';
dotenv.config();

console.log('ENV-content:', process.env.SECRET_KEY);
import { routeCommand } from './router/router.js';

const [, , command, ...args] = process.argv;

routeCommand(command, args);