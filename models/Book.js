// Book.js
const mongoose = require('mongoose');
const Author = require('./Author');
const Genre = require('./Genre');


const bookSchema = new mongoose.Schema({
  //title, author, ISBN, publication date, genre, price, stock_quantity
  title: { type: String, required: true },
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'Author',required: true },
  ISBN:{type:String,required: true,unique:true },
  publication_date: { type: Date, required: true },
  genre: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  price:{type:Number,required: true },
  qte:{type:Number,required: true,min: 0, integer: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
