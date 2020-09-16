// Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

const http = require('http'); //Importation du package http - https requiert un certificat SSL à obtenir avec un nom de domaine
const app = require('./app'); //Importation de app pour utilisation de l'application sur le serveur

// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
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

//Si aucun port n'est fourni on écoutera sur le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Traite les différents types d'erreur possible
// Recherche les différentes erreurs et les gère de manière appropriée
//Elle est ensuite enregistrée dans le serveur
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

//Créer un serveur avec express qui utilise app
const server = http.createServer(app); //https requiert un certificat SSL à obtenir avec un nom de domaine

//Lance le serveur et affiche sur quel port se connecter ou gère les erreurs s'il y en a
server.on('error', errorHandler);
server.on('listening', () => { //un écouteur d'évènements consignant le port nommé sur lequel le serveur s'exécute dans la console
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});

server.listen(port); //Le serveur écoute le port définit plus haut
