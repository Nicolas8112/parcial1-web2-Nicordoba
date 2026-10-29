const prisma = require("../config/prisma");

const relacionesPrestamo = {
  usuario: {
    select: { id: true, nombre: true, email: true },
  },
  libro: {
    select: { id: true, titulo: true, autor: true },
  },
};

function listarPrestamos() {
  return prisma.prestamo.findMany({
    include: relacionesPrestamo,
    orderBy: { id: "asc" },
  });
}

function obtenerPrestamo(id) {
  return prisma.prestamo.findUnique({
    where: { id },
    include: relacionesPrestamo,
  });
}

function crearPrestamo(datos) {
  return prisma.prestamo.create({
    data: datos,
    include: relacionesPrestamo,
  });
}

function actualizarPrestamo(id, datos) {
  return prisma.prestamo.update({
    where: { id },
    data: datos,
    include: relacionesPrestamo,
  });
}

function eliminarPrestamo(id) {
  return prisma.prestamo.delete({ where: { id } });
}

module.exports = {
  actualizarPrestamo,
  crearPrestamo,
  eliminarPrestamo,
  listarPrestamos,
  obtenerPrestamo,
};
