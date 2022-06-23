const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("./User");

const app = express();

const PORT = process.env.PORT || 7070;

mongoose.connect(
  "mongodb://localhost/auth-service",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Auth-Service DB connected`);
  }
);

app.use(express.json());

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email });
  if (!user) {
    return res.json({ message: "User doesn't exist" });
  } else {
    // check if the entered password is valid
    if (password !== user.password) {
      return res.json({ message: "Password Incorrect" });
    }
    const payload = {
      email,
      name: user.name,
    };
    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else {
        return res.json({ token: token });
      }
    });
  }
});

app.post("/auth/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "User already  exists" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      console.log(newUser)
      newUser.save();
      return res.json(newUser);
    }
  } catch (error) {
    console.log(`Error ${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`Auth-service at ${PORT}`);
});
