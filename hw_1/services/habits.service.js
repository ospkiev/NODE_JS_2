import * as repo from '../models/habits.model.js';

export const listHabits = () => repo.getAll();
export const getHabits = (id) => repo.getById(id);
export const addHabits = (body) => repo.create(body);
export const patchHabits = (id, body) => repo.update(id, body);
export const deleteHabits = (id) => repo.remove(id);