import mongoose from "mongoose";

// PAtrón singleton
class MongoDBProvider {
  connection = null;
  static instance;

  constructor() {
    if (MongoDBProvider.instance) {
      return MongoDBProvider.instance;
    }

    MongoDBProvider.instance = this;
  }

  async connect(uri) {
    if (!this.connection) {
      try {
        this.connection = await mongoose.connect(uri);
      } catch (error) {
        throw new Error(error);
      }
    }

    return this.connection;
  }
}

export const mongoDBProvider = new MongoDBProvider();
