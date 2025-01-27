import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";

import { CONFIG } from "./config/config.js";
import { contactRouter } from "./routes/contact.routes.js";

const app = express();

// Express Config
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(CONFIG.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Express routes
app.use("/api/contacts", contactRouter);

// Start server
app.listen(CONFIG.PORT, () => {
  console.log(`Server running at http://localhost:${CONFIG.PORT}`);
});
