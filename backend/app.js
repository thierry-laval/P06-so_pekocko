//Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

// APPLICATION : fait appel aux différentes fonctions implémentées dans l'APi :
// Accès aux images, aux route User, aux route Sauce

const express = require('express'); //importation d'express => Framework basé sur node.js
const bodyParser = require('body-parser'); //Permet d'extraire l'objet JSON des requêtes POST
const mongoose = require('mongoose'); // Plugin Mongoose pour se connecter à la data base Mongo Db
const path = require('path'); // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier

// Helmet est un plugin de sécurité très complet, qui permet de protéger l'application de certaines vulnérabilités en configurant de manière appropriée des en-têtes HTTP.
// Entre autres choses, il sécurise nos requêtes HTTP, sécurise les en-têtes, contrôle la prélecture DNS du navigateur, empêche le détournement de clics,
// ajoute une protection XSS mineure et protège contre le reniflement de TYPE MIME * /
const helmet = require('helmet')
const session = require('cookie-session');
const nocache = require('nocache');

//Import des routes
const saucesRoutes = require('./routes/sauces'); //Déclaration de la route sauce
const userRoutes = require('./routes/user'); //Déclaration de la route user

// Appel et injection du package dotenv dans notre configuration de connection
require('dotenv').config();

//Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
mongoose.connect(process.env.DB_URI,
  { useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Création d'une application express
const app = express(); //L'application utilise le framework express

//Middleware Header pour contourner erreurs de CORS
app.use((req, res, next) => {
  //on indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //on indique les entêtes qui seront utilisées après la pré-vérification cross-origin (vérifie sur le protocole CORS est autorisé)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //n'autorise que ce serveur à fournir des scripts pour la page visitée
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

//Options de sécurisation des cookies
const expiryDate = new Date( Date.now() + 3600000); // 1 heure (60 * 60 * 1000)
app.use(session({
  name: 'session',
  secret: process.env.SEC_SES,
  cookie: { secure: true,
            httpOnly: true,
            domain: 'http://localhost:3000',
            expires: expiryDate
          }
  })
);

//Rendre la requete exploitable
//Middleware qui permet de parser les requêtes envoyées par le client, on peut y accéder grâce à req.body
app.use(bodyParser.urlencoded({extended: true}));
// Transforme le corps de la requête en un objet JSON
app.use(bodyParser.json());
//Sécuriser Express en définissant divers en-têtes HTTP
// https://www.npmjs.com/package/helmet#how-it-works
app.use(helmet());
//Désactive la mise en cache du navigateur
app.use(nocache());
//Gestion de la ressource image de façon statique
//Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));
//Routes attendues - Routage
//Middleware qui va transmettre les requêtes vers ces url vers les routes correspondantes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
