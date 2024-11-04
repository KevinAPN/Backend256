const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    nombre: {  
        type: String,  
        required: true 
    },  
    descripcion: {  
        type: String,  
        required: true 
    },  
    precio: {  
        type: Number,  
        required: true 
    },  
    stock: {  
        type: Number,  
        required: true 
    },  
    categoria: {  
        type: String,  
        required: true 
    },
    imagen: {
        type: String,
        required: false
    },
    fechaSubida: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model('Producto', productoSchema);
