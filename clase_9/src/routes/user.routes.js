import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const usersRouter = Router();

usersRouter.get("/", UserController.getAll);
usersRouter.get("/:id", UserController.getById);
usersRouter.post("/", UserController.create);
usersRouter.post("/addToys/:id", UserController.addToyToUser);
