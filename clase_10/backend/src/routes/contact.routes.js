import { contactModel } from "../models/contact.model.js";
import { Router } from "express";

export const contactRouter = Router();

contactRouter.get("/", async (req, res) => {
  try {
    const contacts = await contactModel.find();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

contactRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await contactModel.findById(id);

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

contactRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const contact = await contactModel.create({ name, email, phone });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
