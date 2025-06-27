import { parse } from 'url';

export async function router(req, res) {
  const parsedUrl = parse(req.url, true);
  const method = req.method;
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

  console.log(`Request: ${method} ${parsedUrl.pathname}`);

  if (method === 'GET' && pathParts[0] === 'kv' && pathParts.length === 2) {
    const key = pathParts[1];
    try {
      const { getValue } = await import('../services/kv.js');
      const value = await getValue(key);
      if (value === undefined) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Key not found' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ key, value }));
    } catch (error) {
      console.error('GET /kv/:key error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
    return;
  }

  if (method === 'POST' && pathParts[0] === 'kv' && pathParts.length === 1) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { key, value } = JSON.parse(body);
        if (!key || value === undefined) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Key and value are required' }));
        }
        const { setValue } = await import('../services/kv.js');
        await setValue(key, value);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (error) {
        console.error('POST /kv error:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
} 