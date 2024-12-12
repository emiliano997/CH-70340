import passport from "passport";
import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import { __dirname } from "./dirname.js";
import path from "path";
import { sessionRouter } from "./routes/session.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { initializePassport } from "./config/passport.config.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();
const PORT = 5000;
const DB_NAME = "after-class-1";
const MONGO_URL = ``;

// Express Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "s3cr3t",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      ttl: 60,
    }),
  })
);

// Passport Config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Mongoose
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

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

// Routes
app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);

// Listen
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
