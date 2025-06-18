import { addHabit, listHabits, markDone, deleteHabit, updateHabit, showStats } from '../controllers/habits.controller.js';

export function route(args) {
  const [command, ...rest] = args;
  const opts = parseArgs(rest);

  switch (command) {
    case 'add':
      return addHabit(opts);
    case 'list':
      return listHabits();
    case 'done':
      return markDone(opts);
    case 'delete':
      return deleteHabit(opts);
    case 'update':
      return updateHabit(opts);
    case 'stats':
      return showStats();
    default:
      console.log('Unknown command');
  }
}

function parseArgs(argv) {
  const res = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const val = argv[i + 1];
      res[key] = val;
      i += 1;
    }
  }
  return res;
}
