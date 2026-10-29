const express = require("express");
const libroController = require("../controllers/libroController");
const {
  validarDatosLibro,
  validarIdLibro,
} = require("../middlewares/validarLibro");

const router = express.Router();

router.get("/", libroController.listar);
router.get("/:id", validarIdLibro, libroController.obtenerPorId);
router.post("/", validarDatosLibro(), libroController.crear);
router.put("/:id", validarIdLibro, validarDatosLibro(), libroController.actualizar);
router.delete("/:id", validarIdLibro, libroController.eliminar);

module.exports = router;
