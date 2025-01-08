import { POLICIES } from "../constants/policies.js";
import { Router } from "./router.js";

class UserRouter extends Router {
  init() {
    this.get("/", [POLICIES.public], (req, res) => {
      res.sendSuccess({ message: "Users" });
    });

    this.get("/admin", [POLICIES.admin], (req, res) => {
      res.sendSuccess({ message: "Admin" });
    });

    this.get("/:id", [POLICIES.user, POLICIES.admin], (req, res) => {
      res.sendSuccess({ id: req.params.id });
    });
  }
}

export const userRouter = new UserRouter().getRouter();
