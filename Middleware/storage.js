const multer = require("multer");

// Configuración de Multer para almacenar imágenes en './public/uploads'
const guardar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
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

// Asegúrate de que el campo aceptado sea 'imagen'
const subirImagen = multer({ storage: guardar, fileFilter: filtro });

module.exports = subirImagen;
