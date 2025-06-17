import http from 'node:http';
import { handle as userCtrl } from './controllers/users.controller.js';

const server = http.createServer((req, res) => {
  const [, resource, id] = req.url.split('/');
  if (resource === 'users') {
    return userCtrl(req, res, id || null);
  }
  res.writeHead(404).end('Not found');
});
const PORT = process.env.PORT || 3000;

server.listen(3000, () => {
  console.log('🚀  http://localhost:3000');
});
server.listen(PORT, () => {
  console.log(`🚀  http://localhost:${PORT}`);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀  http://localhost:${port}`);
});
