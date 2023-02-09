// modules importation

// import express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// import mongoose module 
const mongoose = require("mongoose");



// platformDB : data base name
mongoose.connect('mongodb://127.0.0.1:27017/platformDB');



// models importation

//import meet model
const Meet = require ("./models/meet");

//import specialiste model
const Specialiste = require ("./models/specialiste");

//import utilisateur model
const Utilisateur = require ("./models/utilisateur");

//import formation model
const Formation = require ("./models/formation");

//import support model
const Support = require ("./models/support");



// create express application
const app = express();



// configuration

// configure app with bodyparser to send response => JSON
app.use(bodyParser.json());
// extract an objet of a request
app.use(bodyParser.urlencoded({extended:true}));




// Business Logic : REQ 1 => ADD meet
app.post("/meets",(req, res) =>{
    console.log("HERE BL : REQ to plan meet", req.body);
    let meetObj = new Meet(req.body);
    meetObj.save();
    res.json({message : "Meet added with success"});
});


// Business Logic : REQ 2 => GET all meets
app.get("/meets", (req, res) => {
    Meet.find().then((docs) => {
      res.json({ meets : docs });
    });
});

// Business Logic : REQ 3 => GET all participants

app.get("/formations/:id", (req,res)=> {
  id = req.params.id;
    console.log("Here BL: REQ 3");
    Formation.findOne({_id : id}).then(
          (docs) => {
              res.json({Participants : docs.idUtilisateur });
          }
      );
    }
 );

// Business Logic : REQ 4 => ADD support

app.post("/supports",(req, res) =>{
  console.log("HERE BL : REQ to add support", req.body);
  let supportObj = new Support(req.body);
  supportObj.save();
  res.json({message : "Support added with success"});
});

// Business Logic : REQ 5 => UPDATE support by id

app.put("/supports/:id", (req, res) => {
  var id = req.params.id;
  Support.updateOne({ _id: id }, req.body).then((response) => {
    res.json({ message: "Support updated with success" });
  });
});

// Business Logic : REQ 6 => GET all supports

app.get("/supports", (req, res) => {
  Support.find().then((docs) => {
    res.json({ supports : docs });
  });
});

// Business Logic : REQ 7 => GET support by id

app.get("/supports/:id", (req, res) => {
  var id = req.params.id;
  Support.findOne({ _id: id }).then((doc) => {
    res.json({ support : doc });
  });
});

// Business Logic : REQ 8 => DELETE support

app.delete("/supports/:id", (req, res) => {
  var id = req.params.id;
  Support.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Support deleted with success" });
  });
});




// //// Business Logic : REQ 9 => ADD user

// app.post("/utilisateurs",(req, res) =>{
//   console.log("HERE BL : REQ to plan meet", req.body);
//   let utilisateurObj = new Utilisateur(req.body);
//   utilisateurObj.save();
//   res.json({message : "Utilisateur added with success"});
// });



// Business Logic : REQ 10 => ADD formation
app.post("/formations",(req, res) =>{
  console.log("HERE BL : REQ to add formation", req.body);
  let formationObj = new Formation(req.body);
  formationObj.save();
  res.json({message : "Formation added with success"});
});

// Business Logic : REQ 11 => UPDATE formation

app.put("/formations/:id", (req, res) => {
  var id = req.params.id;
  Formation.updateOne({ _id: id }, req.body).then((response) => {
    res.json({ message: "Formation updated with success" });
  });
});



// make app importable 
module.exports = app;