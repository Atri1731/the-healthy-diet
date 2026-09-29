
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    calories: {
      type: Number,
      default: 0,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    ingredients: {
  type: [String],
  default: [],
},

nutrition: {
  protein: {
    type: Number,
    default: null,
  },
  carbohydrates: {
    type: Number,
    default: null,
  },
  fat: {
    type: Number,
    default: null,
  },
  fiber: {
    type: Number,
    default: null,
  },
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);