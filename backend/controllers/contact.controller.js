// const Contact = require("../models/contact.model");

// const createContact = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required.",
//       });
//     }

//     const contact = await Contact.create({
//       name,
//       email,
//       subject,
//       message,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Your message has been sent successfully.",
//       contact: {
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         subject: contact.subject,
//         createdAt: contact.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error("Create contact error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to send your message. Please try again.",
//     });
//   }
// };

// module.exports = {
//   createContact,
// };



const mongoose = require("mongoose");
const Contact = require("../models/contact.model");

// Customer: submit a contact message
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Create contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message. Please try again.",
    });
  }
};

// Admin: fetch all contact messages
const getAllContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Get contact messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load contact messages.",
    });
  }
};

// Admin: update message status
const updateContactStatus = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(contactId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message ID.",
      });
    }

    const allowedStatuses = ["new", "read", "replied"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Use new, read, or replied.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message status updated successfully.",
      contact,
    });
  } catch (error) {
    console.error("Update contact status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update message status.",
    });
  }
};

// Admin: delete a contact message
const deleteContactMessage = async (req, res) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.isValidObjectId(contactId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message ID.",
      });
    }

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete this message.",
    });
  }
};

module.exports = {
  createContact,
  getAllContactMessages,
  updateContactStatus,
  deleteContactMessage,
};
