import { nanoid } from 'nanoid';

export class BrewsModel {
  static scope = 'singleton';
  #store = new Map();

  constructor() {
    console.log(`BrewsModel initialized`);
  }

  all() {
    return [...this.#store.values()];
  }

  find(id) {
    return this.#store.get(id) ?? null;
  }

  create(dto) {
    const id = nanoid(8);
    const brews = { id, ...dto };
    this.#store.set(id, brews);
    return brews;
  }

  update(id, dto) {
    if (!this.#store.has(id)) return null;
    const brews = { id, ...dto };
    this.#store.set(id, brews);
    return brews;
  }

  remove(id) {
    return this.#store.delete(id);
  }
}