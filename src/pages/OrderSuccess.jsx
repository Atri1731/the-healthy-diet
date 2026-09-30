// import {
//   ArrowRight,
//   CheckCircle2,
//   Clock3,
//   Home,
//   PackageCheck,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// // import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// function OrderSuccess() {
//   const location = useLocation();

//   const order =
//     location.state?.order ||
//     JSON.parse(localStorage.getItem("healthyDietLastOrder") || "null");

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-[#FCFAF4]">
//         <Navbar />

//         <main className="flex min-h-[70vh] items-center justify-center px-5 py-12">
//           <div className="w-full max-w-lg rounded-[28px] border border-[#E5E1D5] bg-white p-8 text-center shadow-sm sm:p-10">
//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EFDC]">
//               <PackageCheck size={30} className="text-[#174D32]" />
//             </div>

//             <h1 className="mt-5 text-2xl font-bold text-[#183126]">
//               No Order Found
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-[#66736B]">
//               We couldn't find your recent order. You can continue shopping
//               from our healthy menu.
//             </p>

//             <Link
//               to="/menu"
//               className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#174D32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D3522]"
//             >
//               Explore Menu
//               <ArrowRight size={16} />
//             </Link>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     );
//   }

//   const orderDate = new Date(order.createdAt);

//   return (
//     <div className="min-h-screen bg-[#FCFAF4]">
//       {/* <Navbar /> */}

//       <main className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
//         <div className="mx-auto w-full max-w-4xl">
//           {/* Success Header */}
//           <section className="rounded-[28px] bg-[#174D32] px-6 py-10 text-center text-white shadow-[0_20px_50px_rgba(23,77,50,0.15)] sm:px-10 sm:py-12">
//             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
//               <CheckCircle2
//                 size={42}
//                 className="text-[#6B9F45]"
//                 strokeWidth={2.5}
//               />
//             </div>

//             <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#BFD5A8]">
//               Order Confirmed
//             </p>

//             <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
//               Thank You For Your Order!
//             </h1>

//             <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
//               Your healthy meal is on its way. We have received your order
//               successfully.
//             </p>

//             <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold">
//               <span>Order ID:</span>
//               <span className="text-[#D7E8C5]">{order.id}</span>
//             </div>
//           </section>

//           {/* Order Information */}
//           <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
//             {/* Left */}
//             <div className="space-y-6">
//               {/* Status */}
//               <div className="rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFDC]">
//                     <Clock3 size={20} className="text-[#174D32]" />
//                   </div>

//                   <div>
//                     <h2 className="font-bold text-[#183126]">
//                       Preparing Your Order
//                     </h2>

//                     <p className="mt-1 text-xs text-[#66736B]">
//                       We'll prepare your food fresh and carefully.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Progress */}
//                 <div className="mt-7">
//                   <div className="flex items-center">
//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#174D32] text-white">
//                       <CheckCircle2 size={17} />
//                     </div>

//                     <div className="h-1 flex-1 bg-[#174D32]" />

//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B9F45] text-white">
//                       <Clock3 size={16} />
//                     </div>

//                     <div className="h-1 flex-1 bg-[#E5E1D5]" />

//                     <div className="h-8 w-8 rounded-full bg-[#E7EFDC]" />

//                     <div className="h-1 flex-1 bg-[#E5E1D5]" />

//                     <div className="h-8 w-8 rounded-full bg-[#E7EFDC]" />
//                   </div>

//                   <div className="mt-3 grid grid-cols-4 text-[10px] font-medium text-[#66736B] sm:text-xs">
//                     <span>Confirmed</span>
//                     <span className="text-center">Preparing</span>
//                     <span className="text-center">Out for delivery</span>
//                     <span className="text-right">Delivered</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Items */}
//               <div className="rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-bold text-[#183126]">
//                     Your Items
//                   </h2>

//                   <span className="text-xs font-semibold text-[#66736B]">
//                     {order.items.length} item
//                     {order.items.length > 1 ? "s" : ""}
//                   </span>
//                 </div>

//                 <div className="mt-5 divide-y divide-[#E5E1D5]">
//                   {order.items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex gap-4 py-4 first:pt-0 last:pb-0"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
//                       />

//                       <div className="min-w-0 flex-1">
//                         <h3 className="truncate text-sm font-bold text-[#183126]">
//                           {item.name}
//                         </h3>

//                         <p className="mt-1 text-xs text-[#66736B]">
//                           ₹{item.price} × {item.quantity}
//                         </p>
//                       </div>

//                       <p className="shrink-0 text-sm font-bold text-[#174D32]">
//                         ₹{item.price * item.quantity}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Delivery Details */}
//               <div className="rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
//                 <h2 className="text-lg font-bold text-[#183126]">
//                   Delivery Details
//                 </h2>

//                 <div className="mt-5 space-y-4">
//                   <div>
//                     <p className="text-xs text-[#66736B]">Customer</p>
//                     <p className="mt-1 text-sm font-semibold text-[#183126]">
//                       {order.customer.name}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-[#66736B]">Phone</p>
//                     <p className="mt-1 text-sm font-semibold text-[#183126]">
//                       {order.customer.phone}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-[#66736B]">Address</p>
//                     <p className="mt-1 text-sm font-semibold leading-6 text-[#183126]">
//                       {order.customer.address}, {order.customer.city} -{" "}
//                       {order.customer.pincode}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="h-fit rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
//               <h2 className="text-lg font-bold text-[#183126]">
//                 Order Summary
//               </h2>

//               <div className="mt-6 space-y-4 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-[#66736B]">Subtotal</span>
//                   <span className="font-semibold text-[#183126]">
//                     ₹{order.subtotal}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-[#66736B]">Delivery</span>
//                   <span className="font-semibold text-[#183126]">
//                     {order.deliveryFee === 0
//                       ? "FREE"
//                       : `₹${order.deliveryFee}`}
//                   </span>
//                 </div>

//                 <div className="border-t border-[#E5E1D5] pt-4">
//                   <div className="flex justify-between">
//                     <span className="font-bold text-[#183126]">Total</span>

//                     <span className="text-xl font-bold text-[#174D32]">
//                       ₹{order.total}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 rounded-2xl bg-[#F7F3E8] p-4">
//                 <p className="text-xs text-[#66736B]">Payment Method</p>

//                 <p className="mt-1 text-sm font-bold text-[#183126]">
//                   {order.paymentMethod === "cod"
//                     ? "Cash on Delivery"
//                     : order.paymentMethod === "upi"
//                     ? "UPI"
//                     : "Card"}
//                 </p>
//               </div>

//               <div className="mt-4 rounded-2xl bg-[#E7EFDC] p-4">
//                 <p className="text-xs text-[#66736B]">Order Placed</p>

//                 <p className="mt-1 text-sm font-bold text-[#174D32]">
//                   {orderDate.toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </p>
//               </div>

//               <Link
//                 to="/menu"
//                 className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#174D32] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D3522]"
//               >
//                 Continue Shopping
//                 <ArrowRight size={16} />
//               </Link>

//               <Link
//                 to="/"
//                 className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#174D32]"
//               >
//                 <Home size={15} />
//                 Back to Home
//               </Link>
//             </div>
//           </section>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default OrderSuccess;

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Home,
  PackageCheck,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function OrderSuccess() {
  const location = useLocation();
  const { token } = useAuth();

  const [order, setOrder] = useState(() => {
    try {
      return (
        location.state?.order ||
        JSON.parse(localStorage.getItem("healthyDietLastOrder") || "null")
      );
    } catch {
      return location.state?.order || null;
    }
  });
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const orderId = order?.id;
    if (!token || !orderId) return;

    let cancelled = false;

    const refreshOrderStatus = async () => {
      try {
        setRefreshing(true);
        const response = await api.get("/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const latestOrder = (response.data.orders || []).find(
          (item) => String(item.id) === String(orderId)
        );

        if (!cancelled && latestOrder) {
          setOrder((currentOrder) => ({
            ...currentOrder,
            ...latestOrder,
          }));

          localStorage.setItem(
            "healthyDietLastOrder",
            JSON.stringify({
              ...order,
              ...latestOrder,
            })
          );
          setLastUpdated(new Date());
        }
      } catch (error) {
        // Keep the order-success page usable if a refresh temporarily fails.
        console.error(
          "Unable to refresh order status:",
          error.response?.data?.message || error.message
        );
      } finally {
        if (!cancelled) setRefreshing(false);
      }
    };

    refreshOrderStatus();
    const intervalId = window.setInterval(refreshOrderStatus, 15000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [token, order?.id]);

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
  const orderStatus = order.status || "Pending";
  const isRejected = orderStatus === "Rejected";
  const isCancelled = orderStatus === "Cancelled";
  const isPending = orderStatus === "Pending";

  const statusCopy = {
    Pending: {
      label: "Waiting for confirmation",
      title: "Your Order Is Pending",
      message: "We've received your order. The Healthy Diet team will review it and update its status here.",
    },
    Confirmed: {
      label: "Order confirmed",
      title: "Your Order Is Confirmed!",
      message: "Good news! Your order has been confirmed by The Healthy Diet.",
    },
    Preparing: {
      label: "Preparing your order",
      title: "We're Preparing Your Order",
      message: "Your order has been confirmed and our team is preparing your healthy meal.",
    },
    "Out for Delivery": {
      label: "Out for delivery",
      title: "Your Order Is On Its Way",
      message: "Your order is out for delivery. We hope you enjoy your healthy meal!",
    },
    Delivered: {
      label: "Delivered",
      title: "Your Order Has Been Delivered",
      message: "Your order has been delivered. Enjoy your healthy meal!",
    },
    Rejected: {
      label: "Order rejected",
      title: "We're Sorry — Your Order Was Rejected",
      message: order.statusMessage || "The Healthy Diet team was unable to accept this order.",
    },
    Cancelled: {
      label: "Order cancelled",
      title: "Your Order Was Cancelled",
      message: order.statusMessage || "This order has been cancelled.",
    },
  };

  const currentStatus = statusCopy[orderStatus] || statusCopy.Pending;
  const progressStatuses = ["Confirmed", "Preparing", "Out for Delivery", "Delivered"];
  const activeProgressIndex = progressStatuses.indexOf(orderStatus);
  const StatusIcon = isRejected || isCancelled
    ? XCircle
    : isPending
      ? Clock3
      : CheckCircle2;

  return (
    <div className="min-h-screen bg-[#FCFAF4]">
      {/* <Navbar /> */}

      <main className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mx-auto w-full max-w-4xl">
          {/* Success Header */}
          <section
            className={`rounded-[28px] px-6 py-10 text-center text-white shadow-[0_20px_50px_rgba(23,77,50,0.15)] sm:px-10 sm:py-12 ${
              isRejected || isCancelled
                ? "bg-[#8F2929]"
                : isPending
                  ? "bg-[#815A13]"
                  : "bg-[#174D32]"
            }`}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <StatusIcon
                size={42}
                className={isRejected || isCancelled ? "text-red-600" : isPending ? "text-amber-600" : "text-[#6B9F45]"}
                strokeWidth={2.5}
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-white/75">
              {currentStatus.label}
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              {currentStatus.title}
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              {currentStatus.message}
            </p>

            {isRejected && order.rejectionReason && (
              <div className="mx-auto mt-5 max-w-xl rounded-2xl bg-white/10 p-4 text-left">
                <p className="text-xs font-bold uppercase tracking-wide">Reason from the admin</p>
                <p className="mt-1 text-sm leading-6">{order.rejectionReason}</p>
              </div>
            )}

            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold">
              <span>Order ID:</span>
              <span className="text-[#D7E8C5]">{order.id}</span>
            </div>
          </section>

          {/* Order Information */}
          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Left */}
            <div className="space-y-6">
              {/* Live Order Status */}
              <div className="rounded-[24px] border border-[#E5E1D5] bg-white p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      isRejected || isCancelled
                        ? "bg-red-100"
                        : isPending
                          ? "bg-amber-100"
                          : "bg-[#E7EFDC]"
                    }`}
                  >
                    <StatusIcon
                      size={20}
                      className={
                        isRejected || isCancelled
                          ? "text-red-700"
                          : isPending
                            ? "text-amber-700"
                            : "text-[#174D32]"
                      }
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-[#183126]">
                        {currentStatus.title}
                      </h2>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          isRejected || isCancelled
                            ? "bg-red-100 text-red-800"
                            : isPending
                              ? "bg-amber-100 text-amber-800"
                              : "bg-[#E7EFDC] text-[#174D32]"
                        }`}
                      >
                        {orderStatus}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#66736B]">
                      {currentStatus.message}
                    </p>

                    {isRejected && order.rejectionReason && (
                      <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-red-800">
                          Rejection reason
                        </p>
                        <p className="mt-1 text-sm leading-6 text-red-900">
                          {order.rejectionReason}
                        </p>
                      </div>
                    )}

                    {lastUpdated && (
                      <p className="mt-3 text-xs text-[#879087]">
                        Last checked: {lastUpdated.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                {!isPending && !isRejected && !isCancelled && (
                  <div className="mt-7">
                    <div className="flex items-center">
                      {progressStatuses.map((step, index) => {
                        const completed = index <= activeProgressIndex;
                        const isCurrent = index === activeProgressIndex;

                        return (
                          <div
                            key={step}
                            className="flex min-w-0 flex-1 items-center last:flex-none"
                          >
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                completed
                                  ? isCurrent
                                    ? "bg-[#6B9F45] text-white"
                                    : "bg-[#174D32] text-white"
                                  : "bg-[#E7EFDC] text-[#174D32]"
                              }`}
                            >
                              {completed ? (
                                isCurrent && step !== "Delivered" ? (
                                  <Clock3 size={16} />
                                ) : (
                                  <CheckCircle2 size={17} />
                                )
                              ) : null}
                            </div>
                            {index < progressStatuses.length - 1 && (
                              <div
                                className={`h-1 min-w-2 flex-1 ${
                                  index < activeProgressIndex
                                    ? "bg-[#174D32]"
                                    : "bg-[#E5E1D5]"
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-1 text-[10px] font-medium text-[#66736B] sm:text-xs">
                      <span>Confirmed</span>
                      <span className="text-center">Preparing</span>
                      <span className="text-center">Out for delivery</span>
                      <span className="text-right">Delivered</span>
                    </div>
                  </div>
                )}

                {isPending && (
                  <div className="mt-5 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900">
                    You don't need to do anything right now. This page checks for status changes automatically every 15 seconds while it remains open.
                  </div>
                )}

                <button
                  type="button"
                  onClick={async () => {
                    if (!token || !order?.id) return;
                    setRefreshing(true);
                    try {
                      const response = await api.get("/orders/my-orders", {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      const latestOrder = (response.data.orders || []).find(
                        (item) => String(item.id) === String(order.id)
                      );
                      if (latestOrder) {
                        const mergedOrder = { ...order, ...latestOrder };
                        setOrder(mergedOrder);
                        localStorage.setItem(
                          "healthyDietLastOrder",
                          JSON.stringify(mergedOrder)
                        );
                        setLastUpdated(new Date());
                      }
                    } catch (error) {
                      console.error(
                        "Unable to refresh order status:",
                        error.response?.data?.message || error.message
                      );
                    } finally {
                      setRefreshing(false);
                    }
                  }}
                  disabled={refreshing}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D9E2D2] px-4 py-2 text-xs font-semibold text-[#174D32] transition hover:bg-[#F1F6EC] disabled:opacity-60"
                >
                  <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                  Refresh order status
                </button>
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