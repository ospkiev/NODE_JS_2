import { handleAdd, handleList, handleDone, handleDelete, handleUpdate, handleStats } from '../controllers/habits.controller.js';

export function routeCommand(command, args) {
  const parsedArgs = Object.fromEntries(
    args.map((arg, i) => arg.startsWith('--') ? [arg.slice(2), args[i + 1]] : []).filter(Boolean)
  );

  switch (command) {
    case 'add':
      handleAdd(parsedArgs.name);
      break;
    case 'list':
      handleList();
      break;
    case 'done':
      handleDone(parsedArgs.id);
      break;
    case 'delete':
      handleDelete(parsedArgs.id);
      break;
    case 'update':
      handleUpdate(parsedArgs.id, parsedArgs.name);
      break;
    case 'stats':
      handleStats();
      break;
    default:
      console.log('Невідома команда');
  }
}
