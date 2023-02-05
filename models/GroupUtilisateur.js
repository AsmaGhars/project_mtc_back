const mongoose = require("mongoose");

const grouputilisateurSchema = mongoose.Schema({
  NomGroup: String,
  DescriptionGroup: String,
});

const grouputilisateur = mongoose.model(
  "GroupUtilisateur",
  grouputilisateurSchema
);

module.exports = grouputilisateur;
