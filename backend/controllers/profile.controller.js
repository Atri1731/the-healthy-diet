
const User = require("../models/user.model");

// GET CURRENT USER PROFILE
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch profile.",
    });
  }
};

// UPDATE CURRENT USER PROFILE
const updateMyProfile = async (req, res) => {
  try {
    const name =
      typeof req.body.name === "string" ? req.body.name.trim() : "";

    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 50 characters.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Prevent another account from using this email.
    const existingUser = await User.findOne({
      email,
      _id: { $ne: user._id },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    user.name = name;
    user.email = email;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    // Handle duplicate email conflicts, including database race conditions.
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile.",
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};