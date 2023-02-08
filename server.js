const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const errorMiddelware = require("./middlewares/errors");
const auth = require("./routes/userRoute");
const cors = require("cors");
require("dotenv").config();
const { logger } = require("./middleware/logEvents");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;
// Connect to MongoDB
connectDB();
//HELLO
// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`error: ${err.stack}`);
  console.log("shutting down due to uncaught exceptions ");
  process.exit(1);
});
//use express.json
app.use(express.json());
//use the cookie-parser
app.use(cookieParser());
// custom middleware logger
app.use(logger);

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload({useTempFiles: true}));
// middelware to handle errors
app.use(errorMiddelware);

//set up cloudianry
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (err) {
  console.log(err);
}

// Cross Origin Resource Sharing   :  check if the front end is allowed to access the api if not bloke it
app.use(cors(corsOptions));
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

try {
  app.use("", auth);
} catch (err) {
  console.log("Auth error", err);
}
