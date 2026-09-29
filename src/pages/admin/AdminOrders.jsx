
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  
  RefreshCw,
  Search,
  ShoppingBag,
  Package,
  Clock,
  IndianRupee,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle2,
  Leaf,
} from "lucide-react";
import api from "../../services/api";

const ORDER_STATUSES = [
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const statusStyles = {
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  Preparing: "bg-amber-50 text-amber-700 border-amber-200",
  "Out for Delivery": "bg-purple-50 text-purple-700 border-purple-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

function formatDate(date) {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatMoney(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [notice, setNotice] = useState("");

 const fetchOrders = useCallback(async () => {
  console.log("1. fetchOrders started");
  console.log("2. API base URL:", api.defaults.baseURL);

  const token = localStorage.getItem("healthyDietToken");
  console.log("3. Admin token exists:", Boolean(token));

  try {
    setLoading(true);
    setError("");

    console.log("4. Sending request to admin orders API");

    const response = await api.get("/orders/admin/all", {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    });

    console.log("5. API response:", response.status);
    console.log("6. Orders received:", response.data.orders);

    setOrders(response.data.orders || []);
  } catch (err) {
    console.error("Admin orders error:", err.response?.status, err.message);
    console.error("Server response:", err.response?.data);

    setError(
      err.response?.data?.message ||
        `Request failed: ${err.message}`
    );
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const customer = order.customer || {};

      const matchesSearch =
        !query ||
        String(order.id || "").toLowerCase().includes(query) ||
        String(customer.name || "").toLowerCase().includes(query) ||
        String(customer.email || "").toLowerCase().includes(query) ||
        String(customer.phone || "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const stats = useMemo(() => {
    const activeOrders = orders.filter(
      (order) => order.status !== "Cancelled"
    );

    return {
      total: orders.length,
      active: orders.filter(
        (order) =>
          order.status !== "Delivered" &&
          order.status !== "Cancelled"
      ).length,
      delivered: orders.filter(
        (order) => order.status === "Delivered"
      ).length,
      revenue: orders
        .filter(
          (order) =>
            order.paymentStatus === "paid" &&
            order.status !== "Cancelled"
        )
        .reduce((sum, order) => sum + Number(order.total || 0), 0),
      activeTotal: activeOrders.length,
    };
  }, [orders]);

  const handleStatusChange = async (order, newStatus) => {
    if (newStatus === order.status) return;

    const previousStatus = order.status;
    setUpdatingId(order.id);
    setError("");
    setNotice("");

    try {
      const token = localStorage.getItem("healthyDietToken");

      await api.patch(
        `/orders/${order.id}/status`,
        { status: newStatus },
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        }
      );

      setOrders((current) =>
        current.map((item) =>
          item.id === order.id
            ? { ...item, status: newStatus }
            : item
        )
      );

      setNotice(
        `Order #${order.id.slice(-6)} updated to ${newStatus}.`
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Could not update order from ${previousStatus}.`
      );
    } finally {
      setUpdatingId(null);
    }
  };

 return (
  <div className="text-[#183126]">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#6B9F45]">
              ADMIN WORKSPACE / ORDERS
            </p>
            <h2 className="font-serif text-3xl font-bold">
              Customer Orders
            </h2>
            <p className="mt-2 text-sm text-[#66736B]">
              Review purchases and manage delivery progress.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E1D5] bg-white px-4 py-3 font-semibold transition hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh orders
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Something went wrong</p>
              <p className="mt-1">{error}</p>
              <button
                type="button"
                onClick={fetchOrders}
                className="mt-2 font-semibold underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            <CheckCircle2 size={19} />
            {notice}
          </div>
        )}

        {/* Summary cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Orders",
              value: stats.total,
              icon: ShoppingBag,
              color: "bg-blue-50 text-blue-700",
            },
            {
              title: "In Progress",
              value: stats.active,
              icon: Clock,
              color: "bg-amber-50 text-amber-700",
            },
            {
              title: "Delivered",
              value: stats.delivered,
              icon: CheckCircle2,
              color: "bg-green-50 text-green-700",
            },
            {
              title: "Paid Revenue",
              value: formatMoney(stats.revenue),
              icon: IndianRupee,
              color: "bg-purple-50 text-purple-700",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-[#EAE5D9] bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#66736B]">
                    {stat.title}
                  </p>
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={21} />
                  </div>
                </div>
                <p className="mt-4 break-words text-3xl font-bold">
                  {loading ? "—" : stat.value}
                </p>
              </article>
            );
          })}
        </section>

        {/* Search and filter */}
        <section className="mb-6 rounded-2xl border border-[#EAE5D9] bg-white p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_240px]">
            <div>
              <label
                htmlFor="order-search"
                className="mb-2 block text-sm font-semibold"
              >
                Search orders
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#6B9F45]">
                <Search size={19} className="shrink-0 text-gray-400" />
                <input
                  id="order-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Order ID, customer, email or phone..."
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="status-filter"
                className="mb-2 block text-sm font-semibold"
              >
                Filter by status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:border-[#6B9F45]"
              >
                <option value="All">All statuses</option>
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#66736B]">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </section>

        {/* Order list */}
        <section>
          {loading ? (
            <div className="rounded-2xl border border-[#EAE5D9] bg-white p-12 text-center">
              <RefreshCw
                size={30}
                className="mx-auto mb-3 animate-spin text-[#174D32]"
              />
              <p className="font-semibold">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-[#EAE5D9] bg-white p-10 text-center">
              <Package
                size={42}
                className="mx-auto mb-3 text-gray-300"
              />
              <h3 className="text-lg font-bold">No orders found</h3>
              <p className="mt-2 text-sm text-[#66736B]">
                Try another search or status filter.
              </p>
              {(search || statusFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                  }}
                  className="mt-4 font-semibold text-[#174D32] underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {filteredOrders.map((order) => {
                const customer = order.customer || {};

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#66736B]">
                          Order ID
                        </p>
                        <h3 className="mt-1 break-all font-bold">
                          #{order.id}
                        </h3>
                        <p className="mt-2 text-sm text-[#66736B]">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${
                            statusStyles[order.status] ||
                            "border-gray-200 bg-gray-50 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>

                        <label
                          htmlFor={`status-${order.id}`}
                          className="text-xs font-semibold text-[#66736B]"
                        >
                          Update order status
                        </label>
                        <select
                          id={`status-${order.id}`}
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(event) =>
                            handleStatusChange(order, event.target.value)
                          }
                          className="max-w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-[#6B9F45] disabled:opacity-60"
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>

                        {updatingId === order.id && (
                          <span className="text-xs text-gray-500">
                            Updating...
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[1fr_0.8fr]">
                      {/* Customer information */}
                      <div>
                        <h4 className="mb-3 font-bold">
                          Customer details
                        </h4>

                        <p className="font-semibold">
                          {customer.name || "Name unavailable"}
                        </p>
                        <p className="mt-1 break-all text-sm text-[#66736B]">
                          {customer.email || "Email unavailable"}
                        </p>

                        <div className="mt-3 space-y-2 text-sm text-[#66736B]">
                          <p className="flex items-start gap-2">
                            <Phone size={16} className="mt-0.5 shrink-0" />
                            {customer.phone || "Phone unavailable"}
                          </p>
                          <p className="flex items-start gap-2">
                            <MapPin size={16} className="mt-0.5 shrink-0" />
                            <span>
                              {[
                                customer.address,
                                customer.city,
                                customer.pincode,
                              ]
                                .filter(Boolean)
                                .join(", ") || "Address unavailable"}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Items and payment */}
                      <div>
                        <h4 className="mb-3 font-bold">
                          Ordered items
                        </h4>

                        <div className="space-y-3">
                          {(order.items || []).map((item, index) => (
                            <div
                              key={`${item.productId || item.name}-${index}`}
                              className="flex items-center gap-3"
                            >
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E7EFDC]">
                                  <Leaf
                                    size={21}
                                    className="text-[#174D32]"
                                  />
                                </div>
                              )}

                              <div className="min-w-0 flex-1">
                                <p className="break-words text-sm font-semibold">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-xs text-[#66736B]">
                                  Qty: {item.quantity}
                                </p>
                              </div>

                              <p className="shrink-0 text-sm font-semibold">
                                {formatMoney(
                                  Number(item.price || 0) *
                                    Number(item.quantity || 0)
                                )}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
                          <div className="flex justify-between gap-3 text-[#66736B]">
                            <span>Subtotal</span>
                            <span>{formatMoney(order.subtotal)}</span>
                          </div>
                          <div className="flex justify-between gap-3 text-[#66736B]">
                            <span>Delivery fee</span>
                            <span>{formatMoney(order.deliveryFee)}</span>
                          </div>
                          <div className="flex justify-between gap-3 pt-1 text-base font-bold">
                            <span>Total</span>
                            <span>{formatMoney(order.total)}</span>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                            <span className="text-[#66736B]">
                              Payment:{" "}
                              {String(order.paymentMethod || "unknown").toUpperCase()}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                order.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {order.paymentStatus || "pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="py-8 text-center text-xs text-[#879087]">
          The Healthy Diet · Admin Order Management
        </footer>
  </div>
  );
}