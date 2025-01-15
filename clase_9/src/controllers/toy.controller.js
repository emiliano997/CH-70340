import { toyService } from "../services/index.service.js";

export class ToyController {
  static async getAll(req, res) {
    try {
      const toys = await toyService.getAll();

      res.status(200).json(toys);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const toy = await toyService.getById(Number(id));

      if (!toy) {
        return res.status(404).json({ error: "Toy not found" });
      }

      res.status(200).json(toy);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }

  static async create(req, res) {
    const { name, description, price, stock } = req.body;

    if (!name || !description || !price || !stock) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try {
      const toy = await toyService.create({
        name,
        description,
        price,
        stock,
      });

      res.status(201).json(toy);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}
