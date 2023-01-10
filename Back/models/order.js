const mongoose = require("mongoose");
const productQuantitySchema = require("./productQuantity");

const orderScheme = new mongoose.Schema({
    products: {
        type: [productQuantitySchema],
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    orderedAt: {
        type: Date,
        require: true
    }
});

const Order = mongoose.model("order", orderScheme, "order");
module.exports = Order;

