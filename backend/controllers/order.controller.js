// const Notification = require("../models/notification.model");
// const mongoose = require("mongoose");
// const Order = require("../models/order.model");

// // POST /api/orders
// // Place a new order (login required)
// const createOrder = async (req, res) => {
//   try {
//     const { customer, items, paymentMethod } = req.body;

//     if (
//       !customer ||
//       !customer.name ||
//       !customer.phone ||
//       !customer.email ||
//       !customer.address ||
//       !customer.city ||
//       !customer.pincode
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide all delivery details.",
//       });
//     }

//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Your cart is empty.",
//       });
//     }

//     if (!["cod", "upi", "card"].includes(paymentMethod)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment method.",
//       });
//     }

//     const orderItems = items.map((item) => ({
//       productId: String(item.id || item.productId || ""),
//       name: String(item.name || ""),
//       image: String(item.image || ""),
//       price: Number(item.price),
//       quantity: Number(item.quantity),
//       calories: Number(item.calories || 0),
//     }));

//     const invalidItem = orderItems.some(
//       (item) =>
//         !item.name.trim() ||
//         !Number.isFinite(item.price) ||
//         item.price < 0 ||
//         !Number.isInteger(item.quantity) ||
//         item.quantity < 1
//     );

//     if (invalidItem) {
//       return res.status(400).json({
//         success: false,
//         message: "One or more cart items are invalid.",
//       });
//     }

//     const subtotal = orderItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const deliveryFee = subtotal >= 499 ? 0 : 40;
//     const total = subtotal + deliveryFee;

//     const order = await Order.create({
//       user: req.user.userId,
//       customer: {
//         name: String(customer.name).trim(),
//         phone: String(customer.phone).trim(),
//         email: String(customer.email).trim().toLowerCase(),
//         address: String(customer.address).trim(),
//         city: String(customer.city).trim(),
//         pincode: String(customer.pincode).trim(),
//       },
//       items: orderItems,
//       subtotal,
//       deliveryFee,
//       total,
//       paymentMethod,
//       paymentStatus: "pending",
//       status: "Pending",
//       statusMessage:
//         "Your order has been received and is waiting for confirmation.",
//       rejectionReason: "",
//     });

   
//   } catch (error) {
//     console.error("Create order error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Unable to place your order.",
//     });
//   }
// };

// // GET /api/orders/my-orders
// // Get orders belonging to the logged-in customer
// const getMyOrders = async (req, res) => {
//   try {
//     // Prevent browsers from reusing stale order statuses.
//     res.set({
//       "Cache-Control": "no-store, no-cache, must-revalidate",
//       Pragma: "no-cache",
//       Expires: "0",
//     });

//     const orders = await Order.find({
//       user: req.user.userId,
//     }).sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: orders.length,
//       orders: orders.map((order) => ({
//         id: order._id.toString(),
//         customer: order.customer,
//         items: order.items,
//         subtotal: order.subtotal,
//         deliveryFee: order.deliveryFee,
//         total: order.total,
//         paymentMethod: order.paymentMethod,
//         paymentStatus: order.paymentStatus,
//         status: order.status,
//         statusMessage: order.statusMessage,
//         rejectionReason: order.rejectionReason,
//         createdAt: order.createdAt,
//         updatedAt: order.updatedAt,
//       })),
//     });
//   } catch (error) {
//     console.error("Fetch my orders error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Unable to fetch your orders.",
//     });
//   }
// };

// // GET /api/orders/admin/all
// // Get all orders (admin only)
// const getAllOrders = async (req, res) => {
//   try {
//   const orders = await Order.find({})
//   .sort({ createdAt: -1, _id: -1 })
//   .lean();

//     return res.status(200).json({
//       success: true,
//       count: orders.length,
//       orders: orders.map((order) => ({
//         id: order._id.toString(),
//         user: order.user,
//         customer: order.customer,
//         items: order.items,
//         subtotal: order.subtotal,
//         deliveryFee: order.deliveryFee,
//         total: order.total,
//         paymentMethod: order.paymentMethod,
//         paymentStatus: order.paymentStatus,
//         status: order.status,
//         statusMessage: order.statusMessage,
//         rejectionReason: order.rejectionReason,
//         createdAt: order.createdAt,
//         updatedAt: order.updatedAt,
//       })),
//     });
//   } catch (error) {
//     console.error("Fetch all orders error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Unable to fetch customer orders.",
//     });
//   }
// };

// // PATCH /api/orders/:id/status
// // Update order status (admin only)
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, rejectionReason } = req.body;

//     const allowedStatuses = [
//       "Confirmed",
//       "Rejected",
//       "Preparing",
//       "Out for Delivery",
//       "Delivered",
//       "Cancelled",
//     ];

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID.",
//       });
//     }

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order status.",
//       });
//     }

//     if (
//       status === "Rejected" &&
//       (typeof rejectionReason !== "string" ||
//         !rejectionReason.trim())
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a reason for rejecting the order.",
//       });
//     }

//     const statusMessages = {
//       Pending:
//         "Your order has been received and is waiting for confirmation.",
//       Confirmed:
//         "Good news! Your order has been confirmed by The Healthy Diet.",
//       Rejected:
//         "We're sorry. Your order has been rejected. Please check the reason below.",
//       Preparing:
//         "Your order is being prepared.",
//       "Out for Delivery":
//         "Your order is out for delivery.",
//       Delivered:
//         "Your order has been delivered. Enjoy your healthy meal!",
//       Cancelled:
//         "Your order has been cancelled.",
//     };

//     const updateFields = {
//       status,
//       statusMessage: statusMessages[status],
//       rejectionReason:
//         status === "Rejected" ? rejectionReason.trim() : "",
//     };

//     const order = await Order.findByIdAndUpdate(
//       id,
//       { $set: updateFields },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Order status updated successfully.",
//       order: {
//         id: order._id.toString(),
//         status: order.status,
//         statusMessage: order.statusMessage,
//         rejectionReason: order.rejectionReason,
//         updatedAt: order.updatedAt,
//       },
//     });
//   } catch (error) {
//     console.error("Update order status error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Unable to update order status.",
//     });
//   }
// };

// module.exports = {
//   createOrder,
//   getMyOrders,
//   getAllOrders,
//   updateOrderStatus,
// };


const Notification = require("../models/notification.model");
const mongoose = require("mongoose");
const Order = require("../models/order.model");

// ============================================================
// POST /api/orders
// Place a new order (login required)
// ============================================================
const createOrder = async (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body;

    // Validate customer details
    if (
      !customer ||
      !customer.name ||
      !customer.phone ||
      !customer.email ||
      !customer.address ||
      !customer.city ||
      !customer.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all delivery details.",
      });
    }

    // Validate cart
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    // Validate payment method
    if (!["cod", "upi", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    // Prepare order items
    const orderItems = items.map((item) => ({
      productId: String(item.id || item.productId || ""),
      name: String(item.name || ""),
      image: String(item.image || ""),
      price: Number(item.price),
      quantity: Number(item.quantity),
      calories: Number(item.calories || 0),
    }));

    // Validate order items
    const invalidItem = orderItems.some(
      (item) =>
        !item.name.trim() ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
    );

    if (invalidItem) {
      return res.status(400).json({
        success: false,
        message: "One or more cart items are invalid.",
      });
    }

    // Calculate prices
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryFee = subtotal >= 499 ? 0 : 40;
    const total = subtotal + deliveryFee;

    // ========================================================
    // CREATE ORDER
    // ========================================================
    const order = await Order.create({
      user: req.user.userId,

      customer: {
        name: String(customer.name).trim(),
        phone: String(customer.phone).trim(),
        email: String(customer.email).trim().toLowerCase(),
        address: String(customer.address).trim(),
        city: String(customer.city).trim(),
        pincode: String(customer.pincode).trim(),
      },

      items: orderItems,

      subtotal,
      deliveryFee,
      total,

      paymentMethod,
      paymentStatus: "pending",

      status: "Pending",

      statusMessage:
        "Your order has been received and is waiting for confirmation.",

      rejectionReason: "",
    });

    // ========================================================
    // CREATE ADMIN NOTIFICATION
    // ========================================================
    await Notification.create({
      recipientRole: "admin",
      recipient: null,

      title: "New Order Received",

      message: `${order.customer.name} placed a new order worth ₹${order.total}.`,

      type: "new_order",

      orderId: order._id,
    });

    // ========================================================
    // SEND RESPONSE
    // ========================================================
    return res.status(201).json({
      success: true,

      message:
        "Order placed successfully! Waiting for admin confirmation.",

      order: {
        id: order._id,
        customer: order.customer,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status,
        statusMessage: order.statusMessage,
        rejectionReason: order.rejectionReason,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to place your order.",
    });
  }
};

// ============================================================
// GET /api/orders/my-orders
// Get orders belonging to logged-in customer
// ============================================================
const getMyOrders = async (req, res) => {
  try {
    // Prevent browsers from using stale order data
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    const orders = await Order.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,

      orders: orders.map((order) => ({
        id: order._id.toString(),
        customer: order.customer,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status,
        statusMessage: order.statusMessage,
        rejectionReason: order.rejectionReason,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Fetch my orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your orders.",
    });
  }
};

// ============================================================
// GET /api/orders/admin/all
// Get all orders (admin only)
// ============================================================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1, _id: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: orders.length,

      orders: orders.map((order) => ({
        id: order._id.toString(),
        user: order.user,
        customer: order.customer,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status,
        statusMessage: order.statusMessage,
        rejectionReason: order.rejectionReason,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Fetch all orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch customer orders.",
    });
  }
};

// ============================================================
// PATCH /api/orders/:id/status
// Update order status (admin only)
// ============================================================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    // Allowed statuses
    const allowedStatuses = [
      "Confirmed",
      "Rejected",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    // Validate status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    // Rejection reason required
    if (
      status === "Rejected" &&
      (typeof rejectionReason !== "string" ||
        !rejectionReason.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a reason for rejecting the order.",
      });
    }

    // ========================================================
    // GET EXISTING ORDER
    // ========================================================
    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // ========================================================
    // PREVENT DUPLICATE STATUS NOTIFICATION
    // ========================================================
    if (existingOrder.status === status) {
      return res.status(200).json({
        success: true,

        message: "Order status is already set to this status.",

        order: {
          id: existingOrder._id.toString(),
          status: existingOrder.status,
          statusMessage: existingOrder.statusMessage,
          rejectionReason: existingOrder.rejectionReason,
          updatedAt: existingOrder.updatedAt,
        },
      });
    }

    // ========================================================
    // STATUS MESSAGES
    // ========================================================
    const statusMessages = {
      Pending:
        "Your order has been received and is waiting for confirmation.",

      Confirmed:
        "Good news! Your order has been confirmed by The Healthy Diet.",

      Rejected:
        "We're sorry. Your order has been rejected. Please check the reason below.",

      Preparing:
        "Your order is being prepared.",

      "Out for Delivery":
        "Your order is out for delivery.",

      Delivered:
        "Your order has been delivered. Enjoy your healthy meal!",

      Cancelled:
        "Your order has been cancelled.",
    };

    // ========================================================
    // UPDATE ORDER
    // ========================================================
    const updateFields = {
      status,

      statusMessage: statusMessages[status],

      rejectionReason:
        status === "Rejected"
          ? rejectionReason.trim()
          : "",
    };

    const order = await Order.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // ========================================================
    // CUSTOMER NOTIFICATION MESSAGES
    // ========================================================
    const notificationMessages = {
      Confirmed: {
        title: "Order Confirmed",

        message:
          "Good news! Your order has been confirmed by The Healthy Diet.",
      },

      Rejected: {
        title: "Order Rejected",

        message: rejectionReason
          ? `We're sorry. Your order has been rejected. Reason: ${rejectionReason.trim()}`
          : "We're sorry. Your order has been rejected.",
      },

      Preparing: {
        title: "Order Being Prepared",

        message: "Your order is being prepared.",
      },

      "Out for Delivery": {
        title: "Order Out for Delivery",

        message: "Your order is out for delivery.",
      },

      Delivered: {
        title: "Order Delivered",

        message:
          "Your order has been delivered. Enjoy your healthy meal!",
      },

      Cancelled: {
        title: "Order Cancelled",

        message: "Your order has been cancelled.",
      },
    };

    const notification = notificationMessages[status];

    // ========================================================
    // CREATE CUSTOMER NOTIFICATION
    // ========================================================
    if (notification) {
      await Notification.create({
        recipient: existingOrder.user,

        recipientRole: "user",

        title: notification.title,

        message: notification.message,

        type: "order_status",

        orderId: order._id,
      });
    }

    // ========================================================
    // SEND RESPONSE
    // ========================================================
    return res.status(200).json({
      success: true,

      message: "Order status updated successfully.",

      order: {
        id: order._id.toString(),
        status: order.status,
        statusMessage: order.statusMessage,
        rejectionReason: order.rejectionReason,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update order status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update order status.",
    });
  }
};

// ============================================================
// EXPORT CONTROLLERS
// ============================================================
module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};