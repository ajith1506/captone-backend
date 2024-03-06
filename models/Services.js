const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
  details: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Services", ServiceSchema);
