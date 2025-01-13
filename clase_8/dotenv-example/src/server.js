import express from "express";
import { CONFIG } from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
    port: CONFIG.PORT,
    db: CONFIG.DB,
    jwt: CONFIG.JWT,
    github: CONFIG.GITHUB,
    cloudinary: CONFIG.CLOUDINARY,
  });
});

// Process events
// process.on("exit", (code) => {
//   console.log("Server closed", code);
// });

// process.on("uncaughtException", (error) => {
//   console.error("Uncaught Exception");
//   process.exit(1);
// });

// console();

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port http://localhost:${CONFIG.PORT}`);
});
