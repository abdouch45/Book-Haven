const mongoose = require('mongoose');
const Book = require('./Book');

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['ready', 'on_delivery', 'canceled', 'delivered', 'returned'],
    default: 'ready'
  },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  qte: { type: Number, required: true, min: 0, integer: true }
}, {
  timestamps: true 
});

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'client', 'seller', 'stockmanager', 'deliveryman'],
    default: 'client'
  },
  orders: [orderSchema] 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
