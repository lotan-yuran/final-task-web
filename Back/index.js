const express = require("express");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();
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

// Import routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const scrapingRoutes = require("./routes/scrapingRoutes");

app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);
// app.use("/scraping", scrapingRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT;
const myServer = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Web Socket
const wss = new WebSocket.Server({ server: myServer });

let connectedClients = 0;

wss.on("connection", (ws) => {
  connectedClients++;

  ws.on("close", () => {
    connectedClients--;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(connectedClients);
      }
    });
  });

  ws.on("message", (message) => {
    // Handle force change of connected clients number
    if (message.toString() === "increment") {
      connectedClients++;
    }
    if (message.toString() === "decrement") {
      connectedClients--;
    }

    // Send update to all users
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(connectedClients);
      }
    });
  });
});
