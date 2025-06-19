import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);
