const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Models
const Product = require("./models/product");
const Order = require("./models/order");

const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Connect to DB
const mongoConnection = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.zkgxhus.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoConnection, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log("Mongo failed");
    console.log(err);
  });

app.get("/product", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/order", async (req, res) => {
  const orders = await Order.find().populate("products");
  res.send(orders);
});

app.post("/product", (req, res) => {
  const { name, price, description, imageURL } = req.body;
  Product.create({ name, price, description, imageURL });
  res.send("Created");
});

app.post("/order", (req, res) => {
  Order.create({ products: req.body.products, name: req.body.name, phone: req.body.phone });
  res.send("Created");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
