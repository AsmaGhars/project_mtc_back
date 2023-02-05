const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const Utilisateur = require("../models/Utilisateur");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.put("/utilisateur/:id", (req, res) => {
  console.log("here BL:REQ to edit utilisateur by id");
  var id = req.params.id;
  Utilisateur.updateOne({ _id: id }, req.body).then((reponse) => {
    res.json({ message: "update with success" });
  });
});
// delete compte utilisateur
app.delete("/utilisateur/:id", (req, res) => {
  console.log("here BL :REQ to delete match by id ");
  var id = req.params.id;
  Utilisateur.deleteOne({ _id: id }).then((reponse) => {
    console.log("here reponse fom DB", reponse);
    res.json({ message: "deleted with success" });
  });
});


module.exports = utilisateur;
