const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { isAuth } = require('../middleware/authMiddleware');

// List all products
router.get('/products', isAuth, async (req, res) => {
  const products = await Product.find();
  res.render('products/list', { products, user: req.session.user });
});

// Show Add Product form
router.get('/products/add', isAuth, (req, res) => {
  res.render('products/form', { title: 'Add Product', product: {} });
});

// Add product
router.post('/products/add', isAuth, async (req, res) => {
  const { title, price, description, image } = req.body;
  await Product.create({ title, price, description, image, createdBy: req.session.user._id });
  res.redirect('/products');
});

// Show Edit Product form
router.get('/products/edit/:id', isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.redirect('/products');
  res.render('products/form', { title: 'Edit Product', product });
});

// Update product
router.post('/products/edit/:id', isAuth, async (req, res) => {
  const { title, price, description, image } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { title, price, description, image });
  res.redirect('/products');
});

// Delete product
router.post('/products/delete/:id', isAuth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

module.exports = router;
