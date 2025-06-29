import {nanoid} from 'nanoid';

export class UsersModel {
  static scope = 'singleton';
  #store = new Map();

  constructor() {
    console.log(`UsersModel initialized`);
  }

  all() {
    return [...this.#store.values()];
  }

  find(id) {
    return this.#store.get(id) ?? null;
  }

  create(dto) {
    const id = nanoid(8);
    const user = {id, ...dto};
    this.#store.set(id, user);
    return user;
  }

  update(id, dto) {
    if (!this.#store.has(id)) return null;
    const user = {id, ...dto};
    this.#store.set(id, user);
    return user;
  }

  remove(id) {
    return this.#store.delete(id);
  }
}