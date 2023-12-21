const news = require("../helper/news");
const verifyToken = require("../helper/verifyToken");
const express = require("express");
const routes = express.Router();
const User = require("../models/userModel");
const bodyParser = require("body-parser");
const url = `https://newsapi.org/v2/everything?q=cricket&q=football&sortBy=popularity&apiKey=d1e74f8168bf4893ace47e996851cc0b`;

routes.use(bodyParser.json());

routes.get("/news", async (req, res) => {
  res.status(200).send(await news.getNews(url));
});

routes.get("/news/preference", verifyToken, async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user.id);
    let queryString = "";
    for (let i = 0; i < user.preferences.length; i++) {
      queryString = queryString + user.preferences[i].toLowerCase();
      if (i + 1 != user.preferences.length) queryString = queryString + "&q=";
    }
    const filterURL = `https://newsapi.org/v2/everything?q=${queryString}&sortBy=popularity&apiKey=d1e74f8168bf4893ace47e996851cc0b`;
    res.status(200).send(await news.getNews(filterURL));
  } else {
    res.status(401).send(req.message);
  }
});

routes.patch("/news/preferences", verifyToken, async (req, res) => {
  const newPreferences = req.body.preferences;
  console.log(newPreferences);
  if (req.user) {
    const user = await User.findById(req.user.id);
    console.log(user);
    await User.updateOne(
      { email: user.email },
      { $set: { preferences: newPreferences } }
    );
    res.status(200).send({ Message: "Preferences updated successfully." });
  } else {
    res.status(401).send(req.message);
  }
});

module.exports = routes;
