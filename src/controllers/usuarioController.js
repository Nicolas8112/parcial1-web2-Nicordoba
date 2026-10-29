const usuarioService = require("../services/usuarioService");

async function listar(req, res) {
  const usuarios = await usuarioService.listarUsuarios();
  res.status(200).json(usuarios);
}

async function obtenerPorId(req, res) {
  const usuario = await usuarioService.obtenerUsuario(req.usuarioId);

  if (!usuario) {
    return res.status(404).json({ error: "No se encontró el usuario solicitado." });
  }

  return res.status(200).json(usuario);
}

async function crear(req, res) {
  const usuario = await usuarioService.crearUsuario(req.datosUsuario);
  res.status(201).json(usuario);
}

async function actualizar(req, res) {
  const usuario = await usuarioService.actualizarUsuario(
    req.usuarioId,
    req.datosUsuario,
  );
  res.status(200).json(usuario);
}

async function eliminar(req, res) {
  await usuarioService.eliminarUsuario(req.usuarioId);
  res.status(204).end();
}

module.exports = { actualizar, crear, eliminar, listar, obtenerPorId };
