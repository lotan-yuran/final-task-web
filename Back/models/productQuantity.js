const mongoose = require("mongoose");

const productQuantitySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    require: true
  },
  quantity: {
    type: Number,
    require: true,
    min: 1
  }
});

module.exports = productQuantitySchema;

