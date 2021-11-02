const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  address: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
});

module.exports = mongoose.model("Person", PersonSchema);