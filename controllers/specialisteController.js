const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Meet = require("../models/Meet");
const Support = require("../models/Support");
const Formation = require("../models/Formation");
const GroupUtilisateur = require("../models/GroupUtilisateur");
const Note = require("../models/Note");

// Middleweares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ADD meet
app.post("/meets", (req, res) => {
  console.log("HERE BL : REQ to plan meet", req.body);
  let meetObj = new Meet(req.body);
  meetObj.save();
  res.json({ message: "Meet added with success" });
});

// GET all meets
app.get("/meets", (req, res) => {
  Meet.find().then((docs) => {
    res.json({ meets: docs });
  });
});

// DELETE Meet
app.delete("/meets/:id", (req, res) => {
  var id = req.params.id;
  Meet.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Meet deleted with success" });
  });
});

// Update Meet
app.put("/meets/:id", (req, res) => {
  var id = req.params.id;
  Meet.updateOne({ _id: id }, req.body).then((response) => {
    res.json({ message: "Meet updated with success" });
  });
});
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
// GET all participants
app.get("/formations/:id", (req, res) => {
  id = req.params.id;
  console.log("Here BL: REQ 3");
  Formation.findOne({ _id: id }).then((docs) => {
    res.json({ Participants: docs.idUtilisateur });
  });
});

// CREATE formation
app.post("/formations", (req, res) => {
  console.log("HERE BL : REQ to add formation", req.body);
  let formationObj = new Formation(req.body);
  formationObj.save();
  res.json({ message: "Formation added with success" });
});

// UPDATE formation

app.put("/formations/:id", (req, res) => {
  var id = req.params.id;
  Formation.updateOne({ _id: id }, req.body).then((response) => {
    res.json({ message: "Formation updated with success" });
  });
});

//  GET all formations
app.get("/formations", (req, res) => {
  Formation.find().then((docs) => {
    res.json({ formation: docs });
  });
});

//  GET formations by id
app.get("/formations/:id", (req, res) => {
  var id = req.params.id;
  Formation.findOne({ _id: id }).then((doc) => {
    res.json({ formation: doc });
  });
});

// DELETE formations
app.delete("/formations/:id", (req, res) => {
  var id = req.params.id;
  Formation.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Formation deleted with success" });
  });
});
// add group
app.post("/grouputilisateur", (req, res) => {
  console.log("here BL: REQ to add group", req.body);
  groupUtilisateurObj = new GroupUtilisateur(req.body);
  groupUtilisateurObj.save();
  res.json({ messaage: "group added with success" });
});
// DELETE notes
app.delete("/notes/:id", (req, res) => {
  var id = req.params.id;
  note.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Note deleted with success" });
  });
});
// add note
app.post("/notes", (req, res) => {
  console.log("here BL: REQ to add group", req.body);
  note = new Note(req.body);
  note.save();
  res.json({ messaage: "note added with success" });
});
//  GET all notes
app.get("/notes", (req, res) => {
  Note.find().then((docs) => {
    res.json({ note: docs });
  });
});
