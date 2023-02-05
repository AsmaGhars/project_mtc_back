const mongoose=require('mongoose');

const utilisateurSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName:String,
    pwdAccount:Number,
    telephone:Number,
    email:String,
    dateOfBirth:String,
    sex:String,
    
});
const utilisateur = mongoose.model('Utilisateur',utilisateurSchema);

module.exports=utilisateur;