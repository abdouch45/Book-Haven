const Book = require('../models/Book');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
  .populate('author', 'name') 
  .populate('genre', 'category');
    res.json({ books:books });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createBook = async (req, res) => {
  //add test if book isnb exists 
  try {
    const iduser=req.user.ObjectId;
        const requser = await User.findById(iduser); 
        if(requser.role!='admin'&&requser.role!="stockmanager"){
          res.status(403).json( {error:'forbiden dont have privilege '});      
        }else{
    const { title, author, ISBN, publication_date, genre, price, qte } = req.body; 
    const newBook = new Book({ title, author, ISBN, publication_date, genre, price, qte });
    if(!title || !author || !ISBN || !publication_date || !price || !qte){
      res.json( {error: 'Please fill all infos' });
    }else{
      await newBook.save();
    res.json('book added');}
  } }catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteBook = async (req, res) => {
  try {const iduser=req.user.ObjectId;
    const requser = await User.findById(iduser); 
    if(requser.role!='admin'&&requser.role!="stockmanager"){
      res.status(403).json( {error:'forbiden dont have privilege '});      
    }else{
    const { id } = req.params;
    if(mongoose.Types.ObjectId.isValid(id))    await Book.findByIdAndDelete(id);
    res.json('book deleted');
  } }catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
//t do handle errors like if genre is not a array extra........ and not all data are necessary
exports.modifyBook = async (req, res) => {
  try {
    const iduser=req.user.ObjectId;
        const requser = await User.findById(iduser); 
        if(requser.role!='admin'&&requser.role!="stockmanager"){
          res.status(403).json( {error:'forbiden dont have privilege '});      
        }else{
    const { id } = req.params;
    var book=null;
    if(mongoose.Types.ObjectId.isValid(id))  book = await Book.findById(id);

    const { title, author, ISBN, publication_date, genre, price, qte } = req.body;
    if(!id && !title && !author && !ISBN && !publication_date && !price && !qte) {
      res.json(  'no data to change' );
    } else {
      if (!book) {
        res.status(404).json( {  error: 'Book not found' });
      } else {
        // Update the book details
       if(title) book.title = title;
       if(author) book.author = author;
       if(ISBN) book.ISBN = ISBN;
       if(publication_date) book.publication_date = publication_date;
       if(genre) book.genre = genre;
       if(price) book.price = price;
       if(qte) book.qte = qte;

        // Save the updated book
        await book.save();

        res.json('changes saved');
      }
    }
  }} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

/*add stock managment operations
/*
exports.renderEditForm = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      const books = await Product.find();
      res.render('books', {books, error: 'Product not found' });
    }
    res.render('editProduct', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
*/