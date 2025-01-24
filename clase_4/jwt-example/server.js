import express from "express";
import { generateToken, authentication } from "./utils.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "admin") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    username,
    role: "admin",
  });

  res.status(200).json({ token });
});

app.get("/api/current", authentication, (req, res) => {
  res.status(200).json({ user: req.user });
});

// App Listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
