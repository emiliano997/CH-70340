import { Router } from "express";

import { userDto } from "../dtos/user.dto.js";
import { validate } from "../middlewares/validate.middleware.js";
import { userController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findById);
userRouter.post("/", validate(userDto), userController.create);
userRouter.put("/:id", userController.update);
