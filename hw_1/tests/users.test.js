import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { request } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const DB_PATH = join(PROJECT_DIR, 'database.json');

let serverProcess;
let originalDb;

function httpRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
    };
    const req = request(options, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        resolve({ status: res.statusCode, body: text ? JSON.parse(text) : undefined });
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

test.before(async () => {
  originalDb = await readFile(DB_PATH, 'utf8');
  serverProcess = spawn(process.execPath, ['index.js'], { cwd: PROJECT_DIR });
  await once(serverProcess.stdout, 'data');
});

test.after(async () => {
  serverProcess.kill();
  await once(serverProcess, 'close');
  await writeFile(DB_PATH, originalDb);
});

test('CRUD endpoints', async () => {
  // list users
  let res = await httpRequest('GET', '/users');
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));

  // create user
  res = await httpRequest('POST', '/users', { name: 'Bob' });
  assert.equal(res.status, 201);
  assert.ok(res.body.id);
  assert.equal(res.body.name, 'Bob');
  const id = res.body.id;

  // get user by id
  res = await httpRequest('GET', `/users/${id}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.id, id);
  assert.equal(res.body.name, 'Bob');

  // patch user
  res = await httpRequest('PATCH', `/users/${id}`, { name: 'Bobby' });
  assert.equal(res.status, 200);
  assert.equal(res.body.name, 'Bobby');

  // delete user
  res = await httpRequest('DELETE', `/users/${id}`);
  assert.equal(res.status, 204);

  // ensure user deleted
  res = await httpRequest('GET', `/users/${id}`);
  assert.equal(res.status, 404);
});
