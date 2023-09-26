const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array, default: null },
    size: { type: String },
    color: { type: String },
    price: { type: Number, default: 0 },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", ProductSchema);
