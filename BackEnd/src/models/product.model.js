const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "marcos", "liddy", "caressa"],
        message: "{VALUE} is not supported",
      },
    },
    rating: {
      type: Number,
      default: 4.5,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)
module.exports = { Product }
