const jwt = require('jsonwebtoken');

// Middleware qui vérifie le TOKEN de l'utilisateur, s'il correspond à l'id de l'utilisateur dans la requête,
// il sera autorisé à changer les données correspondantes.
// Ce middleware sera appliqué à toutes les routes afin de les sécuriser
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le header de la requête
    // Vérifier le token décodé avec la clé secrète initiéé avec la création du token encodé initialement (Cf Controller user)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Vérifier que le userId envoyé avec la requête correspond au userId encodé dans le token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'userId non valde';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !' })
  }
}
