const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Meet = require ("./models/meet");
const Specialiste = require ("./models/specialiste");
const Utilisateur = require ("./models/utilisateur");
const Formation = require ("./models/formation");
const Support = require ("./models/support");



// Middleweares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// Business Logic : REQ 3 => GET all participants

app.get("/formations/:id", (req, res) => {
  id = req.params.id;
  console.log("Here BL: REQ 3");
  Formation.findOne({ _id: id }).then((docs) => {
    res.json({ Participants: docs.idUtilisateur });
  });
});

app.post("/formations", (req, res) => {
  console.log("HERE BL : REQ to add formation", req.body);
  let formationObj = new Formation(req.body);
  formationObj.save();
  res.json({ message: "Formation added with success" });
});

// Business Logic : REQ 11 => UPDATE formation

app.put("/formations/:id", (req, res) => {
  var id = req.params.id;
  Formation.updateOne({ _id: id }, req.body).then((response) => {
    res.json({ message: "Formation updated with success" });
  });
});
