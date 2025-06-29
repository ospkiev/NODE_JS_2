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
    const data = this.brewsModel.find(id);
    if (!data) throw Object.assign(new Error('Brews not found'), { status: 404 });
    return data;
  }

  create(dto) {
    return this.brewsModel.create(dto);
  }

  update(id, dto) {
    const data = this.brewsModel.update(id, dto);
    if (!data) throw Object.assign(new Error('Brews not found'), { status: 404 });
    return data;
  }

  delete(id) {
    if (!this.brewsModel.remove(id))
      throw Object.assign(new Error('Brews not found'), { status: 404 });
  }
}