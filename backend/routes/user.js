// Contient les fonctions qui s'appliquent aux différentes routes pour les utilisateurs

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const verifyPassword = require('../middleware/verifyPassword');

// Création des routes Inscription et Connexion de l'API avec les middlewares
// et controllers d'authentification et de sécurité qui leur sont appliquées
router.post('/signup', verifyPassword, userCtrl.signup); // Crée un nouvel utilisateur
router.post('/login', userCtrl.login); // Connecte un utilisateur

module.exports = router;
