
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

const {
  getDashboardStats,
  getAllCustomers,
} = require("../controllers/admin.controller");

router.get("/stats", protect, adminOnly, getDashboardStats);

router.get("/users", protect, adminOnly, getAllCustomers);

module.exports = router;