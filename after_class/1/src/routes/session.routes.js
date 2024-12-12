import passport from "passport";
import { Router } from "express";

export const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login", { failureMessage: true }),
  (req, res) => {
    console.log(req.message);
    console.log(req.authInfo);

    if (req.user) {
      return res.status(200).json(req.user);
    }

    return res.status(400).json({ message: req.message });
  }
);

sessionRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/fail-register",
    failureMessage: true,
  }),
  (req, res) => {
    if (req.user) {
      return res.status(200).json(req.user);
    }

    return res.status(400).json({ message: req.message });
  }
);

sessionRouter.get("/fail-register", (req, res) => {
  let message = "";

  console.log(req.session.messages.includes("User already exists"));

  if (req.session.messages.includes("User already exists")) {
    message = "User already exists";
  } else if (req.session.messages.includes("Invalid email")) {
    message = "Invalid email";
  } else {
    message = "There was an error";
  }

  res.status(400).json({ message });
});
