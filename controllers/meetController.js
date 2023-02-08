
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