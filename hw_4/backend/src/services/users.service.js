export class UsersService {
  static scope = 'scoped'; // <- вказуємо, що це Scoped Service
  constructor(usersModel) {          // <- інжектовано модель
    console.log(`UsersService initialized`);
    this.usersModel = usersModel;
  }

  getAll() {
    return this.usersModel.all();
  }

  getOne(id) {
    const user = this.usersModel.find(id);
    if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
    return user;
  }

  create(dto) {
    return this.usersModel.create(dto);
  }

  update(id, dto) {
    const user = this.usersModel.update(id, dto);
    if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
    return user;
  }

  delete(id) {
    if (!this.usersModel.remove(id))
      throw Object.assign(new Error('User not found'), { status: 404 });
  }
}