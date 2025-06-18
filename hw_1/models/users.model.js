import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB = join(__dirname, '..', 'database.json');

const read = async () => {
  try {
    const data = await readFile(DB, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err instanceof SyntaxError) return [];
    throw new Error(`Failed to read database: ${err.message}`);
  }
};
const save = async (data) => {
  try {
    await writeFile(DB, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error(`Failed to write database: ${err.message}`);
  }
};

export async function getAll() {
  return read();
}

export async function getById(id) {
  return (await read()).find((u) => u.id === id);
}

export async function create(payload) {
  const db = await read();
  const user = { id: Date.now().toString(), ...payload };
  await save([...db, user]);
  return user;
}

export async function update(id, payload) {
  const db = await read();
  const idx = db.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  db[idx] = { ...db[idx], ...payload };
  await save(db);
  return db[idx];
}

export async function remove(id) {
  const db = await read();
  const next = db.filter((u) => u.id !== id);
  if (next.length === db.length) return false;
  await save(next);
  return true;
}
