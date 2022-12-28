const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema({
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "product",
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

