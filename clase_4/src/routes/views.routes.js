import { Router } from "express";

export const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
  res.render("home", { user: req.session.user });
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});
