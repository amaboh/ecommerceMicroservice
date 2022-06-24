const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");

const Order = require("./Order");
const isAuthenticated = require("../isAuthenticated");

const app = express();

var channel, connection;

app.use(express.json());

const PORT = process.env.PORT || 9090;

const url = "mongodb://0.0.0.0/order-service";

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Order-Service DB connected`);
  }
);

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

const connect = async () => {
  const amqpServer = "amqp://0.0.0.0:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("ORDER");
};

function createOrder(products, userEmail) {
  let total = 0;
  for (let t = 0; t < products.length; ++t) {
    total += products[t].price;
  }
  const newOrder = new Order({
    products,
    user: userEmail,
    total_price: total,
  });
  newOrder.save();
  return newOrder;
}

connect().then(() => {
  channel.consume("ORDER", (data) => {
    console.log("Consuming ORDER queue");
    const { products, userEmail } = JSON.parse(data.content);
    const newOrder = createOrder(products, userEmail);
    channel.ack(data);
    channel.sendToQueue("PRODUCT", Buffer.from(JSON.stringify({ newOrder })));
  });
});

// Create a new product
// Buy a new product.

app.listen(PORT, () => {
  console.log(`Product-service at ${PORT}`);
});
