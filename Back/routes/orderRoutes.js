const express = require("express");
const router = express.Router();

// Models
const Order = require("../models/order");
const Product = require("../models/product");

// Routes
router.get("/count-by-user", async (req, res) => {
  try {
    const ordersByUser = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          numOfOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          numOfOrders: 1,
        },
      },
    ]);
    res.json(ordersByUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all the orders of user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add order
router.post("/", async (req, res) => {
  try {
    const { products, userId, name, address, phone } = req.body;

    const productsPromise = products.map(async (p) => {
      const a = Product.findById(p.product);
      return { ...p, product: a };
    });

    const updatedProducts = await Promise.all(productsPromise);
    await Order.create({
      products: updatedProducts,
      userId,
      name,
      address,
      phone,
      orderedAt: new Date(),
    });
    res.send("Created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete order by orderId
router.delete("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.deleteOne({ _id: orderId });
    res.send("Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
