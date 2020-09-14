// Contient les fonctions qui s'appliquent aux différentes routes pour les sauces

const express = require('express'); // Nécessaire pour utiliser le router d'Express
const router = express.Router(); // Appel du routeur d'Express

const auth = require('../middleware/auth'); // Récupère la configuration d'authentification JsonWebToken
const multer = require('../middleware/multer-config'); // Récupère la configuration 'multer' pour gérer les fichiers images
const saucesCtrl = require('../controllers/sauces'); // Récupère les logiques métiers à appliquer à chaque route du CRUD

// Création des différentes routes de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/:id/like', auth, saucesCtrl.likeDislike)

module.exports = router;
