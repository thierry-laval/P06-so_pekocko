//LOGIQUE METIER UTILISATEURS APPLIQUE AUX ROUTES POST POUR LES OPERATIONS D'INSCRIPTION ET DE CONNEXION

const bcrypt = require('bcrypt') // Algorithme bcrypt pour hasher le mot de passe
const User = require('../models/user'); // Appel à notre modèle 'user'
const jwt = require('jsonwebtoken'); //Package JsonWebToken permettant d'attribuer un TOKEN à un utilisateur quand il se connecte


//Sauvegarde un nouvel utilisateur et crypte son mot de passe
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)  //hachage du mot de passe, salage par 10
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save() //Sauvegarde de l'utilisateur
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Vérifie si l'utilisateur existe dans la base MongoDB lors du login, si oui il vérifie son mot de passe,
//s'il est bon il renvoie un TOKEN content l'id de l'utilisateur, sinon il renvoie une erreur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({  //Le serveur backend renvoie un token au frontend
            userId: user._id,
            token: jwt.sign( //Encode un nouveau token avec une chaine de développement temporaire
              { userId: user._id }, // Encodage de l'userdID nécéssaire dans le cas où une requête transmettrait un userId (ex: modification d'une sauce)
              'RANDOM_TOKEN_SECRET', // Clé d'encodage du token pouvant être rendue plus complexe en production
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


