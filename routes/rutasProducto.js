const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const subirImagen = require('../Middleware/storage');  // Usa tu middleware de multer

// rutas del CRUD
router.post('/', subirImagen.single('imagen'), productoController.agregarProducto);  // Middleware de Multer usado aquí
router.get('/', productoController.buscarProductos);
router.get('/:id', productoController.mostrarProducto);
router.put('/:id', subirImagen.single('imagen'), productoController.actualizarProducto);  // Middleware de Multer usado aquí
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
