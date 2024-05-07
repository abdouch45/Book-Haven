const Genre = require('../models/Genre');
const mongoose = require('mongoose');
const User = require('../models/User');


exports.getAllgenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json( {genres: genres });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createGenre = async (req, res) => {
  try {const iduser=req.user.ObjectId;
    const requser = await User.findById(iduser); 
    if(requser.role!='admin'&&requser.role!="stockmanager"){
      res.status(403).json( {error:'forbiden dont have privilege '});      
    }
    else{
    const { category} = req.body; 
    const newGenre = new Genre({ category});
    if(!category){
      res.json( {error: 'Please fill all infos' });
    }else{
      await newGenre.save();
    res.json('Genre added');}}
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteGenre = async (req, res) => {
    try {
      const iduser=req.user.ObjectId;
        const requser = await User.findById(iduser); 
        if(requser.role!='admin'&&requser.role!="stockmanager"){
          res.status(403).json( {error:'forbiden dont have privilege '});      
        }else{
      const { id } = req.params;
      console.log(id)
      if(mongoose.Types.ObjectId.isValid(id))   await Genre.findByIdAndDelete(id);
      res.json('genre deleted');}
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  //to do handle errors like if genre is not a array extra........ and not all data are necessary
  exports.modifyGenre = async (req, res) => {
    try {
      
      const iduser=req.user.ObjectId;
        const requser = await User.findById(iduser);

        if(requser.role!='admin'&&requser.role!="stockmanager"){
          res.status(403).json( {error:'forbiden dont have privilege '});      
        }else{
      const { id } = req.params;
      var genre=null;
    if(mongoose.Types.ObjectId.isValid(id)) genre = await Genre.findById(id);
      const { category} = req.body; 
    if(!category){
        res.json(  'no data to change' );
      } else {
        if (!genre) {
          res.status(404).json( {  error: 'Genre not found' });
        } else {
          // Update the genre details
          genre.category = category;

  
          // Save the updated genre
          await genre.save();
  
          res.json('changes saved');
        }
      }}
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };