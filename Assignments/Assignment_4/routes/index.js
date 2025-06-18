const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const products = require('./../public/data/product'); // Static product data

// Redirect to login as default route
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Login page
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login', error: null });
});

// Handle login (no auth for now)
router.post('/login', (req, res) => {
  res.redirect('/home');
});

// Home page
router.get('/home', (req, res) => {
  res.render('pages/home', {
    title: 'Home',
    products: Object.values(products)
  });
});

// Product list
router.get('/products', (req, res) => {
  res.render('pages/product', {
    title: 'Products',
    products: Object.values(products)
  });
});

// Product detail page
router.get('/product/:id', (req, res) => {
  const product = products[req.params.id];
  if (!product) {
    return res.status(404).render('pages/not-found', { title: 'Not Found' });
  }
  res.render('pages/product-detail', {
    title: product.name,
    product
  });
});

// Register page
router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Register', error: null });
});

// Add to cart (STATIC product data)
router.get('/add-to-cart/:id', (req, res) => {
  const productId = req.params.id;
  const product = products[productId];

  if (!product) return res.redirect('/products');

  if (!req.session.cart) req.session.cart = [];

  const cart = req.session.cart;
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  res.redirect('/cart');
});

// Cart page
router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.render('pages/cart', {
    title: 'Your Cart',
    cart
  });
});

// Update quantity
router.post('/update-quantity', (req, res) => {
  const { id, quantity } = req.body;
  const cart = req.session.cart || [];
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity = parseInt(quantity);
  }
  res.redirect('/cart');
});

// Remove item
router.post('/remove-item', (req, res) => {
  const { id } = req.body;
  req.session.cart = (req.session.cart || []).filter(item => item.id !== id);
  res.redirect('/cart');
});

// Checkout page
router.get('/checkout', (req, res) => {
  const cart = req.session.cart || [];

  if (cart.length === 0) {
    return res.redirect('/cart');
  }

  res.render('pages/checkout', {
    title: 'Checkout',
    cart
  });
});


// Order placement (Dummy, doesn't store anywhere)
router.post('/place-order', (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) return res.redirect('/cart');

  const { name, phone, address } = req.body;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // You can later save order to a DB here
  req.session.cart = []; // Clear cart
  res.render('order-success', { title: 'Order Placed', total });
});

// Register form
const userFilePath = path.join(__dirname, '../user.json');
let users = [];
if (fs.existsSync(userFilePath)) {
  users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
}

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.render('pages/register', { title: 'Register', error: 'User already exists' });
  }

  users.push({ email, password });
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
  res.redirect('/login');
});

// Logout
router.get('/logout', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
