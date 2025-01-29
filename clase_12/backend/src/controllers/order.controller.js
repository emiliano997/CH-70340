import { userService } from "../services/user.service.js";
import { orderService } from "../services/order.service.js";
import { bussinessService } from "../services/bussiness.service.js";

class OrderController {
  async findAll(req, res) {
    try {
      const orders = await orderService.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    const { id } = req.params;
    try {
      const order = await orderService.findById({ id });
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    const {
      user: userId,
      bussiness: bussinessId,
      products: productsIds,
    } = req.body;

    try {
      const user = await userService.findById({ id: userId });

      if (!user) return res.status(404).json({ message: "User not found" });

      const bussiness = await bussinessService.findById({ id: bussinessId });

      if (!bussiness)
        return res.status(404).json({ message: "Bussiness not found" });

      const products = bussiness.products.filter((product) => {
        return productsIds.includes(product._id.toString());
      });

      if (products.length !== productsIds.length)
        return res
          .status(404)
          .json({ message: "One or more products not found" });

      const total = products.reduce((acc, product) => {
        return acc + product.price;
      }, 0);

      const orderNumber = await orderService.getOrderNumber();

      const order = await orderService.create({
        order: {
          user: user._id,
          number: orderNumber,
          bussiness: bussiness._id,
          products,
          total,
        },
      });

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async resolve(req, res) {
    try {
      const { id } = req.params;
      const { resolve } = req.body;

      const order = await orderService.findById({ id });

      if (!order) return res.status(404).json({ message: "Order not found" });

      if (!order.status !== "pending")
        return res.status(400).json({ message: "Order already resolved" });

      if (resolve !== "completed" && resolve !== "cancelled")
        return res.status(400).json({ message: "Invalid resolve status" });

      order.status = resolve;

      const updatedOrder = await orderService.update({ id, order });

      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const orderController = new OrderController();
