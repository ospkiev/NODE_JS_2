import * as repo from '../models/habits.model.js';

export const createHabit = (name, freq) => repo.create(name, freq);
export const getAllHabits = () => repo.getAll();
export const markHabitDone = (id) => repo.markDone(id);
export const removeHabit = (id) => repo.remove(id);
export const updateHabitData = (id, name, freq) => repo.update(id, name, freq);
export const statsHabits = () => repo.stats();
