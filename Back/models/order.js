const mongoose = require("mongoose");
const productQuantitySchema = require("./productQuantity");

const orderScheme = new mongoose.Schema({
    products: {
        type: [productQuantitySchema],
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    }
});

const Order = mongoose.model("order", orderScheme, "order");
module.exports = Order;

