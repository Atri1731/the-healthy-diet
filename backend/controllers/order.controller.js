
const Order = require("../models/order.model");

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body;

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

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    if (!["cod", "upi", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    const orderItems = items.map((item) => ({
      productId: String(item.id || item.productId || ""),
      name: String(item.name || ""),
      image: String(item.image || ""),
      price: Number(item.price),
      quantity: Number(item.quantity),
      calories: Number(item.calories || 0),
    }));

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

    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Match the checkout page's delivery calculation.
    const deliveryFee = subtotal >= 499 ? 0 : 40;
    const total = subtotal + deliveryFee;

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
      status: "Confirmed",
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
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

// GET /api/orders/my-orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders.map((order) => ({
        id: order._id,
        customer: order.customer,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status,
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    console.error("Fetch orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your orders.",
    });
  }
};

// GET /api/orders/admin/all
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

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
        createdAt: order.createdAt,
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

// PATCH /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const Order = require("../models/order.model");

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order: {
        id: order._id,
        status: order.status,
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

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};