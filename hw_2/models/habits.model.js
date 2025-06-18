import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB = join(__dirname, '..', 'database.json');

async function read() {
  try {
    const data = await readFile(DB, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

async function save(data) {
  await writeFile(DB, JSON.stringify(data, null, 2));
}

export async function getAll() {
  return read();
}

export async function create(name, freq) {
  const db = await read();
  const habit = { id: Date.now().toString(), name, freq, log: [] };
  db.push(habit);
  await save(db);
  return habit;
}

export async function markDone(id) {
  const db = await read();
  const h = db.find((x) => x.id === id);
  if (!h) return false;
  const date = currentDate();
  if (!h.log.includes(date)) h.log.push(date);
  await save(db);
  return true;
}

export async function remove(id) {
  const db = await read();
  const next = db.filter((h) => h.id !== id);
  if (next.length === db.length) return false;
  await save(next);
  return true;
}

export async function update(id, name, freq) {
  const db = await read();
  const h = db.find((x) => x.id === id);
  if (!h) return false;
  if (name) h.name = name;
  if (freq) h.freq = freq;
  await save(db);
  return true;
}

export async function stats() {
  const db = await read();
  const now = new Date(currentDate());
  return db.map((h) => {
    const period = h.freq === 'daily' ? 7 : 30;
    const expected = h.freq === 'daily' ? 7 : h.freq === 'weekly' ? 4 : 1;
    const from = new Date(now);
    from.setUTCDate(from.getUTCDate() - period + 1);
    const count = h.log.filter((d) => {
      const dt = new Date(d);
      return dt >= from && dt <= now;
    }).length;
    const percent = Math.min(100, Math.round((count / expected) * 100));
    return { name: h.name, percent };
  });
}

function currentDate() {
  const offset = Number(process.env.DAY_OFFSET || 0);
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}
