import { Router } from "express";
import passport from "passport";

export const sessionRouter = Router();

sessionRouter.get("/github", passport.authenticate("github"));

sessionRouter.get(
  "/github-callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.user);

    if (req.user) {
      req.session.user = req.user;
      return res.redirect("/");
    }

    res.redirect("/login");
  }
);
