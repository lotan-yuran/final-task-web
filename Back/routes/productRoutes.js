const express = require('express');
const router = express.Router();

// Models
const Product = require('../models/product');
const Category = require('../models/category');

// Routes
router.get('/', async (req, res) => {
  const products = await Product.find().populate('category');
  res.send(products);
});

router.post('/', async (req, res) => {
  const { name, price, description, imageURL, categoryId: category } = req.body;
  await Product.create({ name, price, description, imageURL, category });
  res.send('Created');
});

router.get('/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const products = await Product.find({ category: categoryId }).populate('category');
  res.send(products);
});

module.exports = router;

