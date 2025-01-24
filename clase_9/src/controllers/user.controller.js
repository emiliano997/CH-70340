import { toyService, userService } from "../services/index.service.js";

export class UserController {
  static async getAll(req, res) {
    try {
      const users = await userService.getAll();

      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await userService.getById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async create(req, res) {
    const { username, email, password } = req.body;

    try {
      const userExists = await userService.getByEmail(email);

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await userService.create({ username, email, password });

      res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async addToyToUser(req, res) {
    const { id } = req.params;

    const { toys } = req.body;

    if (!Array.isArray(toys) || toys.length === 0) {
      return res.status(400).json({ error: "Toys must have data" });
    }

    try {
      for (const toyId of toys) {
        const toy = await toyService.getById(toyId);

        if (!toy) {
          return res.status(404).json({ error: "Toy not found" });
        }
      }

      const user = await userService.addToysToUser({ id, toys });

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}
