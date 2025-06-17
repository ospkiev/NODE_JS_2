import {
  listUsers, getUser, addUser,
  patchUser, deleteUser
} from '../services/users.service.js';

function json(res, status, data = null) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  if (data) res.end(JSON.stringify(data));
  else res.end();
}

function bodyJSON(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); }
      catch { reject(new Error('Invalid JSON')); }
    });
  });
}

export async function handle(req, res, id) {
  try {
    if (req.method === 'GET' && id === null) {
      return json(res, 200, await listUsers());
    }
    if (req.method === 'GET') {
      const u = await getUser(id);
      return u ? json(res, 200, u) : json(res, 404, { error: 'Not found' });
    }
    if (req.method === 'POST') {
      const body = await bodyJSON(req);
      return json(res, 201, await addUser(body));
    }
    if (req.method === 'PATCH') {
      const body = await bodyJSON(req);
      const u = await patchUser(id, body);
      return u ? json(res, 200, u) : json(res, 404, { error: 'Not found' });
    }
    if (req.method === 'DELETE') {
      const ok = await deleteUser(id);
      return ok ? json(res, 204) : json(res, 404, { error: 'Not found' });
    }
    json(res, 405, { error: 'Method not allowed' });
  } catch (e) {
    json(res, 500, { error: e.message });
  }
}

