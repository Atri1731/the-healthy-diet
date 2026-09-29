
import { useNavigate } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/menu?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`View ${category.name} products`}
      className="
        group
        w-full
        overflow-hidden
        rounded-[20px]
        border
        border-[#E5E1D5]
        bg-white
        text-left
        shadow-[0_4px_15px_rgba(24,49,38,0.04)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_30px_rgba(24,49,38,0.10)]
      "
    >
      {/* Image */}
      <div className="relative aspect-[1.15/1] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="truncate text-sm font-bold text-[#183126] sm:text-base">
          {category.name}
        </h3>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-[#66736B]">
            {category.items} {category.items === 1 ? "Item" : "Items"}
          </p>

          <span className="text-xs font-semibold text-[#6B9F45] opacity-0 transition group-hover:opacity-100">
            →
          </span>
        </div>
      </div>
    </button>
  );
}

export default CategoryCard;