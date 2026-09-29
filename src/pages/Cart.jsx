import {ArrowLeft, Minus, Plus, ShoppingBag, Trash2} from "lucide-react";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";
import {useCart} from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const deliveryFee = cartTotal > 499 || cartTotal === 0 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FCFAF4]">

      <main className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B9F45]">
            Your Cart
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#183126] sm:text-4xl">
            Your Healthy Choices
          </h1>

          <p className="mt-2 text-sm text-[#66736B]">
            Review your items and continue to checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty cart */
          <div className="mt-10 flex flex-col items-center justify-center rounded-[24px] border border-[#E5E1D5] bg-white px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EFDC]">
              <ShoppingBag size={28} className="text-[#174D32]" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#183126]">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-md text-sm text-[#66736B]">
              Looks like you haven't added any healthy food yet.
            </p>

            <Link
              to="/menu"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#174D32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D3522]"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-[20px] border border-[#E5E1D5] bg-white p-4"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-28"
                  />

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="truncate text-sm font-bold text-[#183126] sm:text-base">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#66736B]">
                          {item.calories} kcal
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#66736B] transition hover:text-red-500"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      {/* Quantity */}
                      <div className="flex items-center rounded-full border border-[#E5E1D5]">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center text-[#174D32]"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-7 text-center text-sm font-semibold text-[#183126]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center text-[#174D32]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-base font-bold text-[#174D32]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="h-fit rounded-[24px] border border-[#E5E1D5] bg-white p-6">
              <h2 className="text-lg font-bold text-[#183126]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
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
                  <div className="flex justify-between">
                    <span className="font-bold text-[#183126]">Total</span>

                    <span className="text-xl font-bold text-[#174D32]">
                      ₹{finalTotal}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 block w-full rounded-full bg-[#174D32] px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#0D3522]"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/menu"
                className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#174D32]"
              >
                <ArrowLeft size={15} />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
