const mongoose = require("mongoose");

const PresentSchema = new mongoose.Schema({
  name: String,
  url: String,
  imageUrl: String,
  comment: String,
  shop: {type: mongoose.Schema.Types.ObjectId, ref: "Shop"},
  price: { type: Number, min: 0 },
  quantity: Number,
  ordered: Number,
  paymentMethod: [{ type: String, enum: ["directOrder", "payment"] }],
  status: {
    type: String,
    enum: ["complete", "ongoing"]
  },
});

module.exports = mongoose.model("Present", PresentSchema);