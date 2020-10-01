// Formation OpenClassrooms - Développeur Web - Projet 6 - Thierry Laval

// Middleware qui protégera les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes.

// On récupère le package jsonwebtoken
const jwt = require('jsonwebtoken');

// On vérifie le TOKEN de l'utilisateur, s'il correspond à l'id de l'utilisateur dans la requête, il sera autorisé à changer les données correspondantes.

// Ce middleware sera appliqué à toutes les routes afin de les sécuriser
module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header de la requête autorisation, on récupère uniquement le deuxième élément du tableau (car split)
    const token = req.headers.authorization.split(' ')[1];
    // On vérifie le token décodé avec la clé secrète initiéé avec la création du token encodé initialement (Cf Controller user), les clés doivent correspondre
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // On vérifie que le userId envoyé avec la requête correspond au userId encodé dans le token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'userId non valide'; // si le token ne correspond pas au userId : erreur
    } else {
      next(); // si tout est valide on passe au prochain middleware
    }
  } catch (error) { // probleme d'autentification si erreur dans les inscrutions
    res.status(401).json({
      error: error | 'Requête non authentifiée !'
    })
  }
}
