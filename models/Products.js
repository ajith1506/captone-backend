const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: "pending" },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Products", ProductSchema);
