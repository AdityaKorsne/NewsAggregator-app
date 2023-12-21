const express = require("express");
const routes = express.Router();
const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
routes.use(bodyParser.json());

try {
  mongoose.connect("mongodb://localhost:27017/newsAggregator", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connected to db");
} catch (err) {
  console.log("error connecting to db");
}

routes.post("/register", async (req, res) => {
  try {
    if (req.body.password.length < 8)
      return res
        .status(400)
        .send({ Message: "minLength of Password must be 8" });
  } catch (err) {
    return res.status(400).send({ Message: "Password not entered" });
  }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    preferences: req.body.preferences,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });

  newUser
    .save()
    .then((data) => {
      res.status(200).send({ Message: "New user created successfully" });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email: email,
  })
    .then((user) => {
      if (!user)
        return res.status(400).send({ Message: `email not registered...` });

      try {
        const verifyPassword = bcrypt.compareSync(password, user.password);
        if (!verifyPassword)
          return res.status(401).send({ Message: "Invalid password" });
      } catch (err) {
        return res.status(400).send({ Message: "Password is required" });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        "SECRET",
        {
          expiresIn: 86400,
        }
      );

      res.status(200).send({
        Message: "Login Successful",

        id: user.id,

        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ Message: `Internal server error : ${err}` });
    });
});

// routes.get("/news", async (req, res) => {
//   const url =
//     "https://newsapi.org/v2/everything?" +
//     "q=cricket&q=football&" +
//     "sortBy=popularity&" +
//     "apiKey=d1e74f8168bf4893ace47e996851cc0b";
//   axios
//     .get(url)
//     .then((resp) => res.status(200).send(resp.data))
//     .catch((err) => res.status(400).send(err));
// });

module.exports = routes;
// d1e74f8168bf4893ace47e996851cc0b
