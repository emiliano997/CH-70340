import { userModel } from "../../models/mongodb/user.model.js";

export class UserService {
  async getAll() {
    return userModel.find();
  }

  async getById(id) {
    return userModel.findById(id).populate("toys");
  }

  async create({ username, email, password }) {
    return userModel.create({ username, email, password });
  }

  async getByEmail(email) {
    return userModel.findOne({ email });
  }

  async addToysToUser({ id, toys }) {
    console.log(id, toys);

    return userModel.findByIdAndUpdate(id, { $push: { toys } }, { new: true });
  }
}
