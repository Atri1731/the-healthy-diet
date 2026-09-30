import {useEffect, useState} from "react";
import {
  ShoppingBag,
  Clock3,
  PackageCheck,
  IndianRupee,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Search,
  UserRound,
} from "lucide-react";
import api from "../../services/api";
import {useAuth} from "../../context/AuthContext";

const getIndiaDateKey = (value) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);

  const values = Object.fromEntries(parts.map(({type, value}) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

function AdminDashboard() {
  const {token} = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedCustomers, setExpandedCustomers] = useState({});
  const [orderSearch, setOrderSearch] = useState("");

  const fetchOrders = async () => {
    if (!token) {
      setError("Please log in as an administrator.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get("/orders/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load dashboard orders.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const totalOrders = orders.length;

  const inProgress = orders.filter((order) =>
    ["Confirmed", "Preparing", "Out for Delivery"].includes(order.status),
  ).length;

  const delivered = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const paidRevenue = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  // Filter only the Customer Orders section to orders placed today in India (IST).
  const todayKey = getIndiaDateKey(new Date());
  const todayOrders = orders.filter((order) => {
    if (!order.createdAt) return false;
    const createdAt = new Date(order.createdAt);
    return (
      !Number.isNaN(createdAt.getTime()) &&
      getIndiaDateKey(createdAt) === todayKey
    );
  });

  const customerGroups = Object.values(
    todayOrders.reduce((groups, order) => {
      const email = (order.customer?.email || "unknown@example.com")
        .trim()
        .toLowerCase();

      if (!groups[email]) {
        groups[email] = {
          email,
          name: order.customer?.name || "Customer",
          phone: order.customer?.phone || "",
          orders: [],
          totalSpent: 0,
        };
      }

      groups[email].orders.push(order);
      groups[email].totalSpent += Number(order.total || 0);

      return groups;
    }, {}),
  ).sort((a, b) => b.orders.length - a.orders.length);

  const filteredCustomerGroups = customerGroups.filter((customer) => {
    const query = orderSearch.toLowerCase().trim();

    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.toLowerCase().includes(query) ||
      customer.orders.some((order) => order.id.toLowerCase().includes(query))
    );
  });

  const toggleCustomer = (email) => {
    setExpandedCustomers((previous) => ({
      ...previous,
      [email]: !previous[email],
    }));
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.patch(
        `/orders/${orderId}/status`,
        {status},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update order status.");
    }
  };

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock3,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Delivered",
      value: delivered,
      icon: PackageCheck,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Paid Revenue",
      value: money(paidRevenue),
      icon: IndianRupee,
      color: "bg-purple-50 text-purple-700",
    },
  ];

  const lastSevenDays = Array.from({length: 7}, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));

    const dayOrders = orders.filter((order) => {
      const created = new Date(order.createdAt);
      return created.toDateString() === date.toDateString();
    });

    return {
      label: date.toLocaleDateString("en-IN", {
        weekday: "short",
      }),
      count: dayOrders.length,
    };
  });

  const maxOrders = Math.max(1, ...lastSevenDays.map((day) => day.count));

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6B9F45]">OVERVIEW</p>
          <h1 className="mt-1 text-3xl font-bold text-[#183126]">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-[#66736B]">
            Monitor your healthy food orders and revenue.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-[#174D32] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D3522] disabled:opacity-60"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </header>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center text-[#66736B]">
          Loading dashboard...
        </div>
      ) : (
        <>
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({label, value, icon: Icon, color}) => (
              <div
                key={label}
                className="rounded-2xl border border-[#E5E9DD] bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#66736B]">{label}</p>
                  <div className={`rounded-xl p-3 ${color}`}>
                    <Icon size={21} />
                  </div>
                </div>

                <p className="mt-5 break-words text-2xl font-bold text-[#183126]">
                  {value}
                </p>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-[#E5E9DD] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#183126]">
              Orders — Last 7 Days
            </h2>
            <p className="mt-1 text-sm text-[#66736B]">
              Number of orders created each day.
            </p>

            <div className="mt-8 flex h-52 items-end justify-around gap-3 border-b border-[#E5E9DD] pb-2">
              {lastSevenDays.map((day) => (
                <div
                  key={day.label}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-semibold text-[#183126]">
                    {day.count}
                  </span>

                  <div
                    title={`${day.count} orders`}
                    className="w-full max-w-12 rounded-t-lg bg-[#6B9F45] transition-all"
                    style={{
                      height: `${Math.max(6, (day.count / maxOrders) * 72)}%`,
                    }}
                  />

                  <span className="text-xs text-[#66736B]">{day.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#E5E9DD] bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E9DD] p-5">
              <div>
                <h2 className="text-lg font-bold text-[#183126]">
                  Customer Orders
                </h2>
                <p className="mt-1 text-sm text-[#66736B]">
                  Expand a customer to view their complete order history.
                </p>
                <p  className="mt-1 text-sm text-[#66736B]">Today's orders</p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66736B]"
                />
                <input
                  value={orderSearch}
                  onChange={(event) => setOrderSearch(event.target.value)}
                  placeholder="Search customer or order..."
                  className="w-full rounded-xl border border-[#E5E9DD] py-3 pl-10 pr-3 text-sm outline-none focus:border-[#6B9F45]"
                />
              </div>
            </div>

            {filteredCustomerGroups.length === 0 ? (
              <p className="p-8 text-center text-sm text-[#66736B]">
                {todayOrders.length === 0
                  ? "No orders placed today."
                  : "No matching customers or orders found."}
              </p>
            ) : (
              <div className="divide-y divide-[#E5E9DD]">
                {filteredCustomerGroups.map((customer) => {
                  const isExpanded = Boolean(expandedCustomers[customer.email]);

                  return (
                    <div key={customer.email}>
                      <button
                        type="button"
                        onClick={() => toggleCustomer(customer.email)}
                        aria-expanded={isExpanded}
                        className="flex w-full flex-wrap items-center gap-3 p-4 text-left transition hover:bg-[#F7F8F2] sm:p-5"
                      >
                        <span className="text-[#174D32]">
                          {isExpanded ? (
                            <ChevronDown size={20} />
                          ) : (
                            <ChevronRight size={20} />
                          )}
                        </span>

                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF2E3] text-[#174D32]">
                          <UserRound size={21} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-[#183126]">
                            {customer.name}
                          </span>
                          <span className="block break-all text-xs text-[#66736B]">
                            {customer.email}
                          </span>
                          {customer.phone && (
                            <span className="mt-1 block text-xs text-[#66736B]">
                              {customer.phone}
                            </span>
                          )}
                        </span>

                        <span className="text-right">
                          <span className="block font-bold text-[#183126]">
                            {customer.orders.length}{" "}
                            {customer.orders.length === 1 ? "order" : "orders"}
                          </span>
                          <span className="mt-1 block text-sm font-semibold text-[#6B9F45]">
                            {money(customer.totalSpent)}
                          </span>
                          <span className="block text-xs text-[#66736B]">
                            Order total
                          </span>
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="space-y-4 bg-[#F7F8F2] p-4 sm:p-5">
                          {customer.orders.map((order) => (
                            <div
                              key={order.id}
                              className="rounded-xl border border-[#E5E9DD] bg-white p-4"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="font-bold text-[#183126]">
                                    Order #{order.id.slice(-6).toUpperCase()}
                                  </p>
                                  <p className="mt-1 text-xs text-[#66736B]">
                                    {new Date(order.createdAt).toLocaleString(
                                      "en-IN",
                                      {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                      },
                                    )}
                                  </p>
                                </div>

                                <span className="font-bold text-[#174D32]">
                                  {money(order.total)}
                                </span>
                              </div>

                              <div className="mt-4 space-y-3">
                                {(order.items || []).map((item, index) => (
                                  <div
                                    key={`${order.id}-${index}`}
                                    className="flex items-center gap-3"
                                  >
                                    {item.image ? (
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-12 w-12 rounded-lg object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAF2E3] text-[#174D32]">
                                        <ShoppingBag size={19} />
                                      </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                      <p className="text-sm font-semibold text-[#183126]">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-[#66736B]">
                                        Qty: {item.quantity} ×{" "}
                                        {money(item.price)}
                                      </p>
                                    </div>

                                    <span className="text-sm font-semibold text-[#183126]">
                                      {money(item.price * item.quantity)}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 grid gap-2 border-t border-[#E5E9DD] pt-3 text-sm sm:grid-cols-2">
                                <p className="text-[#66736B]">
                                  Subtotal:{" "}
                                  <span className="font-semibold text-[#183126]">
                                    {money(order.subtotal)}
                                  </span>
                                </p>
                                <p className="text-[#66736B]">
                                  Delivery:{" "}
                                  <span className="font-semibold text-[#183126]">
                                    {money(order.deliveryFee)}
                                  </span>
                                </p>
                                <p className="text-[#66736B]">
                                  Payment:{" "}
                                  <span className="font-semibold capitalize text-[#183126]">
                                    {order.paymentMethod}
                                  </span>
                                </p>
                                <p className="text-[#66736B]">
                                  Payment status:{" "}
                                  <span className="font-semibold capitalize text-[#183126]">
                                    {order.paymentStatus || "pending"}
                                  </span>
                                </p>
                              </div>

                              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-[#183126]">
                                  Order status
                                </span>

                                <select
                                  value={order.status}
                                  onChange={(event) =>
                                    updateStatus(order.id, event.target.value)
                                  }
                                  className="w-full rounded-lg border border-[#E5E9DD] bg-white px-3 py-2 text-sm outline-none focus:border-[#6B9F45] sm:w-auto"
                                  aria-label={`Update order ${order.id} status`}
                                >
                                  {[
                                    "Confirmed",
                                    "Preparing",
                                    "Out for Delivery",
                                    "Delivered",
                                    "Cancelled",
                                  ].map((status) => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
