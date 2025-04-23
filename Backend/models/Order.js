const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: String,
      name: String,
      image: String,
      quantity: Number,
    },
  ],
  
  paymentMethod: String,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
