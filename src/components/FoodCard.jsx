
// import { Heart, ShoppingCart, Star } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { useFavorites } from "../context/FavoriteContext";
// import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// function FoodCard({ food }) {
//   const { isFavorite, toggleFavorite } = useFavorites();
//   const { addToCart } = useCart();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const favorite = isFavorite(food.id);

//   const handleFavoriteClick = () => {
//     toggleFavorite(food);
//   };

// const handleAddToCart = () => {
//   if (!isAuthenticated) {
//     navigate("/login", {
//       state: {
//         redirectTo: `/menu/${food.id}`,
//         addToCart: food,
//       },
//     });
//     return;
//   }

//   addToCart(food);
//   console.log("Added to cart:", food);
// };

//   return (
//     <article className="group overflow-hidden rounded-[20px] border border-[#E5E1D5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(24,49,38,0.10)]">

//       <div className="relative aspect-[1.15/0.9] overflow-hidden">
//         <Link
//           to={`/menu/${food.id}`}
//           aria-label={`View details for ${food.name}`}
//           className="block h-full w-full"
//         >
//           {food.image ? (
//             <img
//               src={food.image}
//               alt={food.name}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           ) : (
//             <div className="flex h-full items-center justify-center bg-[#F7F3E8] text-sm text-[#66736B]">
//               No image available
//             </div>
//           )}
//         </Link>

//         <button
//           type="button"
//           onClick={handleFavoriteClick}
//           aria-label={
//             favorite
//               ? `Remove ${food.name} from favorites`
//               : `Add ${food.name} to favorites`
//           }
//           aria-pressed={favorite}
//           className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 active:scale-95"
//         >
//           <Heart
//             size={19}
//             className={
//               favorite
//                 ? "fill-red-500 text-red-500"
//                 : "text-[#174D32]"
//             }
//           />
//         </button>
//       </div>

//       <div className="p-4">
//         <h3 className="text-[15px] font-bold text-[#183126]">
//           <Link
//             to={`/menu/${food.id}`}
//             className="transition hover:text-[#6B9F45]"
//           >
//             {food.name}
//           </Link>
//         </h3>

//         <p className="mt-2 min-h-[40px] text-xs leading-5 text-[#66736B]">
//           {food.description}
//         </p>

//         <div className="mt-3 flex items-center gap-4">
//           <span className="flex items-center gap-1 text-xs font-medium">
//             <Star
//               size={13}
//               className="fill-[#E5A62B] text-[#E5A62B]"
//             />
//             {food.rating}
//           </span>

//           <span className="text-xs text-[#66736B]">
//             {food.calories} kcal
//           </span>
//         </div>

//         <div className="mt-4 flex items-center justify-between gap-2">
//           <span className="text-lg font-bold text-[#174D32]">
//             ₹{food.price}
//           </span>

//           <button
//             type="button"
//             onClick={handleAddToCart}
//             className="inline-flex items-center gap-1.5 rounded-full bg-[#174D32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D3522] active:scale-95"
//           >
//             <ShoppingCart size={15} />
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default FoodCard;


// import { useState, useEffect, useRef } from "react";
// import { Heart, ShoppingCart, Star, Check } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { useFavorites } from "../context/FavoriteContext";
// import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// function FoodCard({ food }) {
//   const { isFavorite, toggleFavorite } = useFavorites();
//   const { addToCart } = useCart();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const [added, setAdded] = useState(false);
//   const timeoutRef = useRef(null);

//   const favorite = isFavorite(food.id);

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const handleFavoriteClick = () => {
//     toggleFavorite(food);
//   };

//   const handleAddToCart = () => {
//     if (!isAuthenticated) {
//       navigate("/login", {
//         state: {
//           redirectTo: `/menu/${food.id}`,
//           addToCart: food,
//         },
//       });
//       return;
//     }

//     addToCart(food);
//     setAdded(true);

//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     timeoutRef.current = setTimeout(() => {
//       setAdded(false);
//       timeoutRef.current = null;
//     }, 1400);
//   };

//   return (
//     <article className="group overflow-hidden rounded-[20px] border border-[#E5E1D5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(24,49,38,0.10)]">
//       <div className="relative aspect-[1.15/0.9] overflow-hidden">
//         <Link
//           to={`/menu/${food.id}`}
//           aria-label={`View details for ${food.name}`}
//           className="block h-full w-full"
//         >
//           {food.image ? (
//             <img
//               src={food.image}
//               alt={food.name}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           ) : (
//             <div className="flex h-full items-center justify-center bg-[#F7F3E8] text-sm text-[#66736B]">
//               No image available
//             </div>
//           )}
//         </Link>

//         <button
//           type="button"
//           onClick={handleFavoriteClick}
//           aria-label={
//             favorite
//               ? `Remove ${food.name} from favorites`
//               : `Add ${food.name} to favorites`
//           }
//           aria-pressed={favorite}
//           className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 active:scale-95"
//         >
//           <Heart
//             size={19}
//             className={
//               favorite
//                 ? "fill-red-500 text-red-500"
//                 : "text-[#174D32]"
//             }
//           />
//         </button>
//       </div>

//       <div className="p-4">
//         <h3 className="text-[15px] font-bold text-[#183126]">
//           <Link
//             to={`/menu/${food.id}`}
//             className="transition hover:text-[#6B9F45]"
//           >
//             {food.name}
//           </Link>
//         </h3>

//         <p className="mt-2 min-h-[40px] text-xs leading-5 text-[#66736B]">
//           {food.description}
//         </p>

//         <div className="mt-3 flex items-center gap-4">
//           <span className="flex items-center gap-1 text-xs font-medium">
//             <Star
//               size={13}
//               className="fill-[#E5A62B] text-[#E5A62B]"
//             />
//             {food.rating}
//           </span>

//           <span className="text-xs text-[#66736B]">
//             {food.calories} kcal
//           </span>
//         </div>

//         <div className="mt-4 flex items-center justify-between gap-2">
//           <span className="text-lg font-bold text-[#174D32]">
//             ₹{food.price}
//           </span>

//           <button
//             type="button"
//             onClick={handleAddToCart}
//             aria-live="polite"
//             className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 active:scale-95 ${
//               added
//                 ? "scale-105 bg-[#56863B] shadow-md shadow-green-100"
//                 : "bg-[#174D32] hover:-translate-y-0.5 hover:bg-[#0D3522] hover:shadow-md"
//             }`}
//           >
//             {added ? (
//               <>
//                 <Check
//                   size={16}
//                   className="animate-bounce"
//                 />
//                 Added!
//               </>
//             ) : (
//               <>
//                 <ShoppingCart size={15} />
//                 Add to Cart
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default FoodCard;



import { useState, useEffect, useRef } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Check,
  X,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

function FoodCard({ food }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [added, setAdded] = useState(false);
const [showLoginPopup, setShowLoginPopup] = useState(false);
const [loginAction, setLoginAction] = useState("cart");
  const timeoutRef = useRef(null);

  const favorite = isFavorite(food.id);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close popup with the Escape key.
  useEffect(() => {
    if (!showLoginPopup) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowLoginPopup(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showLoginPopup]);



const handleFavoriteClick = () => {
  if (!isAuthenticated) {
    setLoginAction("favorite");
    setShowLoginPopup(true);
    return;
  }

  toggleFavorite(food);
};


const handleAddToCart = () => {
  if (!isAuthenticated) {
    setLoginAction("cart");
    setShowLoginPopup(true);
    return;
  }

  addToCart(food);
  setAdded(true);

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  timeoutRef.current = setTimeout(() => {
    setAdded(false);
    timeoutRef.current = null;
  }, 1400);
};


const handleLogin = () => {
  setShowLoginPopup(false);

  navigate("/login", {
    state: {
      redirectTo: location.pathname + location.search,
      ...(loginAction === "cart"
        ? { addToCart: food }
        : { addToFavorite: food }),
    },
  });
};


  return (
    <>
      <article className="group overflow-hidden rounded-[20px] border border-[#E5E1D5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(24,49,38,0.10)]">
        <div className="relative aspect-[1.15/0.9] overflow-hidden">
          <Link
            to={`/menu/${food.id}`}
            aria-label={`View details for ${food.name}`}
            className="block h-full w-full"
          >
            {food.image ? (
              <img
                src={food.image}
                alt={food.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#F7F3E8] text-sm text-[#66736B]">
                No image available
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={
              favorite
                ? `Remove ${food.name} from favorites`
                : `Add ${food.name} to favorites`
            }
            aria-pressed={favorite}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 active:scale-95"
          >
            <Heart
              size={19}
              className={
                favorite
                  ? "fill-red-500 text-red-500"
                  : "text-[#174D32]"
              }
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-[15px] font-bold text-[#183126]">
            <Link
              to={`/menu/${food.id}`}
              className="transition hover:text-[#6B9F45]"
            >
              {food.name}
            </Link>
          </h3>

          <p className="mt-2 min-h-[40px] text-xs leading-5 text-[#66736B]">
            {food.description}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <span className="flex items-center gap-1 text-xs font-medium">
              <Star
                size={13}
                className="fill-[#E5A62B] text-[#E5A62B]"
              />
              {food.rating}
            </span>

            <span className="text-xs text-[#66736B]">
              {food.calories} kcal
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-[#174D32]">
              ₹{food.price}
            </span>

            <button
              type="button"
              onClick={handleAddToCart}
              aria-live="polite"
              className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 active:scale-95 ${
                added
                  ? "scale-105 bg-[#56863B] shadow-md shadow-green-100"
                  : "bg-[#174D32] hover:-translate-y-0.5 hover:bg-[#0D3522] hover:shadow-md"
              }`}
            >
              {added ? (
                <>
                  <Check size={16} className="animate-bounce" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart size={15} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* Login popup for guests */}
      {showLoginPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10271B]/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowLoginPopup(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-login-title"
            className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setShowLoginPopup(false)}
              aria-label="Close login popup"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#52645A] shadow-sm transition hover:bg-[#F1F4EC] hover:text-[#174D32]"
            >
              <X size={19} />
            </button>

            <div className="bg-gradient-to-br from-[#174D32] to-[#4D7D42] px-7 pb-8 pt-9 text-center text-white">
              <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-inner">
                <LockKeyhole size={31} strokeWidth={1.7} />
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-[#D9EBC9]">
                One little step
              </p>

              <h2
                id="cart-login-title"
                className="text-2xl font-bold tracking-tight"
              >
              {loginAction === "cart"
  ? "Login to add to cart"
  : "Login to save your favorite"}
              </h2>

             {loginAction === "cart"
  ? "Sign in to add your favorite healthy meals to your cart."
  : "Sign in to save this meal to your favorites and find it easily later."}
            </div>

            <div className="px-7 pb-7 pt-6">
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#E5EBDD] bg-[#F7F9F3] p-3">
                {food.image ? (
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#E8EEDF]">
                    <ShoppingCart size={22} className="text-[#174D32]" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#183126]">
                    {food.name}
                  </p>
                  <p className="mt-1 text-xs text-[#66736B]">
                    {loginAction === "cart"
  ? "Ready to add to your cart"
  : "Save this meal to your favorites"}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#174D32]">
                    ₹{food.price}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#174D32] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-[#0D3522] hover:shadow-xl active:translate-y-0"
              >
                Login to Continue
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => setShowLoginPopup(false)}
                className="mt-3 w-full rounded-full px-5 py-3 text-sm font-semibold text-[#66736B] transition hover:bg-[#F4F5F0] hover:text-[#174D32]"
              >
                Maybe Later
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-[#89938B]">
                Your healthy choices are waiting for you.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FoodCard;