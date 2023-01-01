const express = require('express');
const router = express.Router();

// Import the product model
const Product = require('../models/product');

// Define the product routes
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.post('/', (req, res) => {
  const { name, price, description, imageURL } = req.body;
  Product.create({ name, price, description, imageURL });
  res.send('Created');
});

module.exports = router;