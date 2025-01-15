export class UserService {
  constructor() {
    // "DB"
    this.users = [];
  }

  async getAll() {
    return this.users;
  }

  async getById(id) {
    return this.users.find((user) => user.id === id);
  }

  async create({ username, email, password }) {
    const user = {
      id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
      username,
      email,
      password,
      toys: [],
    };

    this.users.push(user);

    return user;
  }

  async getByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async addToysToUser(userId, toys) {
    const user = this.users.findIndex((user) => user.id === userId);

    if (user === -1) {
      throw new Error("User not found");
    }

    this.users[user].toys.push(...toys);

    return user;
  }
}

// export const userService = new UserService();
