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

export async function createUser(data) {
  const users = await readDatabase();
  const user = { id: Date.now().toString(), ...data };
  users.push(user);
  await writeDatabase(users);
  return user;
}

export async function getUsers() {
  return await readDatabase();
}

export async function getUser(id) {
  const users = await readDatabase();
  return users.find(user => user.id === id);
}

export async function updateUser(id, data) {
  const users = await readDatabase();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = { ...users[userIndex], ...data };
  await writeDatabase(users);
  return users[userIndex];
}

export async function deleteUser(id) {
  const users = await readDatabase();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return false;
  }
  
  users.splice(userIndex, 1);
  await writeDatabase(users);
  return true;
}