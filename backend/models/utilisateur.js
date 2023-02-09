// import mongoose module
const mongoose=require('mongoose');
// utilisateur schema
const utilisateurSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    userName : String,
    pwdAccount : String,
    telephone : Number,
    email : String,
    dateOfBirth : String,
    sexe : String,
    
});
// model name : "Utilisateur"
const utilisateur = mongoose.model('Utilisateur',utilisateurSchema);
// make utilisateur importable 
module.exports = utilisateur;