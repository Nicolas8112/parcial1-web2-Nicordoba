const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const {
  validarDatosUsuario,
  validarIdUsuario,
} = require("../middlewares/validarUsuario");

const router = express.Router();

router.get("/", usuarioController.listar);
router.get("/:id", validarIdUsuario, usuarioController.obtenerPorId);
router.post("/", validarDatosUsuario, usuarioController.crear);
router.put("/:id", validarIdUsuario, validarDatosUsuario, usuarioController.actualizar);
router.delete("/:id", validarIdUsuario, usuarioController.eliminar);

module.exports = router;
