const express = require('express');
const router = express.Router();

// Models
const Order = require('../models/order');
const Product = require('../models/product');

// Routes

// Get all the orders of user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.send(orders);
  });
  
// Add order
router.post("/", async (req, res) => {
    const { products, userId, name, address, phone } = req.body;

    const productsPromise = products.map(async p => {
      const a = Product.findById(p.product);
      return {...p, product: a}
    });
    
    const updatedProducts = await Promise.all(productsPromise)
    await Order.create({ products: updatedProducts, userId, name, address, phone, orderedAt: new Date() });
    res.send("Created");
  });

// Delete order by orderId (set deletedAt to current date)
router.delete("/:orderId", async (req, res) => {
    const { orderId } = req.params;
    await Order.deleteOne({ _id: orderId });
    res.send("Deleted");
  });

module.exports = router;

