const express = require('express');
const router = express.Router();

// Models
const Product = require('../models/product');
const Category = require('../models/category');

// Routes

// Get all active products
router.get('/', async (req, res) => {
  const products = await Product.find({ isActive: true }).populate('category');
  res.send(products);
});


// Add product
router.post('/', async (req, res) => {
  const { name, price, description, imageURL, categoryId: category } = req.body;
  await Product.create({ name, price, description, imageURL, category, isActive: true });
  res.send('Created');
});

// Get the active products by categoryId
router.get('/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const products = await Product.find({ category: categoryId, isActive: true }).populate('category');
  res.send(products);
});

// Delete product by productId (set isActive to false)
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  await Product.updateOne({ _id: productId }, { isActive: false });
  res.send("Deleted");
});


module.exports = router;

