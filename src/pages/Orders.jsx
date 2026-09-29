import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import api from "../services/api";
import {useAuth} from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Orders() {
  const {token} = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openOrder, setOpenOrder] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!cancelled) {
          setOrders(response.data.orders || []);
        }
      } catch (err) {
        console.error("Fetch orders error:", err.response?.data || err.message);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load your orders. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setError("Please log in to view your orders.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [token]);

  const toggleOrder = (id) => {
    setOpenOrder((current) => (current === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#FCFAF4]">
      <Navbar />

      <main className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mx-auto w-full max-w-5xl">
          {/* Header */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B9F45]">
              My Orders
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-bold text-[#183126] sm:text-4xl">
                  Your Order History
                </h1>

                <p className="mt-2 text-sm text-[#66736B]">
                  View your previous healthy food orders.
                </p>
              </div>

              {orders.length > 0 && (
                <span className="w-fit rounded-full bg-[#E7EFDC] px-4 py-2 text-xs font-bold text-[#174D32]">
                  {orders.length} Order
                  {orders.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
          {loading && (
            <div className="mt-10 rounded-2xl bg-white p-10 text-center text-[#66736B]">
              Loading your orders...
            </div>
          )}

          {!loading && error && (
            <div
              role="alert"
              className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-700"
            >
              {error}
            </div>
          )}

          {/* Empty Orders */}
         {!loading && !error && orders.length === 0 ? (
            <div className="mt-10 rounded-[28px] border border-[#E5E1D5] bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EFDC]">
                <ShoppingBag size={28} className="text-[#174D32]" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#183126]">
                No orders yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#66736B]">
                You haven't placed any orders yet. Explore our healthy menu and
                make your first order.
              </p>

              <Link
                to="/menu"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#174D32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D3522]"
              >
                Explore Menu
                <ArrowRight size={16} />
              </Link>
            </div>
         ) : !loading && !error && orders.length > 0 ? (
            <div className="mt-8 space-y-5">
              {orders.map((order) => {
                const isOpen = openOrder === order.id;

                const orderDate = new Date(order.createdAt);

                const totalItems = order.items.reduce(
                  (total, item) => total + item.quantity,
                  0,
                );

                return (
                  <div
                    key={order.id}
                    className="overflow-hidden rounded-[24px] border border-[#E5E1D5] bg-white shadow-sm"
                  >
                    {/* Order Header */}
                    <button
                      type="button"
                      onClick={() => toggleOrder(order.id)}
                      className="w-full p-5 text-left transition hover:bg-[#FCFAF4] sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E7EFDC]">
                            <PackageCheck
                              size={20}
                              className="text-[#174D32]"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-sm font-bold text-[#183126] sm:text-base">
                                Order #{order.id}
                              </h2>

                              <span className="rounded-full bg-[#E7EFDC] px-2.5 py-1 text-[10px] font-bold text-[#174D32]">
                                {order.status}
                              </span>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#66736B]">
                              <span className="flex items-center gap-1">
                                <CalendarDays size={13} />
                                {orderDate.toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>

                              <span>
                                {totalItems} item
                                {totalItems > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <p className="text-base font-bold text-[#174D32] sm:text-lg">
                            ₹{order.total}
                          </p>

                          {isOpen ? (
                            <ChevronUp size={18} className="text-[#66736B]" />
                          ) : (
                            <ChevronDown size={18} className="text-[#66736B]" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Order Details */}
                    {isOpen && (
                      <div className="border-t border-[#E5E1D5] bg-[#FCFAF4] p-5 sm:p-6">
                        {/* Items */}
                        <div>
                          <h3 className="text-sm font-bold text-[#183126]">
                            Items
                          </h3>

                          <div className="mt-4 space-y-3">
                            {order.items.map((item) => (
                              <div
                               key={item.productId || item.id || item.name}
                                className="flex items-center gap-3 rounded-2xl bg-white p-3"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-semibold text-[#183126]">
                                    {item.name}
                                  </p>

                                  <p className="mt-1 text-xs text-[#66736B]">
                                    ₹{item.price} × {item.quantity}
                                  </p>
                                </div>

                                <p className="text-sm font-bold text-[#174D32]">
                                  ₹{item.price * item.quantity}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Information */}
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl bg-white p-4">
                            <p className="text-xs text-[#66736B]">
                              Delivery Address
                            </p>

                            <p className="mt-2 text-sm font-semibold leading-5 text-[#183126]">
                              {order.customer.address}, {order.customer.city} -{" "}
                              {order.customer.pincode}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white p-4">
                            <p className="text-xs text-[#66736B]">Payment</p>

                            <p className="mt-2 text-sm font-semibold text-[#183126]">
                              {order.paymentMethod === "cod"
                                ? "Cash on Delivery"
                                : order.paymentMethod === "upi"
                                  ? "UPI"
                                  : "Card"}
                            </p>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="mt-4 rounded-2xl bg-white p-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#66736B]">Subtotal</span>

                            <span className="font-semibold text-[#183126]">
                              ₹{order.subtotal}
                            </span>
                          </div>

                          <div className="mt-3 flex justify-between text-sm">
                            <span className="text-[#66736B]">Delivery</span>

                            <span className="font-semibold text-[#183126]">
                              {order.deliveryFee === 0
                                ? "FREE"
                                : `₹${order.deliveryFee}`}
                            </span>
                          </div>

                          <div className="mt-4 border-t border-[#E5E1D5] pt-4">
                            <div className="flex justify-between">
                              <span className="font-bold text-[#183126]">
                                Total
                              </span>

                              <span className="text-lg font-bold text-[#174D32]">
                                ₹{order.total}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
                     </div>
          ) : null}
          {/* Bottom CTA */}
          {orders.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-[#174D32] px-6 py-3 text-sm font-semibold text-[#174D32] transition hover:bg-[#174D32] hover:text-white"
              >
                Order Something Healthy
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Orders;
