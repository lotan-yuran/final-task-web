const express = require('express');
const router = express.Router();

// Models
const Cart = require('../models/cart');

// Routes

// Get cart by user id
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            res.send([]);
            return;
        }

        cart = await cart.populate("products.product");
        const activeProducts = cart.products.filter(
            item => item.product.isActive === true
            );
        res.send(activeProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

// Set cart by user id
router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { products } = req.body;
        const cart = await Cart.findOne({ userId });
        
        if (cart) {
            await Cart.updateOne({ userId }, { products });
        } else {
            await Cart.create({ userId, products });
        }

        res.send("Updated")  
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
});
  
module.exports = router;

