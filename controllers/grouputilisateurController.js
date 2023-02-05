const express = require("express");
const app = express();
const GroupUtilisateur = require("../models/GroupUtilisateur");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// add group
app.post("/grouputilisateur", (req, res) => {
  console.log("here BL: REQ to add group", req.body);
  groupUtilisateurObj = new GroupUtilisateur(req.body);
  groupUtilisateurObj.save();
  res.json({ messaage: "group added with success" });
});

module.exports = groupUtilisateur;
