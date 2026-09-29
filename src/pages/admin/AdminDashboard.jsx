
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Clock3,
  PackageCheck,
  IndianRupee,
  RefreshCw,
} from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

function AdminDashboard() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        err.response?.data?.message ||
          "Unable to load dashboard orders."
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
    ["Confirmed", "Preparing", "Out for Delivery"].includes(
      order.status
    )
  ).length;

  const delivered = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const paidRevenue = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

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

  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
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

  const maxOrders = Math.max(
    1,
    ...lastSevenDays.map((day) => day.count)
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6B9F45]">
            OVERVIEW
          </p>
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
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#E5E9DD] bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#66736B]">
                    {label}
                  </p>
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
                      height: `${Math.max(
                        6,
                        (day.count / maxOrders) * 72
                      )}%`,
                    }}
                  />

                  <span className="text-xs text-[#66736B]">
                    {day.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#E5E9DD] bg-white shadow-sm">
            <div className="border-b border-[#E5E9DD] p-5">
              <h2 className="text-lg font-bold text-[#183126]">
                Recent Orders
              </h2>
            </div>

            {orders.length === 0 ? (
              <p className="p-8 text-center text-sm text-[#66736B]">
                No orders found yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F7F8F2] text-[#66736B]">
                    <tr>
                      <th className="px-5 py-4">Order</th>
                      <th className="px-5 py-4">Customer</th>
                      <th className="px-5 py-4">Amount</th>
                      <th className="px-5 py-4">Payment</th>
                      <th className="px-5 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr
                        key={order.id}
                        className="border-t border-[#E5E9DD]"
                      >
                        <td className="px-5 py-4 font-semibold text-[#183126]">
                          #{order.id.slice(-6).toUpperCase()}
                        </td>
                        <td className="px-5 py-4 text-[#66736B]">
                          {order.customer?.name || "Customer"}
                        </td>
                        <td className="px-5 py-4 font-semibold text-[#183126]">
                          {money(order.total)}
                        </td>
                        <td className="px-5 py-4 capitalize text-[#66736B]">
                          {order.paymentStatus || "pending"}
                        </td>
                        <td className="px-5 py-4 text-[#66736B]">
                          {order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;