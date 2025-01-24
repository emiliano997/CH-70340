import { Router } from "express";
import passport from "passport";
import { validate } from "../middlewares/validation.middleware.js";
import { loginDto } from "../dtos/auth.dto.js";
import { userDto } from "../dtos/user.dto.js";

export const authRouter = Router();

authRouter.post(
  "/register",

  passport.authenticate("register", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

authRouter.post(
  "/login",
  validate(loginDto),
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const token = req.token;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({ token });
  }
);
