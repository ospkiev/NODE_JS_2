import url from 'url';

export async function router(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost');
  const method = req.method;
  
  console.log(`Request: ${method} ${pathname}`);
  
  if (method === 'GET' && pathname === '/redis-like') {
    try {
      const parsedUrl = new URL(req.url, 'http://localhost');
      const key = parsedUrl.searchParams.get('key');
      
      if (!key) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Key parameter is required' }));
      }
      
      const { findValue } = await import('../services/redis-like.js');
      const obj = await findValue(key);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(obj || null));
    } catch (error) {
      console.error('GET /redis-like error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
    return;
  }
  
  if (method === 'POST' && pathname === '/redis-like') {
    const parsedUrl = new URL(req.url, 'http://localhost');
    const setParam = parsedUrl.searchParams.get('set');
    
    if (setParam !== null) {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const { value } = JSON.parse(body);
          
          if (value === undefined) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Value is required' }));
          }
          
          const { addValue } = await import('../services/redis-like.js');
          await addValue(value);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
        } catch (error) {
          console.error('POST /redis-like?set error:', error);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }
  }
  
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}
