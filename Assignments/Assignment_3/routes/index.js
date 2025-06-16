const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const products = require('./../public/data/product'); // Adjust if needed

// Redirect to login as default route
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Login page
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login', error: null });
});

// Handle login form (no auth for now)
router.post('/login', (req, res) => {
  res.redirect('/home');
});

// Home page after login
router.get('/home', (req, res) => {
  res.render('pages/home', {
    title: 'Home',
    products: Object.values(products)
  });
});

// Product list page
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

// Register form (optional functionality)
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

// Logout just redirects
router.get('/logout', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
