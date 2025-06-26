import http from 'http';
import { router } from './lib/router.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  router(req, res).catch(err => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
    console.error(err);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 KV Server is running on http://localhost:${PORT}`);
}); 