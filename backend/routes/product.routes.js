
const express = require("express");
const router = express.Router();

const {
  getProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

// Public menu: available products only
router.get("/", getProducts);

// Admin-only routes: login and admin role required
router.get("/admin/all", protect, adminOnly, getAllProducts);
router.post("/", protect, adminOnly, createProduct);
router.patch("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;