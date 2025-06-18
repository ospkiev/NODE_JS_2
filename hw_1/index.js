import http from 'node:http';
import { handle as habitsCtrl } from './controllers/habits.controller.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log('first')
  const [, resource, id] = req.url.split('/');
  if (resource === 'habits') {
    return habitsCtrl(req, res, id ? Number(id) : null);
  }
  res.writeHead(404).end('Not found');
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});