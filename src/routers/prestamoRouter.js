const express = require("express");
const prestamoController = require("../controllers/prestamoController");
const {
  validarDatosPrestamo,
  validarIdPrestamo,
} = require("../middlewares/validarPrestamo");

const router = express.Router();

router.get("/", prestamoController.listar);
router.get("/:id", validarIdPrestamo, prestamoController.obtenerPorId);
router.post("/", validarDatosPrestamo, prestamoController.crear);
router.put("/:id", validarIdPrestamo, validarDatosPrestamo, prestamoController.actualizar);
router.delete("/:id", validarIdPrestamo, prestamoController.eliminar);

module.exports = router;
