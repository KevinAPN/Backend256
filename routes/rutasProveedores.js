const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

// rutas del crud
router.post('/', proveedorController.agregarProveedor);
router.get('/', proveedorController.buscarProveedores);
router.get('/:id', proveedorController.mostrarProveedor);
router.patch('/:id', proveedorController.modificarProveedor);
router.put('/:id', proveedorController.actualizarProveedor);
router.delete('/:id', proveedorController.eliminarProveedor);



module.exports = router;