const express = require('express');
const router = express.Router();

// Import the product model
const Product = require('../models/product');
const Category = require('../models/category');

// Define the product routes
router.get('/', async (req, res) => {
  const products = await Product.find().populate('category');
  res.send(products);
});

router.post('/', (req, res) => {
  const { name, price, description, imageURL, categoryId: category } = req.body;
  Product.create({ name, price, description, imageURL, category });
  res.send('Created');
});

module.exports = router;

