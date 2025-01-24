import cors from "cors";
import express from "express";

import { CONFIG } from "./config/config.js";
import { contactRouter } from "./routes/contact.routes.js";
import { mongoDBProvider } from "./providers/mongodb.provider.js";

const app = express();

const whitelist = ["http://localhost:5173", "http://localhost:3000"];

// Express Config
app.use(
  cors({
    origin: CONFIG.CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoDBProvider
  .connect(CONFIG.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("Error connecting to MongoDB", error));

// Routes
app.use("/api/contacts", contactRouter);

// Listen
app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});
