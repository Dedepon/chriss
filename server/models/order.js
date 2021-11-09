const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  donator: {type: mongoose.Schema.Types.ObjectId, ref: "Person"},
  totalPrice: Number,
  totalPriceToPay: Number,
  comment: String,
  presents: [{type: mongoose.Schema.Types.ObjectId, ref: "PresentOrder"}],
  status: { type: String, enum: ["open", "close"]}
});

module.exports = mongoose.model("Order", OrderSchema);