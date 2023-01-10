const mongoose = require("mongoose");
const productQuantitySchema = require("./productQuantity");

const cartScheme = new mongoose.Schema({
    products: {
        type: [productQuantitySchema],
        require: true
    },
    userId: {
        type: String,
        require: true
    }
});

const Cart = mongoose.model("cart", cartScheme, "cart");
module.exports = Cart;

