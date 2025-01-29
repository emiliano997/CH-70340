import { Router } from "express";

import { orderDto } from "../dtos/order.dto.js";
import { validate } from "../middlewares/validate.middleware.js";
import { orderController } from "../controllers/order.controller.js";

export const orderRouter = Router();

orderRouter.get("/", orderController.findAll);
orderRouter.get("/:id", orderController.findById);
orderRouter.post("/", validate(orderDto), orderController.create);
orderRouter.put("/:id", orderController.resolve);
