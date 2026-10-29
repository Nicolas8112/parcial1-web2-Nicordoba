const prestamoService = require("../services/prestamoService");

async function listar(req, res) {
  const prestamos = await prestamoService.listarPrestamos();
  res.status(200).json(prestamos);
}

async function obtenerPorId(req, res) {
  const prestamo = await prestamoService.obtenerPrestamo(req.prestamoId);

  if (!prestamo) {
    return res.status(404).json({ error: "No se encontró el préstamo solicitado." });
  }

  return res.status(200).json(prestamo);
}

async function crear(req, res) {
  const prestamo = await prestamoService.crearPrestamo(req.datosPrestamo);
  res.status(201).json(prestamo);
}

async function actualizar(req, res) {
  const prestamo = await prestamoService.actualizarPrestamo(
    req.prestamoId,
    req.datosPrestamo,
  );
  res.status(200).json(prestamo);
}

async function eliminar(req, res) {
  await prestamoService.eliminarPrestamo(req.prestamoId);
  res.status(204).end();
}

module.exports = { actualizar, crear, eliminar, listar, obtenerPorId };
