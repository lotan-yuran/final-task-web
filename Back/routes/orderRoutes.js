const express = require('express');
const router = express.Router();

// Models
const Order = require('../models/order');

// Routes
router.get("/", async (req, res) => {
    const orders = await Order.find({ deletedAt: { $ne: null } }).populate("products");
    res.send(orders);
  });
  
router.post("/", async (req, res) => {
    const { products, name, address, phone } = req.body;
    await Order.create({ products, name, address, phone, orderedAt: new Date(), deletedAt: null });
    res.send("Created");
  });

router.delete("/", async (req, res) => {
    const { products, name, address, phone } = req.body;
    await Order.create({ products, name, address, phone, orderedAt: new Date(), deletedAt: null });
    res.send("Created");
  });

module.exports = router;

