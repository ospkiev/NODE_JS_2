import {
  createHabit,
  getAllHabits,
  markHabitDone,
  removeHabit,
  updateHabitData,
  statsHabits
} from '../services/habits.service.js';

export function addHabit(opts) {
  if (!opts.name || !opts.freq) {
    console.log('Usage: add --name "<text>" --freq <daily|weekly|monthly>');
    return;
  }
  createHabit(opts.name, opts.freq).then((h) => console.log('Added', h.id));
}

export function listHabits() {
  getAllHabits().then((list) => {
    if (!list.length) return console.log('No habits');
    console.table(list.map(({ id, name, freq }) => ({ id, name, freq })));
  });
}

export function markDone(opts) {
  if (!opts.id) {
    console.log('Usage: done --id <id>');
    return;
  }
  markHabitDone(opts.id).then((ok) => {
    if (!ok) console.log('Habit not found');
  });
}

export function deleteHabit(opts) {
  if (!opts.id) {
    console.log('Usage: delete --id <id>');
    return;
  }
  removeHabit(opts.id).then((ok) => {
    if (!ok) console.log('Habit not found');
  });
}

export function updateHabit(opts) {
  if (!opts.id) {
    console.log('Usage: update --id <id> --name "text" --freq <...>');
    return;
  }
  updateHabitData(opts.id, opts.name, opts.freq).then((ok) => {
    if (!ok) console.log('Habit not found');
  });
}

export function showStats() {
  statsHabits().then((stats) => {
    stats.forEach((s) => {
      console.log(`${s.name}: ${s.percent}%`);
    });
  });
}
