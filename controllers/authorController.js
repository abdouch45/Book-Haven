const Author = require('../models/Author');
const mongoose = require('mongoose');
const User = require('../models/User');


exports.getAllauthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json( {authors: authors });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const iduser=req.user.ObjectId;
        const requser = await User.findById(iduser); 
        if(requser.role!='admin'&&requser.role!="stockmanager"){
          res.status(403).json( {error:'forbiden dont have privilege '});      
        }else{
    const { name, biography} = req.body; 
    const newAuthor = new Author({ name, biography});
    if(!name || !biography){
      res.json( {error: 'Please fill all infos' });
    }else{
      await newAuthor.save();
    res.json('Author added');}
  } }catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteAuthor = async (req, res) => {
    try {
      const iduser=req.user.ObjectId;
        const requser = await User.findById(iduser); 
        if(requser.role!='admin'&&requser.role!="stockmanager"){
          res.status(403).json( {error:'forbiden dont have privilege '});      
        }else{
      const { id } = req.params;
      console.log(id)
      if(mongoose.Types.ObjectId.isValid(id)) await Author.findByIdAndDelete(id);
      res.json('Author deleted');
    } }catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  //to do handle errors like if genre is not a array extra........ and not all data are necessary
  exports.modifyAuthor = async (req, res) => {
    try {
      const iduser=req.user.ObjectId;
        const requser = await User.findById(iduser); 
        if(requser.role!='admin'&&requser.role!="stockmanager"){
          res.status(403).json( {error:'forbiden dont have privilege '});      
        }else{
      const { id } = req.params;
      var author=null;
    if(mongoose.Types.ObjectId.isValid(id))  author = await Author.findById(id);
      const { name, biography} = req.body; 
    if(!name && !biography){
        res.json(  'no data to change' );
      } else {
        if (!author) {
          res.status(404).json( {  error: 'Author not found' });
        } else {
          // Update the author details
          if(name) author.name = name;
          if(biography) author.biography = biography;
          // Save the updated author
          await author.save();
  
          res.json('changes saved');
        }
      }
    }} catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };