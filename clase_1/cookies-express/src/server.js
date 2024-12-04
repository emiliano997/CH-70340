import express from "express";
import cookieParser from "cookie-parser";

const app = express();

const SECRET = "coderhouse";

// Express config
app.use(cookieParser(SECRET));

// Routes

const nombresBuscados = [];

// Set Cookie
app.get("/set-cookie", (req, res) => {
  const { name } = req.query;

  nombresBuscados.push(name);

  // res.cookie("coderCookie", JSON.stringify(nombresBuscados), {
  //   maxAge: 10000,
  // });

  res.cookie("coderCookie", "Esto es una cookie", {
    maxAge: 1000 * 60,
  });
  res.send();
});

app.get("/set-signed-cookie", (req, res) => {
  res.cookie("coderSigendCookie", "Esto es una Cookie firmada", {
    signed: true,
    maxAge: 1000 * 60,
  });

  res.json({
    message: "Cookie firmada creada",
  });
});

// Get Cookies
app.get("/get-cookies", (req, res) => {
  // Cookies normales
  const cookies = req.cookies;

  // Cookies firmadas
  const signedCookies = req.signedCookies;
  res.json({ cookies, signedCookies });
});

// Clear Cookie
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("coderCookie");
  res.send({
    message: "Cookie eliminada",
  });
});

// App Listen
app.listen(5000, () => {
  console.log(`Server running on port http://localhost:5000`);
});
