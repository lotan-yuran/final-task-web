const mongoose = require("mongoose");

const categoryScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});

const Category = mongoose.model("category", categoryScheme, "category");
module.exports = Category;

