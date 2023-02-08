const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

//configure app with bodyparser to send response => JSON
app.use(bodyParser.json());

//extract an objet of a request
app.use(bodyParser.urlencoded({ extended: true }));

//add catégorie
app.get("/categories", (req, res) => {
  Category.find().then((docs) => {
    res.json({ categories: docs });
  });
});
//get category by id
app.get("/categories/:id", (req, res) => {
  var id = req.params.id;
  Category.findOne({ _id: id }).then((doc) => {
    res.json({ category: doc });
  });
});
//insert category
app.post("/categories", (req, res) => {
  let categoryObj = new Category(req.body);
  categoryObj.save();
  res.json({ message: "Category inserted" });
});

//delete category
app.delete("/categories/:id", (req, res) => {
  var id = req.params.id;
  Category.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Category deleted" });
  });
});
//update category
app.put("/categories/:id", (req, res) => {
  var id = req.params.id;
  Category.updateOne({ _id: id }, req.body).then((response) => {
    res.json({ message: "Category updated" });
  });
});

//add competition
app.get("/competitions", (req, res) => {
  Competition.find().then((docs) => {
    res.json({ competitions: docs });
  });
});
//get competition by id
app.get("/competitions/:id", (req, res) => {
  var id = req.params.id;
  Competition.findOne({ _id: id }).then((doc) => {
    res.json({ competition: doc });
  });
});
//insert competition
app.post("/competitions", (req, res) => {
  let competitionObj = new Category(req.body);
  competitionObj.save();
  res.json({ message: "competition inserted" });
});

//delete competition
app.delete("/competitions/:id", (req, res) => {
  var id = req.params.id;
  Competition.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Competition deleted" });
  });
});
//update competition
app.put("/competitions/:id", (req, res) => {
  var id = req.params.id;
  Competition.updateOne({ _id: id }, req.body).then((response) => {
    res.json({ message: "Competition updated" });
  });
});

//add specialist
app.get("/Specialists", (req, res) => {
  Specialist.find().then((docs) => {
    res.json({ specialists: docs });
  });
});
//get specialist by id
app.get("/Specialists/:id", (req, res) => {
  var id = req.params.id;
  Specialist.findOne({ _id: id }).then((doc) => {
    res.json({ specialist: doc });
  });
});
//insert specialist
app.post("/Specialists", (req, res) => {
  let SpecialistObj = new Category(req.body);
  SpecialistObj.save();
  res.json({ message: "specialist inserted" });
});

//delete specialist
app.delete("/Specialists/:id", (req, res) => {
  var id = req.params.id;
  Specialist.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Specialist deleted" });
  });
});
//update specialist
app.put("/Specialists/:id", (req, res) => {
  var id = req.params.id;
  Specialist.updateOne({ _id: id }, req.body).then((response) => {
    res.json({ message: "Specialist updated" });
  });
});
//add Participant
app.get("/participant", (req, res) => {
  Participant.find().then((docs) => {
    res.json({ Participant: docs });
  });
});