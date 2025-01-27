export class ContactDao {
  constructor() {
    this.contacts = [];
  }

  async getAll() {
    return this.contacts;
  }

  async getById({ id }) {
    return this.contacts.find((contact) => contact.id === id);
  }

  async create({ contact }) {
    this.contacts.push(contact);
    return contact;
  }
}

export const contactDao = new ContactDao();
