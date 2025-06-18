import http from 'node:http';
import { handle as userCtrl } from './controllers/habits.controller.js';

const server = http.createServer((req, res) => {
  const [, resource, id] = req.url.split('/');
  if (resource === 'habits') {
    return userCtrl(req, res, id || null);
  }
  res.writeHead(404).end('Not found');
});

server.listen(3000, () => {
  console.log('🚀  http://localhost:3000');
});