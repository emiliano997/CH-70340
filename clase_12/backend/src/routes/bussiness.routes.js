import { Router } from "express";

import { validate } from "../middlewares/validate.middleware.js";
import { bussinessDto } from "../dtos/bussiness.dto.js";
import { bussinessController } from "../controllers/bussiness.controller.js";

export const bussinessRouter = Router();

bussinessRouter.get("/", bussinessController.findAll);
bussinessRouter.get("/:id", bussinessController.findById);
bussinessRouter.post("/", validate(bussinessDto), bussinessController.create);
bussinessRouter.put("/:id", bussinessController.update);
