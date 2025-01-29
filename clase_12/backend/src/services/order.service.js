import { orderModel } from "../models/order.model.js";

class OrderService {
  async findAll() {
    return orderModel.find();
  }

  async findById({ id }) {
    return orderModel.findById(id);
  }

  async create({ order }) {
    console.log(order);

    return orderModel.create(order);
  }

  async update({ id, order }) {
    return orderModel.findByIdAndUpdate(id, order, { new: true });
  }

  async getOrderNumber() {
    return Number(Date.now() + Math.floor(Math.random() * 10000 + 1));
  }
}

export const orderService = new OrderService();
