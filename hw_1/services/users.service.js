
import * as repo from '../models/users.model.js';

export const listUsers = () => repo.getAll();
export const getUser = (id) => repo.getById(id);
export const addUser = (body) => repo.create(body);
export const patchUser = (id, body) => repo.update(id, body);
export const deleteUser = (id) => repo.remove(id);
