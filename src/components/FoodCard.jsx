import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { Link } from "react-router-dom";

function FoodCard({ food }) {
  const { isFavorite, toggleFavorite } = useFavorites();
const favorite = isFavorite(food.id);

const handleFavoriteClick = () => {
  toggleFavorite(food);
};
  const { addToCart } = useCart();

 const handleAddToCart = () => {
  addToCart(food);
  console.log("Added to cart:", food);
};

  return (
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
            className="inline-flex items-center gap-1.5 rounded-full bg-[#174D32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D3522] active:scale-95"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;