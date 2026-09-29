const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

const {
  createOrder,
  getMyOrders,
   getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

// Place a new order (login required)
router.post("/", protect, createOrder);

// Get orders belonging to the logged-in user
router.get("/my-orders", protect, getMyOrders);

router.get("/admin/all", protect, adminOnly, getAllOrders);

// Update order status (admin only)
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

module.exports = router;