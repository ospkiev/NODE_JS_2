import { getUser, updateUser, deleteUser } from '../../../services/users.service.js';

export async function GET(req, res, id) {
  const user = await getUser(id);
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'User Not Found' }));
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
}

export async function PUT(req, res, id) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const data = JSON.parse(body);
      const user = await updateUser(id, data);
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'User Not Found' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

export async function DELETE(req, res, id) {
  const success = await deleteUser(id);
  if (!success) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'User Not Found' }));
  }
  res.writeHead(204);
  res.end();
}
