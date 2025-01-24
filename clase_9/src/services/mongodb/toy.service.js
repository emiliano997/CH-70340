import { toyModel } from "../../models/mongodb/toy.model.js";

export class ToyService {
  async getAll() {
    return toyModel.find();
  }

  async getById(id) {
    return toyModel.findById(id);
  }

  async create({ name, description, price, stock }) {
    return toyModel.create({ name, description, price, stock });
  }
}
