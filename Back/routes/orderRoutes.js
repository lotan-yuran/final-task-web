const express = require('express');
const router = express.Router();

// Models
const Order = require('../models/order');

// Routes

// Get all the not deleted products
router.get("/", async (req, res) => {
    const orders = await Order.find({ deletedAt: { $ne: null } }).populate("products");
    res.send(orders);
  });
  
// Add product
router.post("/", async (req, res) => {
    const { products, name, address, phone } = req.body;
    await Order.create({ products, name, address, phone, orderedAt: new Date(), deletedAt: null });
    res.send("Created");
  });

// Delete order by orderId (set deletedAt to current date)
router.delete("/:orderId", async (req, res) => {
    const { orderId } = req.params;
    await Order.updateOne({ _id: orderId }, { deletedAt: Date.now() });
    res.send("Deleted");
  });

module.exports = router;

