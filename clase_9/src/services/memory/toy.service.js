export class ToyService {
  constructor() {
    this.toys = [];
  }

  async getAll() {
    return this.toys;
  }

  async getById(id) {
    return this.toys.find((toy) => toy.id === id);
  }

  async create({ name, description, price, stock }) {
    const toy = {
      id: this.toys.length ? this.toys[this.toys.length - 1].id + 1 : 1,
      name,
      description,
      price,
      stock,
    };

    this.toys.push(toy);

    return toy;
  }
}

// export const toyService = new ToyService();
