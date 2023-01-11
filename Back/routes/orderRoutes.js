const express = require('express');
const router = express.Router();

// Models
const Order = require('../models/order');

// Routes

// Get all the orders of user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.send(orders);
  });
  
// Add product
router.post("/", async (req, res) => {
    const { products, userId, name, address, phone } = req.body;
    await Order.create({ products, userId, name, address, phone, orderedAt: new Date() });
    res.send("Created");
  });

// Delete order by orderId (set deletedAt to current date)
router.delete("/:orderId", async (req, res) => {
    const { orderId } = req.params;
    await Order.deleteOne({ _id: orderId });
    res.send("Deleted");
  });

module.exports = router;

