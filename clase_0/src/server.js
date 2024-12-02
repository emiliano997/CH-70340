import express from "express";
import { connect } from "mongoose";
import morgan from "morgan";
import { userRouter } from "./routes/user.routes.js";

const app = express();
const DB_URL = "mongodb://localhost:27017/clase_0";
const PORT = 5000;

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Conexión a la base de datos
connect(DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

// Rutas
app.use("/api/users", userRouter);

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
