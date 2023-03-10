const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema({
    products: [],
    userId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
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

