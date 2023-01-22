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
    const orders = await Order.find({ userId }).sort({ orderedAt: -1 });;
    res.send(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add order
router.post("/", async (req, res) => {
  try {
    const { products, userId, name, address, phone } = req.body;
    const fullProducts = [];

    for (const p of products) {
      const current = await Product.findById(p.product).populate("category");
      fullProducts.push({ product: { ...current }, quantity: p.quantity }); // the ... is because without this it not return the full category object     
    }

    const createdOrder = await Order.create({
      products: fullProducts,
      userId,
      name,
      address,
      phone,
      orderedAt: new Date(),
    });
    res.send(createdOrder);
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
