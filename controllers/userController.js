// userController.js
const User = require('../models/User');
const {ceateToken}=require('../middleware/authmiddleware')
exports.getUser = async (req, res) => {
  try {
    const email=req.body.email;
    const password=req.body.password;
    if(!email||!password){
      res.json( { error: 'Please fill all infos' });
    }else{
    const user = await User.findOne({email:email});
    
    if(!user||user.password!=password){
      res.json( { error: 'Wrong credentials. Please try again.' });
    }else{
      const usr={ObjectId:user._id,role:user.role}
      console.log(usr)
      const token=ceateToken(usr)
      res.json({token:token})
   }}

  } catch (err) {
    console.error(err);
    res.status(500).json({error:'Server Error'});
  }
};

exports.createUser = async (req, res) => {
  try {
    const {firstname, lastname, email, password } = req.body;
    if(!email||!password||!firstname||!lastname){
      res.json({error: 'Please fill all infos' });
    }else{

    const users = await User.find({email:email});
    const user=users[0]
    if(user){
      res.json( { error: 'email already used' });
    }else{

    const newUser = new User({firstname, lastname, email, password });
    await newUser.save();
    const usr={ObjectId:newUser._id,role:newUser.role}
    const token=ceateToken(usr)
    res.json({token:token})
    
  }}
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  
 }
  
};
