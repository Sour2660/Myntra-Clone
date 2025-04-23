// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   userId: String,
//   products: [
//     {
//       productId: String,
//       quantity: { type: Number, default: 1 }
//     }
//   ]
// });

// module.exports = mongoose.model('Cart', cartSchema);


const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
