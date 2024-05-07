const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  //name, biography
  name: { type: String, required: true },
  biography: { type: String, required: true },
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;