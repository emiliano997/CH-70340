import { userModel } from "../models/user.model.js";

class UserService {
  async findAll() {
    return userModel.find();
  }

  async findById({ id }) {
    return userModel.findById(id);
  }

  async create({ user }) {
    console.log(user);

    return userModel.create(user);
  }

  async update({ id, user }) {
    return userModel.findByIdAndUpdate(id, user, { new: true });
  }
}

export const userService = new UserService();
