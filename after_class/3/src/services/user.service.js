import { userModel } from "../models/user.model.js";

class UserService {
  async findAll() {
    return await userModel.find();
  }

  async findById(id) {
    return await userModel.findById(id);
  }

  async create(user) {
    return await userModel.create(user);
  }
}

export const userService = new UserService();
