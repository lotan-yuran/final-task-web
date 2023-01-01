const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    description: {
        type: String,
        require: false
    },
    imageURL: {
        type: String,
        require: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        require: true,
      }
});

const Product = mongoose.model("product", productScheme, "product");
module.exports = Product;

