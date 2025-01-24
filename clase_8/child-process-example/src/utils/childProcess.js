import { operacionCompleja } from "./operacionCompleja.js";

process.on("message", (message) => {
  console.log("Message from parent:", message);

  const result = operacionCompleja();

  process.send(result);
});
