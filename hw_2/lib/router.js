import path from 'path';
import url from 'url';
import { promises as fs } from 'fs';

const routesDir = path.resolve('routes');

function parseUrl(reqUrl) {
  const { pathname } = new URL(reqUrl, 'http://localhost');
  const parts = pathname.split('/').filter(Boolean);
  return parts;
}

function getMethodHandler(module, method) {
  return module[method] || module.default || null;
}

function matchRoute(routePath, requestPath) {
  const routeParts = routePath.split('/').filter(Boolean);
  const requestParts = requestPath.split('/').filter(Boolean);
  
  if (routeParts.length !== requestParts.length) {
    return null;
  }
  
  const params = {};
  
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':') || (routeParts[i].startsWith('[') && routeParts[i].endsWith(']'))) {
      // Dynamic parameter
      const paramName = routeParts[i].startsWith(':') ? routeParts[i].slice(1) : routeParts[i].slice(1, -1);
      params[paramName] = requestParts[i];
    } else if (routeParts[i] !== requestParts[i]) {
      // Static path doesn't match
      return null;
    }
  }
  
  return params;
}

async function scanRoutes(dir = routesDir, basePath = '') {
  const routes = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Check if it's a dynamic route (starts with [ and ends with ])
        if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
          const paramName = entry.name.slice(1, -1);
          const subRoutes = await scanRoutes(fullPath, `${basePath}/:${paramName}`);
          routes.push(...subRoutes);
        } else {
          const subRoutes = await scanRoutes(fullPath, `${basePath}/${entry.name}`);
          routes.push(...subRoutes);
        }
      } else if (entry.name === 'route.js') {
        routes.push({
          path: basePath || '/',
          filePath: fullPath
        });
      } else if (entry.name.endsWith('.route.js')) {
        // Handle file-based dynamic routes like [id].route.js
        const fileName = entry.name.replace('.route.js', '');
        if (fileName.startsWith('[') && fileName.endsWith(']')) {
          const paramName = fileName.slice(1, -1);
          routes.push({
            path: `${basePath}/:${paramName}`,
            filePath: fullPath
          });
        } else {
          routes.push({
            path: `${basePath}/${fileName}`,
            filePath: fullPath
          });
        }
      }
    }
  } catch (error) {
    console.error('Error scanning routes:', error);
  }
  
  return routes;
}

export async function router(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost');
  const method = req.method;
  
  console.log(`Request: ${method} ${pathname}`);
  
  try {
    // Scan for routes
    const routes = await scanRoutes();
    console.log('Available routes:', routes.map(r => ({ path: r.path, file: r.filePath })));
    
    // Find matching route
    let matchedRoute = null;
    let routeParams = null;
    
    for (const route of routes) {
      const params = matchRoute(route.path, pathname);
      console.log(`Testing route: ${route.path} against ${pathname}, params:`, params);
      if (params !== null) {
        matchedRoute = route;
        routeParams = params;
        break;
      }
    }
    
    if (!matchedRoute) {
      console.log('No route matched');
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Not Found' }));
    }
    
    console.log('Matched route:', matchedRoute.path, 'with params:', routeParams);
    
    // Import and execute the route handler
    const routeModule = await import(url.pathToFileURL(matchedRoute.filePath));
    const handler = getMethodHandler(routeModule, method);
    
    if (!handler) {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
    
    // Call handler with params
    if (routeParams && Object.keys(routeParams).length > 0) {
      const paramValue = Object.values(routeParams)[0]; // For simple cases like /users/:id
      return handler(req, res, paramValue);
    } else {
      return handler(req, res);
    }
    
  } catch (error) {
    console.error('Router error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

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
