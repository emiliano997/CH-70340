import { Router } from "express";
import { userService } from "../services/user.service.js";
import { validate } from "../middlewares/validation.middleware.js";
import { userDto } from "../dtos/user.dto.js";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userService.findById(id);
  res.json(user);
});

userRouter.post("/", validate(userDto), async (req, res) => {
  const user = req.body;
  const newUser = await userService.create(user);
  res.json(newUser);
});
