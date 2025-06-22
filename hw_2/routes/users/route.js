
import router from '../../lib/router.js';
import service from '../../services/users.service.js';


router.addRoute('POST', '/users', (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const userData = JSON.parse(body);
    const newUser = service.createUser(userData);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  });
});

export default router;