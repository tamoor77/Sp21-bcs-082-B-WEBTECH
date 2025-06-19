import express from 'express';
import { productController, singleProductController } from '../controller/productController.js';
import productModel from "../models/products.js"; // this is your mongoose model
import { isAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/get-all', productController);
router.get('/:id', singleProductController);

// List all products
router.get('/products', isAuth, async (req, res) => {
  const products = await productModel.find();
  res.render('products/list', { products, user: req.session.user });
});

// Show Add Product form
router.get('/products/add', isAuth, (req, res) => {
  res.render('products/form', { title: 'Add Product', product: {} });
});

// Add product
router.post('/products/add', isAuth, async (req, res) => {
  const { title, price, description } = req.body;
  const products = await productModel.create({ title, price, description,  createdBy: req.user._id });
  res.redirect('/products');
  console.log(products)
});

// Show Edit Product form
router.get('/products/edit/:id', isAuth, async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) return res.redirect('/products');
  res.render('products/form', { title: 'Edit Product', product });
});

// Update product
router.post('/products/edit/:id', isAuth, async (req, res) => {
  const { title, price, description, image } = req.body;
  await productModel.findByIdAndUpdate(req.params.id, { title, price, description, image });
  res.redirect('/products');
});

// Delete product
router.post('/products/delete/:id', isAuth, async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

export default router;
