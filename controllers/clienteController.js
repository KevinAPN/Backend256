const Cliente = require('../models/Cliente');  
//funcion agregan clientes
exports.agregarClientes = async (req, res) => {  
    try {
        let clientes = new Cliente(req.body);
        await clientes.save();
        res.json(clientes);
    } catch (error) {  
    console.log(error);  
    res.status(500).send('hubo un error al agregar un cliente');  
    }  
}

// función buscar clientes  
exports.buscarClientes = async (req, res) => {  
    try {  
        const clientes = await Cliente.find();  
        res.json(clientes);  
    } catch (error) {  
        console.log(error);  
        res.status(500).send('hubo un error al mostrar los clientes');  
    }  
}

// funcion buscar un cliente por id
exports.mostrarCliente = async (req, res) => {  
    try {  
        let clientes = await Cliente.findById(req.params.id);  
        if (!clientes) {  
            res.status(404).send({ msg: "Cliente no encontrado con ese ID" });  
        }else{
            res.json(clientes);
        } 
    } catch (error) {  
        res.status(500).send('hubo un error al mostrar un cliente');  
    }  
}


// funcion modificar Cliente metodo patch  
exports.modificarClientes = async (req, res) => {  
    try {  
        const clientes = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });  
        if (!clientes) {  
            res.status(404).send({ msg: "Cliente no encontrado con ese ID" });  
        } else {  
            res.json(clientes);  
        }  
    } catch (error) {  
        console.log(error);  
        res.status(500).send('hubo un error al modificar los clientes');  
    }  
}

exports.actualizarClientes = async (req, res) => {  
    try {  
        const clientes = await Cliente.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!clientes) {  
            res.status(404).send({ msg: "Cliente no encontrado con ese ID" });  
        } else {  
            res.json(clientes);  
        } 
    } catch (error) {  
        console.log(error);  
        res.status(500).send('hubo un error al actualizar los clientes');  
    }  
}

exports.eliminarClientes = async (req, res) => {  
    try {  
        const clientes = await Cliente.findById(req.params.id);  
        if (!clientes) {  
            res.status(404).send({ msg: "Cliente no encontrado con ese ID" });  
        } else {  
            await Cliente.findOneAndDelete({ _id: req.params.id });  
            res.json({ msg: "cliente eliminado" });  
        }  
    } catch (error) {  
        console.log(error);  
        res.status(500).send('hubo un error al eliminar un cliente');  
    }  
}