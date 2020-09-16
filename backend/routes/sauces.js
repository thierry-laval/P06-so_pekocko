// Contient les fonctions qui s'appliquent aux différentes routes pour les sauces

const express = require('express'); // Nécessaire pour utiliser le router d'Express
const router = express.Router(); // Appel du routeur d'Express

//Import du middleware auth pour sécuriser les routes
const auth = require('../middleware/auth'); // Récupère la configuration d'authentification JsonWebToken
//Import du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config'); // Récupère la configuration 'multer' pour gérer les fichiers images
const saucesCtrl = require('../controllers/sauces'); // Récupère les logiques métiers à appliquer à chaque route du CRUD

// Création des différentes routes de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers
router.post('/', auth, multer, saucesCtrl.createSauce); // Crée une nouvelle sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce); // Modifie une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce); // Supprime une sauce
router.get('/:id', auth, saucesCtrl.getOneSauce); // Récupère une sauce précise
router.get('/', auth, saucesCtrl.getAllSauce); // Récupère toutes les sauces
router.post('/:id/like', auth, saucesCtrl.likeDislike) // Like ou dislike une sauce

module.exports = router;
