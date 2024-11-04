const mongoose = require('mongoose');

const proveedorSchema = mongoose.Schema({
    nombre: {  
        type: String,  
        required: true 
    },  
    contacto: {  
        type: String,  
        required: true 
    },  
    telefono: {  
        type: Number,  
        required: true 
    },  
    direccion: {  
        type: String,  
        required: true 
    },  
    correo: {  
        type: String,  
        required: true 
    }
}, { versionKey: false });

module.exports = mongoose.model('Proveedor', proveedorSchema);
