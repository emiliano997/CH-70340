import express from "express";
import { fork, spawn, exec, execFile } from "child_process";
import { operacionCompleja } from "./utils/operacionCompleja.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the server",
  });
});

app.get("/operacion", (req, res) => {
  const result = operacionCompleja();

  res.json({
    result,
  });
});

app.get("/operacion-no-bloqueante", (req, res) => {
  // Fork
  // node childProcess.js
  const child = fork("./src/utils/childProcess.js");

  child.send("Message from parent");

  child.on("message", (message) => {
    console.log("Message from child:", message);
    res.json({
      message,
    });
  });

  // const child = spawn("node", ["src/utils/childProcess.js"]);
  // const child = exec(
  //   "node src/utils/childProcess.js",
  //   (error, stdout, stderr) => {}
  // );
  // const child = execFile(
  //   "node",
  //   ["src/utils/childProcess.js"],
  //   (error, stdout, stderr) => {
  //     console.log("stdout", stdout);
  //   }
  // );
});

app.get("/servicio-externo-bloqueante", (req, res) => {
  fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        res.json({
          data,
        });
      }, 5000);
    });
});

app.get("/servicio-externo/:type", (req, res) => {
  const { type } = req.params;

  if (type !== "todos" && type !== "users" && type !== "posts") {
    res.status(400).json({
      message: "Invalid type",
    });

    return;
  }

  const child = fork("./src/utils/servicioExterno.js");

  child.send(type);

  child.on("message", (message) => {
    res.json({
      data: message,
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
