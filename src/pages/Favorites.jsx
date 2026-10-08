
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useFavorites } from "../context/FavoriteContext";
import { useCart } from "../context/CartContext";
import FloatingCartBar from "../components/FloatingCartBar";

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-[#F8FAF5] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-[#174D32]">
            <Heart size={22} className="fill-red-500 text-red-500" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Your collection
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#174D32] sm:text-4xl">
            Your Favorite Meals
          </h1>

          <p className="mt-3 text-gray-600">
            All the healthy meals you love, in one place.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {favorites.length}{" "}
            {favorites.length === 1 ? "meal" : "meals"} saved
          </p>
        </div>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#C9D8C9] bg-white px-6 py-16 text-center sm:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF5EA]">
              <Heart size={36} className="text-[#174D32]" />
            </div>

            <h2 className="text-2xl font-bold text-[#174D32]">
              No favorites yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-600">
              Explore our healthy menu and tap the heart icon
              on meals you love. They will appear here.
            </p>

            <Link
              to="/menu"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#174D32] px-7 py-3 font-semibold text-white transition hover:bg-[#103B25]"
            >
              <ShoppingBag size={18} />
              Explore Menu
            </Link>
          </div>
        ) : (
          /* Favorite meals grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((food) => (
              <article
                key={food.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[1.15/0.9] overflow-hidden bg-gray-100">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() => toggleFavorite(food)}
                    aria-label={`Remove ${food.name} from favorites`}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
                  >
                    <Heart
                      size={19}
                      className="fill-red-500 text-red-500"
                    />
                  </button>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-[#174D32]">
                    {food.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-600">
                    {food.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-[#174D32]">
                      ₹{food.price}
                    </span>

                    {food.calories != null && (
                      <span className="text-sm text-gray-500">
                        {food.calories} kcal
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(food)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#174D32] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#103B25]"
                    >
                      <ShoppingBag size={17} />
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(food)}
                      aria-label={`Remove ${food.name}`}
                      title="Remove from favorites"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-100 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <FloatingCartBar />
    </main>
  );
}

export default Favorites;