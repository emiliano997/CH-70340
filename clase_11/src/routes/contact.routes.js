import { Router } from "express";

import { contactDto } from "../dtos/contact.dto.js";
import { ContactController } from "../controllers/contact.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

export const contactRouter = Router();

contactRouter.get("/", ContactController.getAll);
contactRouter.get("/:id", ContactController.getById);
contactRouter.post("/", validate(contactDto), ContactController.create);
