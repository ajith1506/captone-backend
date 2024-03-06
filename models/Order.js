const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    cardName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    address: { type: String, required: true },
    expMonth: { type: String, required: true },
    expYear: { type: String, required: true },
    zip: { type: String, required: true },
    cvc: { type: String, required: true },
    status: { type: String, default: "pending" },
    pdName: { type: String, default: null },
    PD: { type: Array, default: null },
    total: { type: Number, default: null },
    pdImg: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRzw6SN4ElnYCaLU_sC2JMTmSC5-fPIGEG28yQXw&s",
    },
    pdPrice: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
