// Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

// On importe multer qui est un package qui permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

// On crée un dictionnaire des types MIME pour définire le format des images
// Donc la creation d'un objet pour ajouter une extention en fonction du type mime du ficher
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// On crée un objet de configuration pour préciser à multer où enregistrer les fichiers images et les renommer
const storage = multer.diskStorage({

  // On mets la destination d'enregistrement des images
  destination: (req, file, callback) => {

    // On passe le dossier images qu'on a créé dans le backend
    callback(null, 'images');
  },
  // On dit à multer quel nom de fichier on utilise pour éviter les doublons
  filename: (req, file, callback) => {

    // On génère un nouveau nom avec le nom d'origine, on supprime les espaces (white space avec split) et on insère des underscores à la place
    let name = file.originalname.split(' ').join('_');
    let extension = MIME_TYPES[file.mimetype];
    name = name.replace("." + extension, "_");

    // On appelle le callback, on passe null pour dire qu'il n'y a pas d'erreur
    // et on crée le filename en entier, on ajoute un timestamp, un point et enfin l'extension du fichier
    callback(null, name + Date.now() + '.' + extension); // Genère le nom complet du fichier- Nom d'origine + numero unique + . + extension
  }
});

// On export le module, on lui passe l'objet storage, la méthode single pour dire que c'est un fichier unique et on précise que c'est une image
module.exports = multer({
  storage: storage
}).single('image');
