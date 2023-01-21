const express = require('express');
const router = express.Router();

// Models
const Admin = require('../models/admin');

// Routes

// Get all categories
router.get("/isAdmin/:userId", async (req, res) => {
  try {
      const { userId } = req.params;
      const admin = await Admin.findOne({ userId });
      res.send(admin ? true : false);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
  });
  
// Add admin
router.post("/", async (req, res) => {
  try {
      const { userId } = req.body;
      await Admin.create({ userId });
      res.send("Created");
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
  });

module.exports = router;

