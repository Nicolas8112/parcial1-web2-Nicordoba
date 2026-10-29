const CAMPOS_PRESTAMO = ["usuarioId", "libroId", "fecha", "devuelto"];

function validarIdPrestamo(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "El id del préstamo debe ser un entero positivo.",
    });
  }

  req.prestamoId = id;
  next();
}

function validarDatosPrestamo(req, res, next) {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      error: "El cuerpo de la solicitud debe ser un objeto JSON.",
    });
  }

  const camposDesconocidos = Object.keys(body).filter(
    (campo) => !CAMPOS_PRESTAMO.includes(campo),
  );

  if (camposDesconocidos.length > 0) {
    return res.status(400).json({
      error: `Campos no permitidos: ${camposDesconocidos.join(", ")}.`,
    });
  }

  const datos = {};
  const errores = [];

  for (const campo of ["usuarioId", "libroId"]) {
    if (!(campo in body)) {
      errores.push(`El campo '${campo}' es obligatorio.`);
    } else if (!Number.isSafeInteger(body[campo]) || body[campo] <= 0) {
      errores.push(`El campo '${campo}' debe ser un entero positivo.`);
    } else {
      datos[campo] = body[campo];
    }
  }

  if ("fecha" in body) {
    if (typeof body.fecha !== "string" || Number.isNaN(Date.parse(body.fecha))) {
      errores.push("El campo 'fecha' debe ser una fecha válida en formato ISO 8601.");
    } else {
      datos.fecha = new Date(body.fecha);
    }
  }

  if ("devuelto" in body) {
    if (typeof body.devuelto !== "boolean") {
      errores.push("El campo 'devuelto' debe ser booleano.");
    } else {
      datos.devuelto = body.devuelto;
    }
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  req.datosPrestamo = datos;
  next();
}

module.exports = { validarDatosPrestamo, validarIdPrestamo };
