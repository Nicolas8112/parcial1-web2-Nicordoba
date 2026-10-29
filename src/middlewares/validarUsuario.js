const CAMPOS_USUARIO = ["nombre", "email"];

function validarIdUsuario(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "El id del usuario debe ser un entero positivo.",
    });
  }

  req.usuarioId = id;
  next();
}

function validarDatosUsuario(req, res, next) {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      error: "El cuerpo de la solicitud debe ser un objeto JSON.",
    });
  }

  const camposDesconocidos = Object.keys(body).filter(
    (campo) => !CAMPOS_USUARIO.includes(campo),
  );

  if (camposDesconocidos.length > 0) {
    return res.status(400).json({
      error: `Campos no permitidos: ${camposDesconocidos.join(", ")}.`,
    });
  }

  const errores = [];
  const datos = {};

  for (const campo of CAMPOS_USUARIO) {
    if (!(campo in body)) {
      errores.push(`El campo '${campo}' es obligatorio.`);
      continue;
    }

    if (typeof body[campo] !== "string" || body[campo].trim().length === 0) {
      errores.push(`El campo '${campo}' debe ser un texto no vacío.`);
      continue;
    }

    datos[campo] = body[campo].trim();
  }

  if (
    typeof datos.email === "string" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)
  ) {
    errores.push("El campo 'email' debe tener un formato válido.");
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  req.datosUsuario = datos;
  next();
}

module.exports = { validarDatosUsuario, validarIdUsuario };
