// Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

// Contient les fonctions qui s'appliquent aux différentes routes pour les sauces
// Dans le routeur on ne veut QUE la logique de routing ainsi la logique métier sera enregistrée dans le controller sauce.js

// Nécessaire pour utiliser le router d'Express
const express = require('express');

// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();

// On importe le middleware auth pour sécuriser les routes
const auth = require('../middleware/auth'); // Récupère la configuration d'authentification JsonWebToken

//On importe le middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');

// On associe les fonctions aux différentes routes, on importe le controller
const saucesCtrl = require('../controllers/sauces');

// En exportant dans le controller la logique métier, les fonctions, on voit plus clairement quelles sont les routes dont on dispose et on utilisera une sémantique très claire pour comprendre ce qu'elles permettent. On a quelque chose de plus modulaire plus facile à comprendre et plus facile à maintenir

// Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers

// Route qui permet de créer "une sauce"
router.post('/', auth, multer, saucesCtrl.createSauce);

// Route qui permet de modifier "une sauce"
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Route qui permet de supprimer "une sauce"
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Route qui permet de cliquer sur une des sauces précise
router.get('/:id', auth, saucesCtrl.getOneSauce);

// Route qui permet de récupérer toutes les sauces
router.get('/', auth, saucesCtrl.getAllSauce);

// Route qui permet de gérer les likes des sauces
router.post('/:id/like', auth, saucesCtrl.likeDislike)

module.exports = router;