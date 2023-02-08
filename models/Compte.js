const mongoose = require("mongoose");

const compteSchema = mongoose.Schema({
  dateCreationCompte: String,
  pwdCompte: String,
  pseudoCompte: String,
  idCompte: Number,
});
const compte = mongoose.model("Compte", compteSchema);

module.exports = compte;
