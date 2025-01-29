import { userService } from "../services/user.service.js";

class UserController {
  async findAll(req, res) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    const { id } = req.params;
    try {
      const user = await userService.findOne({ id });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newUser = await userService.create({ user: req.body });
      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const user = req.body;
    try {
      const updatedUser = await userService.update({ id, user });
      res.json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const userController = new UserController();
