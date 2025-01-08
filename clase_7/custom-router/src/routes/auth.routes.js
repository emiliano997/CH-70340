import { JWT } from "../constants/jwt.js";
import { POLICIES } from "../constants/policies.js";
import { Router } from "./router.js";
import jwt from "jsonwebtoken";

class AuthRouter extends Router {
  init() {
    this.post("/login", [POLICIES.public], this.login);
  }

  login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendUserError("Email and password are required");
    }

    const payload = {
      email,
      role: POLICIES.admin,
    };

    const token = jwt.sign(payload, JWT.SECRET, { expiresIn: "5m" });

    res.sendSuccess({ token });
  }
}

export const authRouter = new AuthRouter().getRouter();
