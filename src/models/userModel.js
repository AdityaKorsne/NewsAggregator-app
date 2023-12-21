const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    unique: [true, "email is already registered"],
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: "Invalid email",
    },
  },
  number: {
    type: Number,
    required: [true, "Number is required"],
  },
  preferences: {
    type: [String],
    required: [true, "Preference is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
  },
  role: {
    type: String,
    required: [true, "role is required"],
    enum: ["normal", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
