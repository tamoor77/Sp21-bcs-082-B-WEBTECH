const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const products = require('./../public/data/product'); // Static product data

// Redirect to login as default route
router.get('/', (req, res) => {
  res.redirect('/login');
});

/* Login page
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login', error: null });
});

// Handle login (no auth for now)
router.post('/login', (req, res) => {
  res.redirect('/home');
});*/

//Login apii

router.get('/login', (req, res) => {
  res.render('pages/login', { error: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Replace with your actual auth API endpoint
    const response = await axios.post('http://localhost:8081/api/v1/user/login', {
      email,
      password
    });

    // Store user info in session
    req.session.user = response.data.user; // adjust field names as per your API
        console.log('Session after login:', req.session.user);


    res.redirect('/home');
  } catch (err) {
    res.render('pages/login', { error: 'Invalid credentials' });
  }
});


//
// Signup page
router.get('/register', (req, res) => {
  res.render('pages/register', { error: null });
});

// Handle signup
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const response = await axios.post('http://localhost:8081/api/v1/user/register', {
      name,
      email,
      password
    });

    console.log('🟢 API Response:', response.data); // Check this in your terminal

    // Set session only if API sends user object
    if (response.data && response.data.user) {
      req.session.user = response.data.user;
    }

    res.redirect('/login'); // Redirect regardless of session set (for now)
  } catch (err) {
    const message =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Registration failed. Try again.';
    res.render('pages/register', { error: message });
  }
});

//logout


// Logout route using API
router.get('/logout', async (req, res) => {
  try {
    // Optionally call your backend logout endpoint
   await axios.get('http://localhost:8081/api/v1/user/logout', {
  headers: {
    Authorization: `Bearer ${req.session.user?.token}`
  }
});

  } catch (err)
  {
    console.error('API logout failed:', err.message);
    // You may want to ignore API logout failure and continue
  }

  // Destroy the session on frontend side regardless
  req.session.destroy(err => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).send('Logout failed');
    }
    res.redirect('/login');
  });
});


//update Password api hander


router.put('/update-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!req.session.user || !req.session.user.token) {
    return res.redirect('/login'); // user not logged in
  }

  try {
    await axios.put(
      'http://localhost:8081/api/v1/user/update-password',
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${req.session.user.token}`
        }
      }
    );

    res.redirect('/login'); // or show a success message
  } catch (err) {
    console.error('Password update error:', err?.response?.data || err.message);
    res.render('pages/updatePassword', {
      error: 'Password update failed. ' + (err.response?.data?.message || 'Unknown error.')
    });
  }
});


//Forgot Password Page

router.get('/forgot-password', (req, res) => {
  res.render('pages/updatePassword', { error: null, message: null });
});


// Home page
router.get('/home', (req, res) => {
  res.render('pages/home', {
    title: 'Home',
    products: Object.values(products),
    session: req.session
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

  // Convert price string (e.g., "€895.00") to number (e.g., 895.00)
  const numericPrice = typeof product.price === 'string'
    ? parseFloat(product.price.replace(/[^\d.]/g, ''))
    : product.price;

  if (!req.session.cart) req.session.cart = [];

  const cart = req.session.cart;
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: numericPrice,
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



// Register form
const userFilePath = path.join(__dirname, '../user.json');
let users = [];
if (fs.existsSync(userFilePath)) {
  users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
}

//order
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

router.post('/place-order', isAuthenticated, async (req, res) => {
  const cart = req.session.cart || [];

  if (cart.length === 0) {
    return res.redirect('/cart');
  }

  const items = cart.map(item => ({
    productName: item.name,
    quantity: item.quantity,
    price: Number(item.price)
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    await axios.post('http://localhost:8081/api/v1/user/order', {
      items,
      totalAmount
    }, {
      headers: {
        Authorization: `Bearer ${req.session.user?.token}`
      }
    });

    req.session.cart = []; // clear cart after order placed
    res.redirect('/my-orders');
  } catch (err) {
    console.error('Order placement failed:', err.message);
    res.render('pages/checkout', {
      title: 'Checkout',
      cart,
      error: 'Failed to place order.',
      session: req.session
    });
  }
});




router.get('/my-orders', isAuthenticated, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8081/api/v1/order/my', {
      headers: {
        Authorization: `Bearer ${req.session.user?.token}`
      }
    });

    res.render('pages/my-orders', {
      title: 'My Orders',
      orders: response.data.orders,
       session: req.session
    });
  } catch (err) {
    console.error("Fetching orders failed:", err.message);
    res.render('pages/my-orders', {
      title: 'My Orders',
      orders: [],
      error: 'Could not load your orders.',
       session: req.session
    });
  }
});



module.exports = router;
