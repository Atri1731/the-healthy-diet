import {useEffect, useMemo, useState} from "react";
import {Search, SlidersHorizontal, X} from "lucide-react";
import FoodCard from "../components/FoodCard";
import api from "../services/api";
import { useSearchParams } from "react-router-dom";


const categories = [
  "All",
  "Salads",
  "Healthy Meals",
  "Soups",
  "Smoothies",
  "Healthy Desserts",
];

function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const [searchParams, setSearchParams] = useSearchParams();

const [activeCategory, setActiveCategory] = useState(
  () => searchParams.get("category") || "All"
);


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
          })),
        );
      } catch (err) {
        console.error("Failed to load products:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load meals. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = useMemo(() => {
    let result = foods.filter((food) => {
      const matchesCategory =
        activeCategory === "All" || food.category === activeCategory;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        food.name.toLowerCase().includes(searchValue) ||
        food.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [foods, search, activeCategory, sort]);

  return (
    <main className="min-h-screen bg-[#FCFAF4]">
      {/* =================================
          MENU HERO
      ================================= */}
      <section className="w-full bg-[#F7F3E8] px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:px-12 lg:pb-14 lg:pt-20 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#6B9F45]">
            Our Menu
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#183126] sm:text-5xl lg:text-[56px]">
            Eat Well.
            <span className="block text-[#174D32]">Feel Great.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#66736B] sm:text-base">
            Explore our collection of fresh, nutritious and delicious meals made
            for a healthier lifestyle.
          </p>
        </div>
      </section>

      {/* =================================
          MENU CONTENT
      ================================= */}
      <section className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        {/* Search + Filter */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-[440px]">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66736B]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search healthy meals..."
              className="
                h-12
                w-full
                rounded-full
                border
                border-[#DED8CA]
                bg-white
                pl-11
                pr-11
                text-sm
                text-[#183126]
                outline-none
                transition
                focus:border-[#6B9F45]
                focus:ring-2
                focus:ring-[#6B9F45]/10
              "
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66736B] hover:text-[#174D32]"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-[#66736B]" />

            <span className="text-sm text-[#66736B]">Sort by</span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                rounded-full
                border
                border-[#DED8CA]
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-[#183126]
                outline-none
              "
            >
              <option value="popular">Popular</option>

              <option value="rating">Top Rated</option>

              <option value="price-low">Price: Low to High</option>

              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}

                className={`
                  shrink-0
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition
                  ${
                    active
                      ? "bg-[#174D32] text-white"
                      : "border border-[#DED8CA] bg-white text-[#66736B] hover:border-[#6B9F45] hover:text-[#174D32]"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Result Header */}
        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-[#6B9F45]">
              Fresh Selection
            </p>

            <h2 className="mt-1 font-serif text-2xl font-bold text-[#183126] sm:text-3xl">
              Healthy Meals
            </h2>
          </div>

          <p className="text-xs text-[#66736B] sm:text-sm">
            {filteredFoods.length}{" "}
            {filteredFoods.length === 1 ? "meal" : "meals"}
          </p>
        </div>

        {/* Food Grid */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm font-medium text-[#66736B]">
              Loading fresh meals...
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#174D32] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredFoods.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EFDC]">
              <Search size={25} className="text-[#174D32]" />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#183126]">
              No meals found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-[#66736B]">
              Try another search term or choose a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-full bg-[#174D32] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Menu;
