// Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

// Ecoute des requetes http et reponse
const http = require('http'); // Import du package http - https requiert un certificat SSL à obtenir avec un nom de domaine
const app = require('./app'); // Import de app pour utilisation de l'application sur le serveur

// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne - Cela configure le port de connection en fonction de l'environnement
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Ajout du port de connection si celui-ci n'est pas declarer par l environnement
// Si aucun port n'est fourni on écoutera sur le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port); //Set du port de connection

// la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée
// pour ensuite enregistrée dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Créer un serveur avec express qui utilise app
// création d'une constante pour les appels serveur (requetes et reponses)
const server = http.createServer(app); // https requiert un certificat SSL à obtenir avec un nom de domaine

// gestions des évenements serveur pour un retour console
// Lance le serveur et affiche sur quel port se connecter ou gère les erreurs s'il y en a
server.on('error', errorHandler);
server.on('listening', () => { // Un écouteur d'évènements qui enregistre le port nommé sur lequel le serveur s'exécute dans la console
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});

// Le serveur écoute le port définit plus haut
server.listen(port);