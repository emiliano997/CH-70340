import express from "express";
import { connect } from "mongoose";

import { CONFIG } from "./config/config.js";
import { router } from "./routes/index.routes.js";
import { SERVICES } from "./common/enums/services.js";

const app = express();

// Express Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
if (CONFIG.PERSISTANCE === SERVICES.MONGODB) {
  connect(CONFIG.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));
}

// Routes
app.use("/api", router);

// Listen
app.listen(CONFIG.PORT, () => {
  console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});
