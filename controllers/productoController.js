const Producto = require('../models/Producto');
const multer = require('multer');
const fs = require('fs');

// Función para guardar producto con imagen
exports.agregarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria } = req.body;
        const validacion = validarProducto(nombre, descripcion, precio, stock, categoria, req.file, 'Y');
        
        if (validacion.length === 0) {
            const nuevoProducto = new Producto({
                nombre,
                descripcion,
                precio,
                stock,
                categoria,
                imagen: req.file ? '/uploads/' + req.file.filename : null,
                fechaSubida: Date.now()
            });
            return await nuevoProducto.save().then(
            () => {res.status(200).json({ status: true, message: 'Producto guardado exitosamente' })})
        } else {
            res.status(400).json({ status: false, errors: validacion });
        }
    } catch (error) {
        res.status(500).json({ status: false, errors: [error.message] });
    }
};

// Función de validación para los datos del producto
const validarProducto = (nombre, descripcion, precio, stock, categoria, img, sevalida) => {
    let errors = [];

    if (!nombre || nombre.trim() === '') {
        errors.push('El nombre no debe estar vacío');
    }
    if (!descripcion || descripcion.trim() === '') {
        errors.push('La descripción no debe estar vacía');
    }
    if (!precio || isNaN(precio)) {
        errors.push('El precio debe ser numérico y no debe estar vacío');
    }
    if (!stock || isNaN(stock)) {
        errors.push('El stock debe ser numérico y no debe estar vacío');
    }
    if (!categoria || categoria.trim() === '') {
        errors.push('La categoría no debe estar vacía');
    }
    if (sevalida === 'Y' && !img) {
        errors.push('Selecciona una imagen en formato válido');
    } else {
        if (errors.length !== 0 && img) {
            fs.unlinkSync('./public/uploads/' + img.filename);
        }
    }
    return errors;
};



/*
// Función agregar productos
exports.agregarProducto = async (req, res) => {
    try {
        let producto = new Producto(req.body);
        await producto.save();
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al agregar un producto');
    }
}
*/
// Función buscar productos
exports.buscarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al mostrar los productos');
    }
}

// Función buscar un producto por ID
exports.mostrarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).send({ msg: "Producto no encontrado con ese ID" });
        } else {
            res.json(producto);
        }
    } catch (error) {
        res.status(500).send('Hubo un error al mostrar el producto');
    }
}

// Función modificar producto (método PATCH)
exports.modificarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) {
            res.status(404).send({ msg: "Producto no encontrado con ese ID" });
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el producto');
    }
}
/*cambio el metodo actualizar producto para que funcione para la imagen*/
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria } = req.body;
        const producto = await Producto.findOneAndUpdate({ _id: req.params.id }, {
            nombre,
            descripcion,
            precio,
            stock,
            categoria,
            imagen: req.file ? '/uploads/' + req.file.filename : undefined,  // Actualiza la imagen solo si hay un archivo
            fechaSubida: Date.now()
        }, { new: true });
        if (!producto) {
            res.status(404).send({ msg: "Producto no encontrado con ese ID" });
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el producto');
    }
}


/*
// Función actualizar producto (método PUT)
exports.actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!producto) {
            res.status(404).send({ msg: "Producto no encontrado con ese ID" });
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el producto');
    }
}
*/

// Función eliminar producto
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).send({ msg: "Producto no encontrado con ese ID" });
        } else {
            await Producto.findOneAndDelete({ _id: req.params.id });
            res.json({ msg: "Producto eliminado" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el producto');
    }
}
