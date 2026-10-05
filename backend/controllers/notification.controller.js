const Notification = require("../models/notification.model");

// Get notifications for logged-in user/admin
const getNotifications = async (req, res) => {
  try {
    let query;

    if (req.user.role === "admin") {
      query = {
        recipientRole: "admin",
      };
    } else {
      query = {
        recipientRole: "user",
        recipient: req.user.userId,
      };
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const unreadCount = await Notification.countDocuments({
      ...query,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load notifications",
    });
  }
};

// Mark one notification as read
const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    let query = {
      _id: id,
    };

    if (req.user.role === "admin") {
      query.recipientRole = "admin";
    } else {
      query.recipientRole = "user";
      query.recipient = req.user.userId;
    }

    const notification = await Notification.findOneAndUpdate(
      query,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Mark notification read error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update notification",
    });
  }
};

// Mark all notifications as read
const markAllNotificationsRead = async (req, res) => {
  try {
    let query;

    if (req.user.role === "admin") {
      query = {
        recipientRole: "admin",
      };
    } else {
      query = {
        recipientRole: "user",
        recipient: req.user.userId,
      };
    }

    await Notification.updateMany(
      {
        ...query,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark all notifications read error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update notifications",
    });
  }
};

module.exports = {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
};