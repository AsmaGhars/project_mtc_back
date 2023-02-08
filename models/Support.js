const mongoose = require("mongoose");
// support schema
const supportSchema = mongoose.Schema({
  SupportURL: String,
});

// model name : "Support"
const support = mongoose.model("Support", supportSchema);

// make support importable
module.exports = support;
