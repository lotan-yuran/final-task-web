const mongoose = require("mongoose");

const adminScheme = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    }
});

const Admin = mongoose.model("admin", adminScheme, "admin");
module.exports = Admin;

