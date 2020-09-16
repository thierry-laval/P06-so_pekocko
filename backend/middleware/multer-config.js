// Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

const multer = require('multer');

// Crée un dictionnaire des types MIME
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de multer pour préciser à multer où enregistrer les fichiers et les renommer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Génère un nom en remplaçant les éventuels espaces par des underscores
    const extension = MIME_TYPES[file.mimetype]; // Génère l'extension du fichier
    callback(null, name + Date.now() + '.' + extension); // Genère le nom complet du fichier
  }
});

// Export de l'élément multer, seuls les fichiers de type image seront gérés
module.exports = multer({storage: storage}).single('image');
