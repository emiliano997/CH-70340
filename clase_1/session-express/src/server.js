import express from "express";
import session from "express-session";
import { auth } from "./middlewares/auth.middleware.js";

const app = express();

const SECRET = "coderhouse";

// Express config
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Routes
app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.json({
      message: `Has visitado esta página ${req.session.counter} veces`,
    });
  } else {
    req.session.counter = 1;
    res.json({ message: "Bienvenido a la página" });
  }
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (username !== "admin" || password !== "1234") {
    return res
      .status(401)
      .json({ message: "Usuario o contraseña incorrectos" });
  }

  req.session.user = { username };
  req.session.admin = username === "admin";

  res.json({ message: "Sesión iniciada" });
});

app.get("/private", auth, (req, res) => {
  res.json({ message: "Bienvenido a la página privada" });
});

app.get("/profile", auth, (req, res) => {
  res.json({ message: "Bienvenido a tu perfil", user: req.session.user });
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ message: "Error al cerrar sesión" });

    res.json({ message: "Sesión cerrada" });
  });
});

// App Listen
app.listen(5000, () => {
  console.log(`Server running on port http://localhost:5000`);
});
