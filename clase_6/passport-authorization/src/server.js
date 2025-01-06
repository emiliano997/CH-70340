import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import passport from "passport";
import { intializePassport } from "./config/passport.config.js";
import { passportCall } from "./middlewares/passport.middleware.js";
import { authorization } from "./middlewares/authorization.middleware.js";

const app = express();

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

intializePassport();
app.use(passport.initialize());

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email !== "admin@gmail.com" || password !== "admin") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = {
    email,
    role: "user",
  };

  const token = jwt.sign(payload, "s3cr3t", { expiresIn: "2m" });

  res.cookie("token", token, {
    maxAge: 100000, // 10 minutes
    httpOnly: true,
  });

  res.json({ message: "Login successful" });
});

app.get("/current", passportCall("jwt"), (req, res) => {
  res.json({
    message: "Current user",
    token: req.user,
  });
});

app.get(
  "/protected",
  passportCall("jwt"),
  authorization("admin"),
  (req, res) => {
    res.json({
      message: "Protected route",
    });
  }
);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
