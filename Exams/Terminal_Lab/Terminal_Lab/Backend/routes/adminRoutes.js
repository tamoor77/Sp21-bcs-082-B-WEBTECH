/*import express from 'express';
import  Product  from '../models/productModel.js';
import Order from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import { isAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to protect admin routes
const isAdmin = async (req, res, next) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(403).render('pages/unauthorized', {
      message: 'Access denied. Admins only.',
      session: req.session,
    });
  }
  next();
};

// Admin dashboard (optional)
router.get('/admin', isAuth, isAdmin, (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard', session: req.session });
});


// 🔷 Product Management Routes

// List all products
router.get('/admin/products', isAuth, isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render('admin/products', { title: 'Manage Products', products, session: req.session });
});

// Add product form
router.get('/admin/products/add', isAuth, isAdmin, (req, res) => {
  res.render('admin/add-product', { title: 'Add Product', session: req.session });
});

// Handle product creation
router.post('/admin/products/add', isAuth, isAdmin, async (req, res) => {
  const { name, description, price, image } = req.body;
  await Product.create({ name, description, price, image });
  res.redirect('/admin/products');
});

// Edit product form
router.get('/admin/products/edit/:id', isAuth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/edit-product', { title: 'Edit Product', product, session: req.session });
});

// Handle product update
router.post('/admin/products/edit/:id', isAuth, isAdmin, async (req, res) => {
  const { name, description, price, image } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, description, price, image });
  res.redirect('/admin/products');
});

// Delete product
router.post('/admin/products/delete/:id', isAuth, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});


// 🔷 View Orders

router.get('/admin/orders', isAuth, isAdmin, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.render('admin/orders', { title: 'All Orders', orders, session: req.session });
});

// Optional: Update order status
router.post('/admin/orders/status/:id', isAuth, isAdmin, async (req, res) => {
  const { status } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { status });
  res.redirect('/admin/orders');
});

export default router;
*/