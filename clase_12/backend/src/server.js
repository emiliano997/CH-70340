import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";

import { CONFIG } from "./config/config.js";
import router from "./routes/index.routes.js";

const app = express();

// Express config
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(CONFIG.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));

// Routes
app.use("/api", router);

// Start server
app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});
