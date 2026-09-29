
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Flame,
  Clock,
  Leaf,
  Utensils,
} from "lucide-react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";

function MealDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchMeal = async () => {
      try {
        setLoading(true);
        setError("");

        // Use the existing products API.
        const response = await api.get("/products");
        const products = response.data.products || [];

        const foundMeal = products.find(
          (product) => String(product._id) === String(id)
        );

        if (!active) return;

        if (!foundMeal) {
          setError("We couldn't find this meal.");
          setMeal(null);
          return;
        }

        setMeal({
          ...foundMeal,
          id: foundMeal._id,
        });
      } catch (err) {
        if (active) {
          setError("Unable to load this meal. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchMeal();

    return () => {
      active = false;
    };
  }, [id]);

  const isFavorite = meal
    ? favorites.some(
        (food) => String(food.id) === String(meal.id)
      )
    : false;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8FAF5] px-4 py-16">
        <p className="text-center text-[#174D32]">
          Loading meal details...
        </p>
      </main>
    );
  }

  if (error || !meal) {
    return (
      <main className="min-h-screen bg-[#F8FAF5] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <Utensils
            size={40}
            className="mx-auto text-[#6B9F45]"
          />
          <h1 className="mt-4 text-2xl font-bold text-[#174D32]">
            Meal not found
          </h1>
          <p className="mt-2 text-gray-600">
            {error || "This meal may no longer be available."}
          </p>
          <Link
            to="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#174D32] px-6 py-3 font-semibold text-white"
          >
            <ArrowLeft size={17} />
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAF5] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/menu"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#174D32] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        {/* Main meal information */}
        <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
            <img
              src={meal.image}
              alt={meal.name}
              className="h-full max-h-[520px] min-h-[300px] w-full object-cover"
            />

            <button
              type="button"
              onClick={() => toggleFavorite(meal)}
              aria-label={
                isFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
            >
              <Heart
                size={22}
                className={
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-[#174D32]"
                }
              />
            </button>
          </div>

          <div className="flex flex-col justify-center py-2">
            <span className="w-fit rounded-full bg-[#E7EFDC] px-4 py-2 text-sm font-semibold text-[#174D32]">
              {meal.category || "Healthy Choice"}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#174D32] sm:text-4xl lg:text-5xl">
              {meal.name}
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-600">
              {meal.description || "A delicious addition to your healthy lifestyle."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                <Flame size={18} className="text-orange-500" />
                {meal.calories != null
                  ? `${meal.calories} kcal`
                  : "Calories unavailable"}
              </div>

              {meal.rating != null && (
                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                  <span className="text-amber-500">★</span>
                  {meal.rating} rating
                </div>
              )}

              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                <Leaf size={18} className="text-[#6B9F45]" />
                Healthy choice
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[#E5E1D5] pt-6">
              <span className="text-3xl font-bold text-[#174D32]">
                ₹{meal.price}
              </span>

              <button
                type="button"
                onClick={() => addToCart(meal)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#174D32] px-7 py-3.5 font-semibold text-white transition hover:bg-[#103B25]"
              >
                <ShoppingCart size={19} />
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        {/* Ingredients and nutrition */}
        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#E5E1D5] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFDC]">
                <Utensils size={21} className="text-[#174D32]" />
              </div>
              <h2 className="text-2xl font-bold text-[#174D32]">
                Ingredients
              </h2>
            </div>

            {Array.isArray(meal.ingredients) &&
            meal.ingredients.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {meal.ingredients.map((ingredient, index) => (
                  <li
                    key={`${ingredient}-${index}`}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <Leaf
                      size={17}
                      className="mt-1 shrink-0 text-[#6B9F45]"
                    />
                    {typeof ingredient === "string"
                      ? ingredient
                      : ingredient.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 leading-7 text-gray-600">
                Ingredients have not been added for this meal yet.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-[#E5E1D5] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFDC]">
                <Flame size={21} className="text-[#174D32]" />
              </div>
              <h2 className="text-2xl font-bold text-[#174D32]">
                Nutrition Facts
              </h2>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Per serving, when verified serving data is available.
            </p>

            <div className="mt-6 divide-y divide-[#E5E1D5]">
              <div className="flex items-center justify-between py-4">
                <span className="text-gray-600">Calories</span>
                <strong className="text-[#174D32]">
                  {meal.calories != null
                    ? `${meal.calories} kcal`
                    : "Not available"}
                </strong>
              </div>

              {[
                ["Protein", "protein", "g"],
                ["Carbohydrates", "carbohydrates", "g"],
                ["Fat", "fat", "g"],
                ["Fiber", "fiber", "g"],
              ].map(([label, key, unit]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-4"
                >
                  <span className="text-gray-600">{label}</span>
                  <strong className="text-[#174D32]">
                    {meal.nutrition?.[key] != null
                      ? `${meal.nutrition[key]} ${unit}`
                      : "Not available"}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MealDetails;