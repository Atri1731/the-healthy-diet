// const express = require("express");
// const router = express.Router();

// const { createContact } = require("../controllers/contact.controller");

// router.post("/", createContact);

// module.exports = router;



const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

const {
  createContact,
  getAllContactMessages,
  updateContactStatus,
  deleteContactMessage,
} = require("../controllers/contact.controller");

// Customer: submit a contact form
router.post("/", createContact);

// Admin: view all messages
router.get("/admin/all", protect, adminOnly, getAllContactMessages);

// Admin: update message status
router.patch(
  "/admin/:contactId/status",
  protect,
  adminOnly,
  updateContactStatus
);

// Admin: delete a message
router.delete(
  "/admin/:contactId",
  protect,
  adminOnly,
  deleteContactMessage
);

module.exports = router;
