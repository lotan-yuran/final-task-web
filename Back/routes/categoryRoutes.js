const express = require('express');
const router = express.Router();

// Models
const Category = require('../models/category');

// Routes

// Get all categories
router.get("/", async (req, res) => {
  try {
      const categories = await Category.find();
      res.send(categories);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }

  });
  
// Add category
router.post("/", async (req, res) => {
  try {
      const { name } = req.body;
      await Category.create({ name });
      res.send("Created");
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
  });

module.exports = router;

