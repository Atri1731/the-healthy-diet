
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
  getUserData,
  updateCart,
  updateFavorites,
} = require("../controllers/userData.controller");

router.get("/", protect, getUserData);
router.put("/cart", protect, updateCart);
router.put("/favorites", protect, updateFavorites);

module.exports = router;