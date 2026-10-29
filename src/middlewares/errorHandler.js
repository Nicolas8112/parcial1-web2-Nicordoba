function manejarError(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El cuerpo de la solicitud no es JSON válido." });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "El cuerpo de la solicitud es demasiado grande." });
  }

  if (err.code === "P2025") {
    const recurso = req.originalUrl.startsWith("/api/prestamos")
      ? "préstamo"
      : req.originalUrl.startsWith("/api/usuarios")
        ? "usuario"
        : "libro";
    return res.status(404).json({ error: `No se encontró el ${recurso} solicitado.` });
  }

  if (err.code === "P2003") {
    if (req.originalUrl.startsWith("/api/prestamos")) {
      return res.status(400).json({
        error: "El usuario o el libro indicado no existe.",
      });
    }

    if (req.originalUrl.startsWith("/api/usuarios")) {
      return res.status(409).json({
        error: "No se puede eliminar el usuario porque tiene préstamos asociados.",
      });
    }

    return res.status(409).json({
      error: "No se puede eliminar el libro porque tiene préstamos asociados.",
    });
  }

  if (err.code === "P2002") {
    if (req.originalUrl.startsWith("/api/usuarios")) {
      return res.status(409).json({ error: "Ya existe un usuario con ese correo electrónico." });
    }

    return res.status(409).json({ error: "Ya existe un registro con esos datos." });
  }

  console.error(err);
  return res.status(500).json({ error: "Ocurrió un error interno del servidor." });
}

module.exports = manejarError;
