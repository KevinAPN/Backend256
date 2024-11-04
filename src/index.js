const express = require('express');
const conectarBD = require('../config/db');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Crea el directorio 'public/uploads' si no existe
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Creamos la variable APP
const app = express();
const port = process.env.PORT || 5000;

// Conexión a la base de datos
conectarBD();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de la carpeta 'uploads'
app.use('/uploads', express.static(uploadDir));

// Rutas para consumir la API Cliente
app.use('/api/clientes', require('../routes/rutasCliente'));
app.use('/api/productos', require('../routes/rutasProducto'));
app.use('/api/proveedores', require('../routes/rutasProveedores'));

// Ruta para verificar nuestro servidor en la web
app.get('/', (req, res) => {
    res.send("Hola, estamos conectados desde la web");
});  

// Ruta de nuestro servidor local
app.listen(port, () => {  
    console.log(`El servidor está conectado en http://localhost:${port}/`);  
});
