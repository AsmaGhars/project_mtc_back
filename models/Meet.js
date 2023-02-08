const mongoose = require("mongoose");
// meet schema
const meetSchema = mongoose.Schema({
    Sujet : String,
    Date : String
}) 

// model name : "Meet"
const meet = mongoose.model("Meet",meetSchema);

// make meet importable 
module.exports = meet;