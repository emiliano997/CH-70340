import morgan from "morgan";
import express from "express";

import { CONFIG } from "./config/config.js";
import { userRouter } from "./routes/user.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});
