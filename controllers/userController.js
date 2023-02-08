const express = require("express");
const catchAssyncErrors = require("../middlewares/catchAssyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const app = express();
const cloudinary = require("cloudinary");
const bodyparser = require("body-parser");

const User = require("../models/User");
const Support = require("../models/Support");
const Formation = require("../models/Formation");
const Meet = require("../models/Meet");
const Note = require("../models/Note");
//register user => /register
exports.registerUser = catchAssyncErrors(async (req, res) => {
  const file = req.body.avatar.url;
  const result = await cloudinary.v2.uploader.upload(file, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  let {
    firstName,
    lastName,
    password,
    telephone,
    email,
    dateOfBirth,
    gender,
    role,
  } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    password,
    dateOfBirth,
    gender,
    telephone,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    role,
  }).catch((err) => {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "user Already created",
    });
  });
  sendToken(user, 200, res);
});

//Login user =>/login
exports.loginUser = catchAssyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email is entred by user
  if (!email || !password) {
    return next(
      new ErrorHandler("please enter your email & your password", 400)
    );
  }
  //finding user in dataBase
  const user = await User.findOne({
    email,
  }).select("+password");
  console.log(user);

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  //checks if pasword is correct or not

  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 401));
  }
  sendToken(user, 200, res);
});

//logout user => /logOut
exports.logout = catchAssyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//updateUserById;
app.put("/user/:id", (req, res) => {
  console.log("here BL:REQ to edit utilisateur by id");
  var id = req.params.id;
  User.updateOne({ _id: id }, req.body).then((reponse) => {
    res.json({ message: "update with success" });
  });
});
// delete user
app.delete("/user/:id", (req, res) => {
  console.log("here BL :REQ to delete match by id ");
  var id = req.params.id;
  User.deleteOne({ _id: id }).then((reponse) => {
    console.log("here reponse fom DB", reponse);
    res.json({ message: "deleted with success" });
  });
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
// GET all meets
app.get("/meets", (req, res) => {
  Meet.find().then((docs) => {
    res.json({ meets: docs });
  });
});
//  GET note by id
app.get("/notes/:id", (req, res) => {
  var id = req.params.id;
  Note.findOne({ _id: id }).then((doc) => {
    res.json({ note: doc });
  });
});
// GET all note
app.get("/notes", (req, res) => {
  Note.find().then((docs) => {
    res.json({ notes: docs });
  });
});
// DELETE notes
app.delete("/notes/:id", (req, res) => {
  var id = req.params.id;
  Note.deleteOne({ _id: id }).then((response) => {
    res.json({ message: "Note deleted with success" });
  });
});
