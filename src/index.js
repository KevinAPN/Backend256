const express = require('express');
const conectarBD = require('../config/db');
const cors = require('cors');
const path = require('path');

// Creamos la variable APP
const app = express();
const port = process.env.PORT || 5000;

//conexion bases de datos
conectarBD();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

//ruta para consumir la API Cliente
app.use('/api/clientes', require('../routes/rutasCliente'));
app.use('/api/productos', require('../routes/rutasProducto'));
app.use('/api/proveedores', require('../routes/rutasProveedores'));

// ruta para verificar nuestro servidor en la web
app.get('/', (req, res) =>{
    res.send("hola estamos conectados desde la web")  
});  

// ruta de nuestro servidor local
app.listen(port, () =>{  
    console.log("El servidor esta conectado http://localhost:5000/");  
});  