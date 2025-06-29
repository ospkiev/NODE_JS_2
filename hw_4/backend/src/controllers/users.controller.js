export class UsersController {
  static scope = 'scoped'; // <- вказуємо, що контролер буде інжектовано в контекст запиту
  constructor(usersService) {// <- інжектовано сервіс
    console.log(`UsersController initialized`);
    this.usersService = usersService;
  }

  index  = (_req, res)       =>
    res.json(this.usersService.getAll());

  show   = (req, res)        =>
    res.json(this.usersService.getOne(req.params.id));

  create = (req, res)        =>
    res.status(201).json(this.usersService.create(req.body));

  update = (req, res)        =>
    res.json(this.usersService.update(req.params.id, req.body));

  remove = (req, res)        => {
    this.usersService.delete(req.params.id);
    res.status(204).end();
  };
}