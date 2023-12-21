const mongoose = require("mongoose");

function dbConnection() {
  try {
    mongoose.connect("mongodb://localhost:27017/newsAggregator", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to db");
  } catch (err) {
    console.log("error connecting to db");
  }
}

module.exports = dbConnection();
