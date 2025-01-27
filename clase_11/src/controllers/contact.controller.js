import { contactService } from "../services/contact.service.js";

export class ContactController {
  static async getAll(req, res) {
    try {
      const contacts = await contactService.getAll();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const contact = await contactService.getById({ id: req.params.id });
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const contact = await contactService.create({
        contact: { name, email, phone },
      });

      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
