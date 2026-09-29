const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

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

module.exports = {
  register,
  login,
  setupFirstAdmin,
};