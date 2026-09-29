
const Order = require("../models/order.model");
const User = require("../models/user.model");

// GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const [totalOrders, totalCustomers, revenueResult] =
      await Promise.all([
        Order.countDocuments(),
        User.countDocuments({ role: "user" }),
        Order.aggregate([
          {
            $match: {
              paymentStatus: "paid",
              status: { $ne: "Cancelled" },
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$total" },
            },
          },
        ]),
      ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue: revenueResult[0]?.totalRevenue || 0,
        totalCustomers,
        totalProducts: null,
      },
    });
  } catch (error) {
    console.error("Dashboard statistics error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch dashboard statistics.",
    });
  }
};

// GET /api/admin/users
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" })
      .select("name email role createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Fetch customers error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch customers.",
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllCustomers,
};