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

export async function addValue(value) {
  const data = await readDatabase();
  data.push({ value });
  await writeDatabase(data);
}

export async function findValue(value) {
  const data = await readDatabase();
  return data.find(obj => obj.value === value) || null;
}