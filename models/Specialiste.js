const mongoose = require("mongoose");
// specialiste schema
const specialisteSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  pwd: String,
  téléphone: Number,
  email: String,
  dateOfBirth: String,
  gender: String,
  specialite: String,
  niveauEtude: String,
  avis: String,
});

// model name : "Specialiste"
const specialiste = mongoose.model("Specialiste", specialisteSchema);

// make specialiste importable
module.exports = specialiste;
