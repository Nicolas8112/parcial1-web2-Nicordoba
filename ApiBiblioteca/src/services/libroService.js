const prisma = require("../config/prisma");

function listarLibros() {
  return prisma.libro.findMany({ orderBy: { id: "asc" } });
}

function obtenerLibro(id) {
  return prisma.libro.findUnique({ where: { id } });
}

function crearLibro(datos) {
  return prisma.libro.create({ data: datos });
}

function actualizarLibro(id, datos) {
  return prisma.libro.update({ where: { id }, data: datos });
}

function eliminarLibro(id) {
  return prisma.libro.delete({ where: { id } });
}

module.exports = {
  actualizarLibro,
  crearLibro,
  eliminarLibro,
  listarLibros,
  obtenerLibro,
};
