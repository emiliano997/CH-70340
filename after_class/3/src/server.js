import express from "express";
import passport from "passport";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { initializePassport } from "./config/passport.config.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { CONFIG } from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

mongoose
  .connect(CONFIG.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

app.use("/api/auth", authRouter);
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

app.listen(CONFIG.PORT, () => {
  console.log("Server is running on port http://localhost:5000");
});
