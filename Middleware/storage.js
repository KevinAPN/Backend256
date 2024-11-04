const multer = require("multer");
const path = require('path');

// Configuración de Multer para almacenar imágenes en './public/uploads'
const guardar = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        if (file !== null) {
            const ext = file.originalname.split('.').pop();
            cb(null, Date.now() + '.' + ext);
        }
    }
});

const filtro = (req, file, cb) => {  
    if (file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {  
        cb(null, true);  
    } else {  
        cb(null, false);  
    } 
}

const subirImagen = multer({ storage: guardar, fileFilter: filtro });

module.exports = subirImagen;
