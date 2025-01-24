import express from "express";
import session from "express-session";

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
app.get("/", (req, res) => {
  const { nombre } = req.query;

  if (nombre && nombre !== req.session.nombre) {
    req.session.nombre = nombre;
  }

  if (!req.session.counter) {
    req.session.counter = 1;
    return res.json({
      message: req.session.nombre
        ? `Bienvenido ${req.session.nombre}`
        : "Bienvenido a la página",
    });
  }

  req.session.counter++;

  res.json({
    message: req.session.nombre
      ? `${req.session.nombre} has visitado esta página ${req.session.counter} veces`
      : `Has visitado esta página ${req.session.counter} veces`,
  });
});

// App Listen
app.listen(5000, () => {
  console.log(`Server running on port http://localhost:5000`);
});
