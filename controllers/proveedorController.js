const Proveedor = require('../models/Proveedor');

// Función agregar proveedor
exports.agregarProveedor = async (req, res) => {
    try {
        let proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.json(proveedor);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al agregar un proveedor');
    }
}

// Función buscar proveedores
exports.buscarProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al mostrar los proveedores');
    }
}

// Función buscar un proveedor por ID
exports.mostrarProveedor = async (req, res) => {
    try {
        let proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            res.status(404).send({ msg: "Proveedor no encontrado con ese ID" });
        } else {
            res.json(proveedor);
        }
    } catch (error) {
        res.status(500).send('Hubo un error al mostrar el proveedor');
    }
}

// Función modificar proveedor (método PATCH)
exports.modificarProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proveedor) {
            res.status(404).send({ msg: "Proveedor no encontrado con ese ID" });
        } else {
            res.json(proveedor);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el proveedor');
    }
}

// Función actualizar proveedor (método PUT)
exports.actualizarProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!proveedor) {
            res.status(404).send({ msg: "Proveedor no encontrado con ese ID" });
        } else {
            res.json(proveedor);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el proveedor');
    }
}

// Función eliminar proveedor
exports.eliminarProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            res.status(404).send({ msg: "Proveedor no encontrado con ese ID" });
        } else {
            await Proveedor.findOneAndDelete({ _id: req.params.id });
            res.json({ msg: "Proveedor eliminado" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el proveedor');
    }
}
