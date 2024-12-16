import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import handlebars from "express-handlebars";
import passport from "passport";
import path from "path";

import { __dirname } from "./dirname.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionRouter } from "./routes/session.routes.js";
import { initializePassport } from "./config/passport.config.js";

const app = express();
const PORT = 5000;
const MONGO_URI = "";

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);

// Mongoose config
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

// Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars config
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Routes config
app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);

// App Listen
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
