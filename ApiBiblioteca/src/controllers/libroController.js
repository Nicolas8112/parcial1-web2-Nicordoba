const libroService = require("../services/libroService");

async function listar(req, res) {
  const libros = await libroService.listarLibros();
  res.status(200).json(libros);
}

async function obtenerPorId(req, res) {
  const libro = await libroService.obtenerLibro(req.libroId);

  if (!libro) {
    return res.status(404).json({ error: "No se encontró el libro solicitado." });
  }

  return res.status(200).json(libro);
}

async function crear(req, res) {
  const libro = await libroService.crearLibro(req.datosLibro);
  res.status(201).json(libro);
}

async function actualizar(req, res) {
  const libro = await libroService.actualizarLibro(req.libroId, req.datosLibro);
  res.status(200).json(libro);
}

async function eliminar(req, res) {
  await libroService.eliminarLibro(req.libroId);
  res.status(204).end();
}

module.exports = { actualizar, crear, eliminar, listar, obtenerPorId };
