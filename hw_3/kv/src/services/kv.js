import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.resolve('database.json');

async function readDatabase() {
  try {
    const content = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (error) {
    return [];
  }
}

async function writeDatabase(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function getValue(key) {
  const data = await readDatabase();
  const found = data.find(obj => obj.key === key);
  return found ? found.value : undefined;
}

export async function setValue(key, value) {
  const data = await readDatabase();
  data.push({ key, value });
  await writeDatabase(data);
} 