const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// // Models
const Order = require("./models/order");

// Import routes
const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./orderRoutes');

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

  app.use('/product',productRoutes);

app.get("/order", async (req, res) => {
  const orders = await Order.find().populate("products");
  res.send(orders);
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
