const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  //category
  category: { type: String, required: true ,unique:true},

});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;