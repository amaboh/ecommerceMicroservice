const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");

const Product = require("./Product");
const isAuthenticated = require("../isAuthenticated");

const app = express();

var order; 
var channel, connection;

app.use(express.json());

const PORT = process.env.PORT || 8083;

const url = "mongodb://0.0.0.0/product-service";

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Product-Service DB connected`);
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
  await channel.assertQueue("PRODUCT");
};

connect();

// Create a new product
// Buy a new product.

app.post("/product/create", isAuthenticated, async (req, res) => {
  // req.user.email

  const { name, description, price } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
  });
  newProduct.save()
  return res.json(newProduct);
});

app.post("/product/buy", isAuthenticated, async (req, res) => {
  const { ids } = req.body;
  console.log(ids)
  const products = await Product.find({ _id: { $in: ids } });
  console.log(products)
  channel.sendToQueue(
    "ORDER",
    Buffer.from(
      JSON.stringify({
        products,
        userEmail: req.user.email, 
      })
    )
  );
  channel.consume("PRODUCT", (data)=>{
    console.log("Consuming PODUCT queue");
    order = JSON.parse(data.content);
    channel.ack(data);
  });
  return res.json(order)

});




app.listen(PORT, () => {
  console.log(`Product-service at ${PORT}`);
});
