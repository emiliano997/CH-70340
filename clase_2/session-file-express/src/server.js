import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

const app = express();
const PORT = 5000;
const fileStore = FileStore(session);
const MONGO_URL = "";

// Express config
app.use(cookieParser());

// Sessiones con file store (guarda las sesiones en un archivo)
// app.use(
//   session({
//     secret: "s3cr3t",
//     resave: false,
//     saveUninitialized: false,
//     store: new fileStore({
//       path: "./sessions",
//       ttl: 30,
//       retries: 0,
//     }),
//   })
// );

// Sessiones con MongoDB (guarda las sesiones en una base de datos)
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
  })
);

app.get("/session", (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }

  res.send(`Views: ${req.session.views}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
