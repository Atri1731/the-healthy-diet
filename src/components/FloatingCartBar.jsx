import { ShoppingCart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FloatingCartBar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  if (cartCount === 0) {
    return null;
  }

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <button
      type="button"
      onClick={handleViewCart}
      aria-label={`View cart with ${cartCount} ${
        cartCount === 1 ? "item" : "items"
      }`}
      className="
        fixed
        bottom-3
        left-3
        right-3
        z-50
        flex
        h-14
        items-center
        justify-between
        rounded-2xl
        bg-[#174D32]
        px-4
        text-white
        shadow-[0_8px_30px_rgba(23,77,50,0.28)]
        transition-all
        duration-200
        hover:bg-[#123F29]
        hover:shadow-[0_10px_35px_rgba(23,77,50,0.35)]
        active:scale-[0.99]
        sm:left-5
        sm:right-5
        sm:h-16
        sm:px-6
        lg:bottom-5
        lg:left-1/2
        lg:right-auto
        lg:w-[calc(100%-40px)]
        lg:max-w-[1380px]
        lg:-translate-x-1/2
      "
    >
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/15
            sm:h-10
            sm:w-10
          "
        >
          <ShoppingCart size={20} strokeWidth={2.2} />
        </div>

        <div className="text-left">
          <p className="text-sm font-bold leading-tight sm:text-base">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </p>

          <p className="mt-0.5 hidden text-[11px] text-white/70 sm:block">
            Ready to checkout
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="text-sm font-bold sm:text-base">
          View Cart
        </span>

        <ChevronRight
          size={20}
          strokeWidth={2.5}
          className="transition-transform duration-200"
        />
      </div>
    </button>
  );
}