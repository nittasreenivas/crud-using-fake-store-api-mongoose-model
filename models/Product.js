const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Jewelry", "Food", "Clothing"],
    },
    image: {
      type: String,
      required: true,
    },

    rating: {
      type: ratingSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

exports.Product = mongoose.model("Product", productSchema);
