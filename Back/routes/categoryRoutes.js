const express = require('express');
const router = express.Router();

// Models
const Category = require('../models/category');

// Routes
router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  });
  
router.post("/", async (req, res) => {
    const { name } = req.body;
    await Category.create({ name });
    res.send("Created");
  });

module.exports = router;

