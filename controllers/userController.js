const express = require("express");
const catchAssyncErrors = require('../middlewares/catchAssyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
// const app = express();
const cloudinary = require('cloudinary');
const bodyparser = require("body-parser");
const User = require("../models/User");


//register user => /register
exports.registerUser = catchAssyncErrors(async (req, res) => {
  const file = req.body.avatar.url;
  const result = await cloudinary.v2.uploader.upload(file, {
      folder: 'avatars',
      width: 150,
      crop: "scale"
  })

  let {
    firstName,
    lastName,
    password,
    telephone,
    email,
    dateOfBirth,
    gender,
    role
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
          url: result.secure_url
      },
    role
  }).catch(err => {
      console.log(err);
      res.status(400).json({
          success: false,
          message: 'user Already created'
      });
  })
  sendToken(user, 200, res);
})

//Login user =>/login
exports.loginUser= catchAssyncErrors(async (req, res, next) => {
  const {
      email,
      password
  } = req.body;
  // check if email is entred by user 
  if (!email || !password) {
      return next(new ErrorHandler('please enter your email & your password', 400));
  }
  //finding user in dataBase
  const user = await User.findOne({
      email
  }).select('+password');
  console.log(user);

  if (!user) {
      return next(new ErrorHandler('Invalid Email or Password', 401));
  }
  //checks if pasword is correct or not 

  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid Password', 401));
  }
  sendToken(user, 200, res);
});

//logout user => /logOut
exports.logout = catchAssyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
  })
  res.status(200).json({
      success: true,
      message: 'Logged out'
  })
})


// //updateUserById
// app.put("/user/:id", (req, res) => {
//   console.log("here BL:REQ to edit utilisateur by id");
//   var id = req.params.id;
//   User.updateOne({ _id: id }, req.body).then((reponse) => {
//     res.json({ message: "update with success" });
//   });
// });
// // delete compte utilisateur
// app.delete("/user/:id", (req, res) => {
//   console.log("here BL :REQ to delete match by id ");
//   var id = req.params.id;
//   User.deleteOne({ _id: id }).then((reponse) => {
//     console.log("here reponse fom DB", reponse);
//     res.json({ message: "deleted with success" });
//   });
// });

//delete all Users => /admin/user/deleteAll
exports.deleteAllUsers = catchAssyncErrors(async (req, res, next) => {
  await User.deleteMany();
  res.status(200).json({
      success: true,
      message: "All Users deleted successfully"
  })
})

// module.exports = User;
