// APPLICATION : fait appel aux différentes fonctions implémentées dans l'APi :
// Accès aux images, aux route User, aux route Sauce

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
// Helmet est un plugin de sécurité très complet, utilisé pour de nombreuses raisons différentes
// Entre autres choses, il sécurise nos requêtes HTTP, sécurise les en-têtes, contrôle la prélecture DNS du navigateur, empêche le détournement de clics,
// ajoute une protection XSS mineure et protège contre le reniflement de TYPE MIME * /
const helmet = require('helmet')
const session = require('cookie-session');
const nocache = require('nocache');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Appel et injection du package dotenv dans notre configuration de connection
require('dotenv').config();
//Connection à la base de données
mongoose.connect(process.env.DB_URI,
  { useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Création d'une application express
const app = express();

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

//Middleware qui permet de parser les requêtes envoyées par le client, on peut y accéder grâce à req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Sécuriser Express en définissant divers en-têtes HTTP
app.use(helmet());
//Désactive la mise en cache du navigateur
app.use(nocache());
//Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));
//Middleware qui va transmettre les requêtes vers ces url vers les routes correspondantes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
