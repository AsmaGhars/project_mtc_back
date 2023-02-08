const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Meet = require("./models/Meet");
const Specialiste = require("./models/Specialiste");
const Utilisateur = require("./models/Utilisateur");
const Formation = require("./models/Formation");
const Support = require("./models/Support");

// Middleweares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//  ADD support
app.post("/supports", (req, res) => {
  console.log("HERE BL : REQ to add support", req.body);
  let supportObj = new Support(req.body);
  supportObj.save();
  res.json({ message: "Support added with success" });
});


//  GET all supports
app.get("/supports", (req, res) => {
  Support.find().then((docs) => {
    res.json({ supports: docs });
  });
});

//  GET support by id
app.get("/supports/:id", (req, res) => {
  var id = req.params.id;
  Support.findOne({ _id: id }).then((doc) => {
    res.json({ support: doc });
  });
});

// DELETE support
app.delete("/supports/:id", (req, res) => {
  var id = req.params.id;
  Support.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Support deleted with success" });
  });
});
