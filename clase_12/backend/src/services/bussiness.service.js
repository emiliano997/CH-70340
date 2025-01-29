import { bussinessModel } from "../models/bussiness.model.js";

class BussinessService {
  async findAll() {
    return bussinessModel.find();
  }

  async findById({ id }) {
    return bussinessModel.findById(id);
  }

  async create({ bussiness }) {
    return bussinessModel.create(bussiness);
  }

  async update({ id, bussiness }) {
    return bussinessModel.findByIdAndUpdate(id, bussiness, { new: true });
  }
}

export const bussinessService = new BussinessService();
