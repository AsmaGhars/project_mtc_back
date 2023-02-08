const mongoose = require("mongoose");
// formation schema
const formationSchema = mongoose.Schema({
  nomFormation: String,
  nombreParticipant: Number,
  prixFormation: Number,
  dateDébutFormation: String,
  dateFinFormation: String,
  duréeFormation: String,
  description: String,
});

// model name : "Formation"
const formation = mongoose.model("Formation", formationSchema);

// make formation importable
module.exports = formation;
