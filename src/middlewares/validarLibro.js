const CAMPOS_LIBRO = ["titulo", "autor", "stock"];

function validarIdLibro(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "El id del libro debe ser un entero positivo.",
    });
  }

  req.libroId = id;
  next();
}

function validarDatosLibro({ parcial = false } = {}) {
  return (req, res, next) => {
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        error: "El cuerpo de la solicitud debe ser un objeto JSON.",
      });
    }

    const camposDesconocidos = Object.keys(body).filter(
      (campo) => !CAMPOS_LIBRO.includes(campo),
    );

    if (camposDesconocidos.length > 0) {
      return res.status(400).json({
        error: `Campos no permitidos: ${camposDesconocidos.join(", ")}.`,
      });
    }

    const datos = {};
    const errores = [];

    for (const campo of ["titulo", "autor"]) {
      if (!(campo in body)) {
        if (!parcial) errores.push(`El campo '${campo}' es obligatorio.`);
        continue;
      }

      if (typeof body[campo] !== "string" || body[campo].trim().length === 0) {
        errores.push(`El campo '${campo}' debe ser un texto no vacío.`);
        continue;
      }

      datos[campo] = body[campo].trim();
    }

    if (!("stock" in body)) {
      if (!parcial && req.method === "PUT") {
        errores.push("El campo 'stock' es obligatorio para actualizar.");
      }
    } else if (!Number.isSafeInteger(body.stock) || body.stock < 0) {
      errores.push("El campo 'stock' debe ser un entero mayor o igual a cero.");
    } else {
      datos.stock = body.stock;
    }

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    req.datosLibro = datos;
    next();
  };
}

module.exports = { validarDatosLibro, validarIdLibro };
