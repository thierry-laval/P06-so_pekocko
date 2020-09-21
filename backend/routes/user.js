// Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

// Contient les fonctions qui s'appliquent aux différentes routes pour les utilisateurs

// On a besoin d'Express
const express = require('express');

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require('../controllers/user');

const verifyPassword = require('../middleware/verifyPassword');

// Création des routes Inscription et Connexion de l'API avec les middlewares
// et controllers d'authentification et de sécurité qui leur sont appliquées
router.post('/signup', verifyPassword, userCtrl.signup); // Crée un nouvel utilisateur
router.post('/login', userCtrl.login); // Connecte un utilisateur

module.exports = router;