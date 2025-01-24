import express from "express";
import morgan from "morgan";
import { wordRouter } from "./routes/word.routes.js";
import { petRouter } from "./routes/pet.routes.js";

const app = express();

// Express config
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/words", wordRouter);
app.use("/pets", petRouter);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
