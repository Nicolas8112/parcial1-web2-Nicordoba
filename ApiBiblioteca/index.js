const app = require("./src/app");
const prisma = require("./src/config/prisma");

const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, () => {
  console.log(`API de biblioteca escuchando en el puerto ${port}.`);
});

function cerrarServidor(signal) {
  console.log(`Señal ${signal} recibida. Cerrando servidor...`);
  server.close((error) => {
    if (error) {
      console.error("No se pudo cerrar el servidor correctamente.", error);
      process.exitCode = 1;
    }

    prisma
      .$disconnect()
      .catch((disconnectError) => {
        console.error("No se pudo cerrar la conexión con PostgreSQL.", disconnectError);
        process.exitCode = 1;
      });
  });
}

process.on("SIGINT", () => cerrarServidor("SIGINT"));
process.on("SIGTERM", () => cerrarServidor("SIGTERM"));
