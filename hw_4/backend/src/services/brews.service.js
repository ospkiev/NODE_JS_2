export class BrewsService {
  static scope = 'scoped'; // <- вказуємо, що це Scoped Service
  constructor(brewsModel) {          // <- інжектовано модель
    console.log(`BrewsService initialized`);
    this.brewsModel = brewsModel;
  }

  getAll() {
    return this.brewsModel.all();
  }

  getOne(id) {
    const user = this.brewsModel.find(id);
    if (!user) throw Object.assign(new Error('Brews not found'), { status: 404 });
    return user;
  }

  create(dto) {
    return this.brewsModel.create(dto);
  }

  update(id, dto) {
    const user = this.brewsModel.update(id, dto);
    if (!user) throw Object.assign(new Error('Brews not found'), { status: 404 });
    return user;
  }

  delete(id) {
    if (!this.brewsModel.remove(id))
      throw Object.assign(new Error('Brews not found'), { status: 404 });
  }
}