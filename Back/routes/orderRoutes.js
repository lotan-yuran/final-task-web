const express = require('express');
const router = express.Router();

// Models
const Order = require('../models/order');

// Routes
router.get("/", async (req, res) => {
    const orders = await Order.find().populate("products");
    res.send(orders);
  });
  
router.post("/", (req, res) => {
    console.log("sdfds")
    const { products, name, address, phone } = req.body;
    Order.create({ products, name, address, phone, createdAt: new Date() });
    res.send("Created");
  });

module.exports = router;

