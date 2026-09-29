const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    cartItems: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    favorites: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserData", userDataSchema);