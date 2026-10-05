// const express = require("express");

// const router = express.Router();

// const {
//   register,
//   login,
//   googleLogin,
//   googleRegister,
//   setupFirstAdmin,
// } = require("../controllers/auth.controller");

// // Create a customer account
// router.post("/register", register);

// // Login for customers and admins
// router.post("/login", login);

// // Login with Google
// router.post("/google", googleLogin);

// // Register with Google
// router.post("/google/register", googleRegister);

// // Set up the initial admin account
// router.post("/setup-first-admin", setupFirstAdmin);

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  register,
  login,
  googleLogin,
  googleRegister,
  setupFirstAdmin,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/auth.controller");

const {
  protect,
  adminOnly,
} = require("../middleware/auth.middleware");

// Customer authentication
router.post("/register", register);
router.post("/login", login);

// Google authentication
router.post("/google", googleLogin);
router.post("/google/register", googleRegister);

// Initial admin setup
router.post("/setup-first-admin", setupFirstAdmin);

// Admin customer management
router.get("/customers", protect, adminOnly, getCustomers);
router.put("/customers/:id", protect, adminOnly, updateCustomer);
router.delete("/customers/:id", protect, adminOnly, deleteCustomer);

module.exports = router;