import express from "express";
import session from "express-session";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import path, { extname } from "path";

import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

import { viewsRouter } from "./routes/views.routes.js";
import { sessionRoutes } from "./routes/session.routes.js";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;
const DB_NAME = "CH-70340";
const MONGO_URL = `mongodb+srv://emi:1234@curso-nodejs.de1bv.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=curso-nodejs`;
// Express config
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

// Passport config
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
app.use("/api/sessions", sessionRoutes);

// Listen
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
