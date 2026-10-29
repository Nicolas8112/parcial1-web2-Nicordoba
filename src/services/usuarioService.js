const prisma = require("../config/prisma");

function listarUsuarios() {
  return prisma.usuario.findMany({ orderBy: { id: "asc" } });
}

function obtenerUsuario(id) {
  return prisma.usuario.findUnique({ where: { id } });
}

function crearUsuario(datos) {
  return prisma.usuario.create({ data: datos });
}

function actualizarUsuario(id, datos) {
  return prisma.usuario.update({ where: { id }, data: datos });
}

function eliminarUsuario(id) {
  return prisma.usuario.delete({ where: { id } });
}

module.exports = {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  listarUsuarios,
  obtenerUsuario,
};
