import { Router } from "express";

import { toysRouter } from "./toy.routes.js";
import { usersRouter } from "./user.routes.js";

export const router = Router();

router.use("/toys", toysRouter);
router.use("/users", usersRouter);
