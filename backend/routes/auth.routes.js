
const express = require("express");

const router = express.Router();

const {
  register,
  login,
  setupFirstAdmin,
} = require("../controllers/auth.controller");

// Create a customer account
router.post("/register", register);

// Login for customers and admins
router.post("/login", login);

// Set up the initial admin account
router.post("/setup-first-admin", setupFirstAdmin);

module.exports = router;