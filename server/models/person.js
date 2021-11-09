const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  address: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  userId: { type: String, required: true},
  password: { type: String, required: true}
});

module.exports = mongoose.model("Person", PersonSchema);