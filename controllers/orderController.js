const User = require('../models/User');
const Book = require('../models/Book');
const { ObjectId } = require('mongodb');



exports.getAllorders = async (req, res) => {
  try {
    const iduser=req.user.ObjectId;
        const requser = await User.findById(iduser); 
        if(requser.role!='admin'&&requser.role!="stockmanager"&&requser.role!="deliveryman"&&requser.role!="client"){
         return res.status(403).json( {error:'forbiden dont have privilege '});      
        }else{
          var orders;
          if(requser.role==="client"){
             orders = await User.findById(iduser).select('-password -role').populate('orders.book', 'title');//add role tests
          }
          else{
             orders = await User.find({ 'orders.0': { $exists: true } }).select('-password -role').populate('orders.book', 'title');//add role tests
          }

    res.json( {orders: orders });
  }} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createOrder = async (req, res) => {
  try {  
    const id=req.user.ObjectId;
    console.log(req.user)
    const bookId=req.body.bookid
    const quantity=req.body.quantity
    const user = await User.findById(id); 
    const book = await Book.findById(bookId);
    if (!user) {
      res.status(404).json( {error:'client not found'});
    }else {
      if (!book) {
        res.status(404).json( {error:'Book not found'});
        
          
    }else{ 
      if (user.role !== 'client') {
        res.status(403).json( {error:'Only clients can place orders'});  
    }
    else {

      if (quantity > book.qte) {
      res.status(403).json( {error:'Requested quantity exceeds available stock'});
    }
    else{
          if(quantity<=0){
            res.status(403).json( {error:'bad Request '});

        }
  
    else{
      const order = {
                      status: 'ready',
                      book: bookId,
                      qte: quantity
                    };
    user.orders.push(order);
    await user.save();
    res.json({  message: 'Order placed successfully' });
    }}}}}
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
//'ready','on_delivery', 'canceled', 'delivred','returned'

  exports.changeOrderStatus = async (req, res) => {
    try {
      const iduser=req.user.ObjectId;
    const requser = await User.findById(iduser); 
      const { id } = req.params;
      
      const user = await User.findOne({ "orders._id": id });
      var order;
      if(user!=null){
       order = user.orders.find(orde => orde._id.equals(id));
    }else{
      return  res.status(404).json( {  error: 'User not found' });
    }
      const newStatus = req.body.status; 
    if(!newStatus){
        res.Status(400).json(  'no input' );
      } else {
        if (!order) {
          res.status(404).json( {  error: 'Order not found' });
        } else {
          if((requser.role==='client' && requser._id===user._id && (newStatus==='canceled'||newStatus==='delivered'))||
          (requser.role==='admin')||
          (requser.role==='stockmanager' && (newStatus==='canceled'||newStatus==='on_delivery'||newStatus==='returned'))
              ){
                if((requser.role==="client"&&(order.status=='delivered'||order.status=='canceled'))||
                (requser.role==='stockmanager' && (order.status==='canceled'||order.status==='returned'))
                ){
                  res.status(403).json( {error:` you can not change status from${order.status} to ${newStatus}`});      
                }
          // Update status details
                
                order.status = newStatus;
                await user.save();
                 res.json('Status changed successfully');

              }else{
                res.status(403).json( {error:'forbiden dont have privilege '});      
              }
  
        
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
