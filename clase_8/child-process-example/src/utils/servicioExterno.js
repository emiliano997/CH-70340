process.on("message", (message) => {
  let entidad = "";

  switch (message) {
    case "todos":
      entidad = "todos";
      break;

    case "users":
      entidad = "users";
      break;

    case "posts":
      entidad = "posts";
      break;

    default:
      entidad = "todos";
      break;
  }

  fetch(`https://jsonplaceholder.typicode.com/${entidad}`)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        process.send(data);
      }, 5000);
    });
});
