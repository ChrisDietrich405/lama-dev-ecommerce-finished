const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, unique: true },
    products: [ 
      {
        productId: {
          type: mongoose.Types.ObjectId,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Cart", CartSchema);
