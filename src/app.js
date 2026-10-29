const express = require("express");
const libroRouter = require("./routers/libroRouter");
const prestamoRouter = require("./routers/prestamoRouter");
const usuarioRouter = require("./routers/usuarioRouter");
const manejarError = require("./middlewares/errorHandler");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use("/api/libros", libroRouter);
app.use("/api/prestamos", prestamoRouter);
app.use("/api/usuarios", usuarioRouter);
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});
app.use(manejarError);

module.exports = app;
