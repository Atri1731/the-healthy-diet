const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);


// ================= GOOGLE LOGIN =================

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required.",
      });
    }

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google account.",
      });
    }

    const {
      email,
      email_verified,
    } = payload;

    if (!email || !email_verified) {
      return res.status(401).json({
        success: false,
        message: "Google email could not be verified.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find existing account
    const user = await User.findOne({
      email: cleanEmail,
    });

    // Google Login does NOT create an account
    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "No account found with this Google email. Please sign up first.",
      });
    }

    // Google Login is only for customers
    if (user.role !== "user") {
      return res.status(403).json({
        success: false,
        message:
          "Google login is available for customer accounts only.",
      });
    }

    // Create normal JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Google login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);

    return res.status(401).json({
      success: false,
      message: "Unable to login with Google.",
    });
  }
};

// ================= GOOGLE REGISTER =================

const googleRegister = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required.",
      });
    }

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google account.",
      });
    }

    const {
      email,
      name,
      email_verified,
    } = payload;

    if (!email || !email_verified) {
      return res.status(401).json({
        success: false,
        message: "Google email could not be verified.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Do not create duplicate accounts
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists. Please login instead.",
      });
    }

    // Generate an internal password.
    // The user never sees or enters this password.
    const randomPassword = crypto
      .randomBytes(32)
      .toString("hex");

    const hashedPassword = await bcrypt.hash(
      randomPassword,
      10
    );

    // Create customer account
    const user = await User.create({
      name: (name || "Google User").trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "user",
    });

    // Create normal application JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "Google account created successfully.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google registration error:", error);

    return res.status(401).json({
      success: false,
      message: "Unable to create your Google account.",
    });
  }
};


// ================= REGISTER =================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();

if (cleanName.length < 2) {
  return res.status(400).json({
    success: false,
    message: "Name must contain at least 2 characters.",
  });
}

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};


// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: cleanEmail,
    });



    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};



const setupFirstAdmin = async (req, res) => {
  try {
    const { name, email, password, setupKey } = req.body;

    // Verify the private setup key configured by the website owner.
    if (
      !process.env.ADMIN_SETUP_KEY ||
      !setupKey ||
      setupKey !== process.env.ADMIN_SETUP_KEY
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid admin setup authorization.",
      });
    }

    // Only allow initial setup while no Admin account exists.
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin setup has already been completed.",
      });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a name, valid email, and password of at least 8 characters.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    let user = await User.findOne({ email: cleanEmail });

    if (user) {
      // If this email already belongs to a customer, require its password
      // to match before promoting that account.
      const passwordMatches = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatches) {
        return res.status(409).json({
          success: false,
          message: "This email already belongs to an account. Use its existing password or choose another email.",
        });
      }

      user.name = cleanName;
      user.role = "admin";
      await user.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      user = await User.create({
        name: cleanName,
        email: cleanEmail,
        password: hashedPassword,
        role: "admin",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Initial Admin account created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("First Admin setup error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to complete Admin setup.",
    });
  }
};

// ================= ADMIN CUSTOMER MANAGEMENT =================

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" })
      .select("_id name email createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error("Get customers error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load customers",
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters",
      });
    }

    const customer = await User.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Never allow this endpoint to modify an admin account.
    if (customer.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Admin accounts cannot be managed as customers",
      });
    }

    // Check whether another account already uses this email.
    const emailExists = await User.findOne({
      email: cleanEmail,
      _id: { $ne: id },
    });

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "This email is already being used by another account",
      });
    }

    customer.name = cleanName;
    customer.email = cleanEmail;

    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        role: customer.role,
        createdAt: customer.createdAt,
      },
    });
  } catch (error) {
    console.error("Update customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update customer",
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await User.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Never allow an admin account to be deleted here.
    if (customer.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Admin accounts cannot be deleted as customers",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Customer removed successfully",
    });
  } catch (error) {
    console.error("Delete customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to remove customer",
    });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  googleRegister,
  setupFirstAdmin,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};