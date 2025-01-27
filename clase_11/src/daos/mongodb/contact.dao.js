import { contactModel } from "../../models/contact.model.js";

export class ContactDao {
  async getAll() {
    return await contactModel.find();
  }

  async getById({ id }) {
    return await contactModel.findById(id);
  }

  async create({ contact }) {
    return await contactModel.create(contact);
  }
}

export const contactDao = new ContactDao();
