import { Router } from "express";
import { ToyController } from "../controllers/toy.controller.js";

export const toysRouter = Router();

toysRouter.get("/", ToyController.getAll);
toysRouter.get("/:id", ToyController.getById);
toysRouter.post("/", ToyController.create);
