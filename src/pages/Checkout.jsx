import {ArrowLeft, Check, CreditCard, MapPin, Phone, User} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useCart} from "../context/CartContext";
import api from "../services/api";
import {useAuth} from "../context/AuthContext";

function Checkout() {
  const navigate = useNavigate();

  const {cartItems, cartTotal, clearCart} = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const deliveryFee = cartTotal >= 499 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;
 
const { token, isAuthenticated, user } = useAuth();

useEffect(() => {
  if (!isAuthenticated || !token) return;

  let cancelled = false;

  const loadCustomerDetails = async () => {
    // Use login details immediately if they are available.
    if (user) {
      setFormData((previous) => ({
        ...previous,
        name: user.name || previous.name,
        email: user.email || previous.email,
      }));
    }

    try {
      // Fetch the latest saved details from your database.
      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (cancelled) return;

      const profile = response.data.user;

      setFormData((previous) => ({
        ...previous,
        name: profile.name || previous.name,
        email: profile.email || previous.email,
      }));
    } catch (error) {
      console.error(
        "Unable to load customer details:",
        error.response?.data?.message || error.message
      );
    }
  };

  loadCustomerDetails();

  return () => {
    cancelled = true;
  };
}, [isAuthenticated, token, user]);;

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  // -----------------------------
  // Handle input
  // -----------------------------
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error when user starts correcting
    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // -----------------------------
  // Validate form
  // -----------------------------
  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can contain letters only.";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a more complete address.";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city.";
    } else if (!/^[A-Za-z ]+$/.test(formData.city.trim())) {
      newErrors.city = "City can contain letters only.";
    }

    // Pincode
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Please enter your pincode.";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // Place order
  // -----------------------------

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    console.log("PLACE ORDER HANDLER FIRED");
    setOrderError("");

    if (!isAuthenticated || !token) {
      navigate("/login", {
        state: {from: "/checkout"},
      });
      return;
    }

    if (!validateForm() || cartItems.length === 0) {
      return;
    }

    if (placingOrder) return;

    setPlacingOrder(true);

    try {
      const response = await api.post(
        "/orders",
        {
          customer: {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            pincode: formData.pincode.trim(),
          },
          items: cartItems,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data?.success || !response.data?.order) {
        throw new Error(
          response.data?.message || "Unable to place your order.",
        );
      }

      const order = response.data.order;

      // Save the latest order for the existing success page.
      localStorage.setItem("healthyDietLastOrder", JSON.stringify(order));

      // Clear the cart only after the backend confirms success.
      clearCart();

      navigate("/order-success", {
        state: {order},
        replace: true,
      });
    } catch (error) {
      console.error(
        "Place order error:",
        error.response?.data || error.message,
      );

      setOrderError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // -----------------------------
  // Empty cart
  // -----------------------------
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFAF4]">
        {/* <Navbar /> */}

        <main className="flex min-h-[60vh] items-center justify-center px-5 py-16">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EFDC]">
              <Check size={28} className="text-[#174D32]" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#183126]">
              Your cart is empty
            </h1>

            <p className="mt-2 text-sm text-[#66736B]">
              Add some healthy food before checking out.
            </p>

            <Link
              to="/menu"
              className="mt-6 inline-flex rounded-full bg-[#174D32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D3522]"
            >
              Explore Menu
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAF4]">
      {/* <Navbar /> */}

      <main className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B9F45]">
            Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#183126] sm:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-2 text-sm text-[#66736B]">
            Just a few details and your healthy meal will be on its way.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]"
        >
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Customer Information */}
            <section className="rounded-[24px] border border-[#E5E1D5] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7EFDC]">
                  <User size={18} className="text-[#174D32]" />
                </div>

                <div>
                  <h2 className="font-bold text-[#183126]">
                    Customer Information
                  </h2>

                  <p className="text-xs text-[#66736B]">
                    Tell us where to deliver your order.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#183126]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full rounded-xl border bg-[#FCFAF4] px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                      errors.name
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-[#E5E1D5] focus:border-[#6B9F45] focus:ring-[#E7EFDC]"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#183126]">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66736B]"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      maxLength={10}
                      className={`w-full rounded-xl border bg-[#FCFAF4] py-3 pl-11 pr-4 text-sm outline-none transition focus:ring-2 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-[#E5E1D5] focus:border-[#6B9F45] focus:ring-[#E7EFDC]"
                      }`}
                    />
                  </div>

                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-[#183126]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border bg-[#FCFAF4] px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                      errors.email
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-[#E5E1D5] focus:border-[#6B9F45] focus:ring-[#E7EFDC]"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section className="rounded-[24px] border border-[#E5E1D5] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7EFDC]">
                  <MapPin size={18} className="text-[#174D32]" />
                </div>

                <div>
                  <h2 className="font-bold text-[#183126]">Delivery Address</h2>

                  <p className="text-xs text-[#66736B]">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {/* Address */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#183126]">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="House / Flat number, Street, Area"
                    className={`w-full resize-none rounded-xl border bg-[#FCFAF4] px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                      errors.address
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-[#E5E1D5] focus:border-[#6B9F45] focus:ring-[#E7EFDC]"
                    }`}
                  />

                  {errors.address && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* City */}
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#183126]">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className={`w-full rounded-xl border bg-[#FCFAF4] px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                        errors.city
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-[#E5E1D5] focus:border-[#6B9F45] focus:ring-[#E7EFDC]"
                      }`}
                    />

                    {errors.city && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#183126]">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="396001"
                      maxLength={6}
                      className={`w-full rounded-xl border bg-[#FCFAF4] px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                        errors.pincode
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-[#E5E1D5] focus:border-[#6B9F45] focus:ring-[#E7EFDC]"
                      }`}
                    />

                    {errors.pincode && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-[24px] border border-[#E5E1D5] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7EFDC]">
                  <CreditCard size={18} className="text-[#174D32]" />
                </div>

                <div>
                  <h2 className="font-bold text-[#183126]">Payment Method</h2>

                  <p className="text-xs text-[#66736B]">
                    Choose how you'd like to pay.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {/* COD */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-[#6B9F45] bg-[#E7EFDC]"
                      : "border-[#E5E1D5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#174D32]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#183126]">
                        Cash on Delivery
                      </p>

                      <p className="text-xs text-[#66736B]">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#174D32]">
                    COD
                  </span>
                </label>

                {/* UPI */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                    paymentMethod === "upi"
                      ? "border-[#6B9F45] bg-[#E7EFDC]"
                      : "border-[#E5E1D5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#174D32]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#183126]">
                        UPI
                      </p>

                      <p className="text-xs text-[#66736B]">Pay using UPI.</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#174D32]">
                    UPI
                  </span>
                </label>

                {/* Card */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                    paymentMethod === "card"
                      ? "border-[#6B9F45] bg-[#E7EFDC]"
                      : "border-[#E5E1D5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#174D32]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#183126]">
                        Card
                      </p>

                      <p className="text-xs text-[#66736B]">
                        Credit or debit card.
                      </p>
                    </div>
                  </div>

                  <CreditCard size={20} className="text-[#174D32]" />
                </label>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <aside className="h-fit rounded-[24px] border border-[#E5E1D5] bg-white p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-[#183126]">Order Summary</h2>

            <div className="mt-5 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#183126]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#66736B]">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-[#174D32]">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-[#E5E1D5] pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#66736B]">Subtotal</span>

                <span className="font-semibold text-[#183126]">
                  ₹{cartTotal}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#66736B]">Delivery</span>

                <span className="font-semibold text-[#183126]">
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="border-t border-[#E5E1D5] pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#183126]">Total</span>

                  <span className="text-2xl font-bold text-[#174D32]">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>
            </div>

            {orderError && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {orderError}
              </div>
            )}

            <button
              type="submit"
              disabled={placingOrder}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#174D32] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0D3522] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Check size={17} />
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>

            <Link
              to="/cart"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#174D32]"
            >
              <ArrowLeft size={15} />
              Back to Cart
            </Link>

            <p className="mt-5 text-center text-[11px] leading-5 text-[#66736B]">
              Your information is used only to process your order.
            </p>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
