
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import api from "../services/api";

const categoryDetails = [
  {
    id: 1,
    name: "Salads",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    name: "Healthy Meals",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    name: "Soups",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 4,
    name: "Smoothies",
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 5,
    name: "Healthy Desserts",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=85",
  },
];

function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.products || []);
      } catch (error) {
        console.error(
          "Failed to load category product counts:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = categoryDetails.map((category) => {
    const count = products.filter(
      (product) => product.category === category.name
    ).length;

    return {
      ...category,
      items: count,
    };
  });

  return (
    <section className="w-full bg-[#FCFAF4] py-10 sm:py-12 lg:py-14">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#6B9F45] sm:text-xs">
            Explore Our
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#183126] sm:text-4xl lg:text-[46px]">
            Popular Categories
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#66736B] sm:text-base">
            Find your favorite healthy meals from our wide range
            of delicious categories.
          </p>
        </div>

        {/* Category Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={{
                ...category,
                items: loading ? 0 : category.items,
              }}
            />
          ))}
        </div>

        {/* View All */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#174D32] transition hover:text-[#6B9F45]"
          >
            View All Categories

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Categories;