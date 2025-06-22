import path from 'path';
import url from 'url';

const routesDir = path.resolve('server/routes');

function parseUrl(reqUrl) {
  const { pathname } = new URL(reqUrl, 'http://localhost');
  const parts = pathname.split('/').filter(Boolean);
  return parts;
}

function getMethodHandler(module, method) {
  return module[method] || null;
}

// export async function router(req, res) {
//   const parts = parseUrl(req.url);
//   const method = req.method;

//   let routePath = path.join(routesDir, ...parts, 'route.js');

//   try {
//     const file = await import(url.pathToFileURL(routePath));
//     const handler = getMethodHandler(file, method);

//     if (!handler) {
//       res.writeHead(405, { 'Content-Type': 'application/json' });
//       return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
//     }

//     const reqId = parts[1] ?? null;
//     return handler(req, res, reqId);
//   } catch {
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ error: 'Not Found' }));
//   }
// }

const routes = {};

function addRoute(method, path, handler) {
  const key = `${method.toUpperCase()} ${path}`;
  routes[key] = handler;
}

function handle(req, res) {
  const key = `${req.method} ${req.url}`;
  const handler = routes[key];

  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
}

export default { addRoute, handle };
