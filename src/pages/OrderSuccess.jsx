import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Home,
  PackageCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function OrderSuccess() {
  const location = useLocation();

  const order =
    location.state?.order ||
    JSON.parse(localStorage.getItem("healthyDietLastOrder") || "null");

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FCFAF4]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-5 py-12">
          <div className="w-full max-w-lg rounded-[28px] border border-[#E5E1D5] bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EFDC]">
              <PackageCheck size={30} className="text-[#174D32]" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#183126]">
              No Order Found
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#66736B]">
              We couldn't find your recent order. You can continue shopping
              from our healthy menu.
            </p>

            <Link
              to="/menu"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#174D32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D3522]"
            >
              Explore Menu
              <ArrowRight size={16} />
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const orderDate = new Date(order.createdAt);

  return (
    <div className="min-h-screen bg-[#FCFAF4]">
      <Navbar />

      <main className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mx-auto w-full max-w-4xl">
          {/* Success Header */}
          <section className="rounded-[28px] bg-[#174D32] px-6 py-10 text-center text-white shadow-[0_20px_50px_rgba(23,77,50,0.15)] sm:px-10 sm:py-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <CheckCircle2
                size={42}
                className="text-[#6B9F45]"
                strokeWidth={2.5}
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#BFD5A8]">
              Order Confirmed
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Thank You For Your Order!
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              Your healthy meal is on its way. We have received your order
              successfully.
            </p>

            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold">
              <span>Order ID:</span>
              <span className="text-[#D7E8C5]">{order.id}</span>
            </div>
          </section>

          {/* Order Information */}
          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Left */}
            <div className="space-y-6">
              {/* Status */}
              <div className="rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFDC]">
                    <Clock3 size={20} className="text-[#174D32]" />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#183126]">
                      Preparing Your Order
                    </h2>

                    <p className="mt-1 text-xs text-[#66736B]">
                      We'll prepare your food fresh and carefully.
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-7">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#174D32] text-white">
                      <CheckCircle2 size={17} />
                    </div>

                    <div className="h-1 flex-1 bg-[#174D32]" />

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B9F45] text-white">
                      <Clock3 size={16} />
                    </div>

                    <div className="h-1 flex-1 bg-[#E5E1D5]" />

                    <div className="h-8 w-8 rounded-full bg-[#E7EFDC]" />

                    <div className="h-1 flex-1 bg-[#E5E1D5]" />

                    <div className="h-8 w-8 rounded-full bg-[#E7EFDC]" />
                  </div>

                  <div className="mt-3 grid grid-cols-4 text-[10px] font-medium text-[#66736B] sm:text-xs">
                    <span>Confirmed</span>
                    <span className="text-center">Preparing</span>
                    <span className="text-center">Out for delivery</span>
                    <span className="text-right">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#183126]">
                    Your Items
                  </h2>

                  <span className="text-xs font-semibold text-[#66736B]">
                    {order.items.length} item
                    {order.items.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="mt-5 divide-y divide-[#E5E1D5]">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-[#183126]">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#66736B]">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-bold text-[#174D32]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
                <h2 className="text-lg font-bold text-[#183126]">
                  Delivery Details
                </h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs text-[#66736B]">Customer</p>
                    <p className="mt-1 text-sm font-semibold text-[#183126]">
                      {order.customer.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#66736B]">Phone</p>
                    <p className="mt-1 text-sm font-semibold text-[#183126]">
                      {order.customer.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#66736B]">Address</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#183126]">
                      {order.customer.address}, {order.customer.city} -{" "}
                      {order.customer.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="h-fit rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
              <h2 className="text-lg font-bold text-[#183126]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#66736B]">Subtotal</span>
                  <span className="font-semibold text-[#183126]">
                    ₹{order.subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#66736B]">Delivery</span>
                  <span className="font-semibold text-[#183126]">
                    {order.deliveryFee === 0
                      ? "FREE"
                      : `₹${order.deliveryFee}`}
                  </span>
                </div>

                <div className="border-t border-[#E5E1D5] pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#183126]">Total</span>

                    <span className="text-xl font-bold text-[#174D32]">
                      ₹{order.total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#F7F3E8] p-4">
                <p className="text-xs text-[#66736B]">Payment Method</p>

                <p className="mt-1 text-sm font-bold text-[#183126]">
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : order.paymentMethod === "upi"
                    ? "UPI"
                    : "Card"}
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-[#E7EFDC] p-4">
                <p className="text-xs text-[#66736B]">Order Placed</p>

                <p className="mt-1 text-sm font-bold text-[#174D32]">
                  {orderDate.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <Link
                to="/menu"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#174D32] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D3522]"
              >
                Continue Shopping
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/"
                className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#174D32]"
              >
                <Home size={15} />
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OrderSuccess;