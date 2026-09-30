
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/profile.controller");

router.get("/", protect, getMyProfile);
router.patch("/", protect, updateMyProfile);

module.exports = router;