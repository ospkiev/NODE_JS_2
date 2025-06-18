import fs from 'node:fs';

const DB_PATH = './database.json';

export function readHabits() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
}

export function writeHabits(habits) {
  fs.writeFileSync(DB_PATH, JSON.stringify(habits, null, 2));
}
