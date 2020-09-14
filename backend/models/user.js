const mongoose = require('mongoose');
require('mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

// la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in,
// s'assurera que deux utilisateurs ne peuvent partager la même adresse e-mail.
// Utilisation d'une expression régulière pour valider le format d'email.
// Le mot de passe fera l'objet d'une validation particulière grâce au middleware verifPasword et au model password
const userSchema = mongoose.Schema({
 email:{ type:String, unique:true, required:[true,"Veuillez entrer votre adresse email"], match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"] },
  password: { type: String, required:[true,"Veuillez choisir un mot de passe"] }
});

userSchema.plugin(uniqueValidator);

// Plugin pour Mongoose qui purifie les champs du model avant de les enregistrer dans la base MongoDB.
// Utilise le HTML Sanitizer de Google Caja pour effectuer la désinfection.
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema);


