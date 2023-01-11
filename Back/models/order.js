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

Order.schema.pre('save', function(next) {
    Object.freeze(this.products);
    next();
});

module.exports = Order;

