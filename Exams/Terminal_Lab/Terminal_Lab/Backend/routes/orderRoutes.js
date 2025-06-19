import express from 'express';
import Order from '../models/orderModel.js';
import { isAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Create a new order (protected by token-based auth middleware)
router.post('/order', isAuth, async (req, res) => {
  try {
    const { items, totalAmount, customerInfo } = req.body;

    const newOrder = new Order({
      user: req.user._id,
      items,
      totalAmount,
      customerInfo  // Optional, in case you want to store name/email/address
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: 'Order placed successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error placing order',
      error
    });
  }
});

// ✅ Get all orders of the logged-in user (secure)
router.get('/order/my', isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).send({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error fetching orders',
      error
    });
  }
});

export default router;
