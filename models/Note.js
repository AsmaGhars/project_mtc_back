const mongoose = require("mongoose");
// note schema
const noteSchema = mongoose.Schema({
  noteBody: String,
});

// model name : "Note"
const note = mongoose.model("Note", noteSchema);

// make note importable
module.exports = Note;
