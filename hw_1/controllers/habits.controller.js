import * as service from '../services/habits.service.js';

export function handleAdd(name) {
  service.addHabit(name);
}

export function handleList() {
  const habits = service.listHabits();
  console.log(habits);
}

export function handleDone(id) {
  service.markHabitDone(id);
}

export function handleDelete(id) {
  service.deleteHabit(id);
}

export function handleUpdate(id, newName) {
  service.updateHabit(id, newName);
}

export function handleStats() {
  service.statsHabits();
}
