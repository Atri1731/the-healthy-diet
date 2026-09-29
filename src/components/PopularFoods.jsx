
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";
import api from "../services/api";

function PopularFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");
        const products = response.data.products || [];

        setFoods(
          products.map((product) => ({
            ...product,
            id: product._id,
          }))
        );
      } catch (err) {
        console.error("Failed to load homepage products:", err);
        setError("Unable to load meals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <section className="w-full bg-[#F7F3E8] py-12 sm:py-14 lg:py-16">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#6B9F45]">
            Today's Picks
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#183126] sm:text-4xl lg:text-[44px]">
            Our Most Loved Meals
          </h2>

          <p className="mt-3 text-sm text-[#66736B] sm:text-base">
            Delicious. Nutritious. Customer Approved.
          </p>
        </div>

        {/* Products from MongoDB */}
        {loading ? (
          <div className="mt-8 flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-[#66736B]">
              Loading fresh meals...
            </p>
          </div>
        ) : error ? (
          <div className="mt-8 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#174D32] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        ) : foods.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="mt-8 py-12 text-center">
            <p className="font-semibold text-[#183126]">
              No meals available yet
            </p>
            <p className="mt-2 text-sm text-[#66736B]">
              Check back soon for our healthy food selection.
            </p>
          </div>
        )}

        {/* View Menu */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/menu"
            className="rounded-full border border-[#174D32] px-6 py-2.5 text-sm font-semibold text-[#174D32] transition hover:bg-[#174D32] hover:text-white"
          >
            Explore Full Menu
          </Link>
        </div>

      </div>
    </section>
  );
}

export default PopularFoods;