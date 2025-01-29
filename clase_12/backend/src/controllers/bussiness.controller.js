import { bussinessService } from "../services/bussiness.service.js";
class BussinessController {
  async findAll(req, res) {
    try {
      const bussiness = await bussinessService.findAll();
      res.json(bussiness);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    const { id } = req.params;
    try {
      const bussiness = await bussinessService.findById({ id });
      res.json(bussiness);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newBussiness = await bussinessService.create({
        bussiness: req.body,
      });
      res.json(newBussiness);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const bussiness = req.body;
    try {
      const updatedBussiness = await bussinessService.update({ id, bussiness });
      res.json(updatedBussiness);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const bussinessController = new BussinessController();
