// console.log(process.cwd()); // Me muestra la ruta donde se encuentra el archivo que se está ejecutando
// console.log(process.pid); // Me muestra el id del proceso que se está ejecutando
// console.log(process.memoryUsage()); // Me muestra la cantidad de memoria que está utilizando el proceso
// console.log(process.version); // Me muestra la versión de node que se está ejecutando
// console.log(process.env.OS); // Me muestra las variables de entorno que se están utilizando
// console.log(process.argv);

// Elimina los dos primeros argumentos (node y el path del archivo)
// const arguments = process.argv.slice(2);

// console.log(arguments);

// ----------------------------
// Commander
// ----------------------------
import { Command } from "commander";

const program = new Command();

program
  .option("-p, --port <number>", "Puerto del servidor", 5000)
  .option("-d, --debug", "Modo debug", false)
  .requiredOption("-u, --user <string>", "Usuario");

program.parse(); // Parsea los argumentos

const options = program.opts(); // Obtiene las opciones

console.log(options);
console.log(program.args);
