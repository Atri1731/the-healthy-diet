import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Package,
  X,
  ChefHat,
  Truck,
  CircleCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function getNotificationIcon(notification) {
  if (notification.type === "new_order") {
    return Package;
  }

  if (notification.title?.includes("Rejected")) {
    return X;
  }

  if (notification.title?.includes("Preparing")) {
    return ChefHat;
  }

  if (notification.title?.includes("Delivery")) {
    return Truck;
  }

  if (notification.title?.includes("Delivered")) {
    return CircleCheck;
  }

  return Bell;
}

export default function NotificationBell() {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  const fetchNotifications = async () => {
    if (!token || !isAuthenticated) return;

    try {
      const response = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(response.data.notifications || []);
      setUnreadCount(response.data.unreadCount || 0);
    } catch (error) {
      console.error(
        "Notification fetch error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    fetchNotifications();

    const intervalId = window.setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [token, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAsRead = async (notification) => {
    try {
      await api.patch(
        `/notifications/${notification._id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((current) =>
        current.map((item) =>
          item._id === notification._id
            ? { ...item, isRead: true }
            : item
        )
      );

      setUnreadCount((current) => Math.max(0, current - 1));
    } catch (error) {
      console.error("Mark notification read error:", error);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification);
    }

    setOpen(false);

    if (notification.type === "new_order") {
      navigate("/admin/orders");
    } else if (notification.type === "order_status") {
      navigate("/orders");
    }
  };

  const markAllRead = async () => {
    try {
      await api.patch(
        "/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          isRead: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Mark all notifications read error:", error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#174D32] transition hover:bg-[#EAF2E3]"
        aria-label="Notifications"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-[340px] overflow-hidden rounded-2xl border border-[#E5E1D5] bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-[#E5E1D5] px-4 py-3">
            <div>
              <h3 className="font-bold text-[#183126]">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <p className="text-xs text-[#66736B]">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs font-semibold text-[#56863B] hover:text-[#174D32]"
              >
                <CheckCheck size={14} />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <Bell
                  size={28}
                  className="mx-auto text-[#A3AEA7]"
                />

                <p className="mt-3 text-sm font-semibold text-[#183126]">
                  No notifications
                </p>

                <p className="mt-1 text-xs text-[#66736B]">
                  You're all caught up.
                </p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = getNotificationIcon(notification);

                return (
                  <button
                    key={notification._id}
                    type="button"
                    onClick={() =>
                      handleNotificationClick(notification)
                    }
                    className={`flex w-full gap-3 border-b border-[#F0EDE4] px-4 py-4 text-left transition hover:bg-[#FCFAF4] ${
                      !notification.isRead
                        ? "bg-[#F4F8EF]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7EFDC] text-[#56863B]">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-[#183126]">
                          {notification.title}
                        </p>

                        {!notification.isRead && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6B9F45]" />
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-[#66736B]">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-[10px] text-[#9AA59E]">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}