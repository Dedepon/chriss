const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  url: String,
  name: String
});

module.exports = mongoose.model("Shop", ShopSchema);