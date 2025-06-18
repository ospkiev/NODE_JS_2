import http from 'node:http';
import { handle as userCtrl } from './controllers/users.controller.js';

const server = http.createServer((req, res) => {
  const [, resource, id] = req.url.split('/');
  if (resource === 'users') {
    userCtrl(req, res, id || null);
    return;
  }
  res.writeHead(404).end('Not found');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀  http://localhost:${port}`);
});
