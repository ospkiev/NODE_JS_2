import { promises as fs } from 'fs';

const DB_PATH = '../database.json';

async function createUser(data) {
  const content = await fs.readFile(DB_PATH, 'utf-8');
  const users = JSON.parse(content || '[]');
  const user = { id: Date.now().toString(), ...data };
  users.push(user);
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
  return user;
}
export default createUser;