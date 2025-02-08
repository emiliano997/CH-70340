import { Router } from "express";

import { userController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController.getAll);
userRouter.post("/", userController.create);
