const mongoose = require("mongoose");

const PresentOrderSchema = new mongoose.Schema({
  present: {type: mongoose.Schema.Types.ObjectId, ref: 'Present'},
  quantity: Number,
  totalPrice: Number,
  payment: {
    type: String,
    enum: ["directOrder", "payment"]
  }
});

module.exports = mongoose.model("PresentOrder", PresentOrderSchema);