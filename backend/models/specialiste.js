// import mongoose module
const mongoose = require("mongoose");
// specialiste schema
const specialisteSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    userName : String,
    pwdAccount : Number,
    téléphone : Number,
    email : String,
    dateOfBirth : String,
    sexe : String,
    specialite : String,
    niveauEtude : String,
    note : Number,
    avis : String
}) 

// model name : "Specialiste"
const specialiste = mongoose.model("Specialiste",specialisteSchema);

// make specialiste importable 
module.exports = specialiste;