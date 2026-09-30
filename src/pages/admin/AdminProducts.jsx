
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  Package,
  Search,
  LoaderCircle,
  Leaf,
} from "lucide-react";
import api from "../../services/api";


const emptyForm = {
  name: "",
  category: "Salads",
  description: "",
  rating: 4.5,
  calories: 0,
  price: "",
  image: "",
  isAvailable: true,
  ingredients: "",
  protein: "",
  carbohydrates: "",
  fat: "",
  fiber: "",
};

const categories = [
  "Salads",
  "Healthy Meals",
  "Soups",
  "Smoothies",
  "Healthy Desserts",
];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("healthyDietToken")}`,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products/admin/all", {
        headers: getHeaders(),
      });

      setProducts(response.data.products || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load products. Please check your login and backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(true);
    setError("");
    setMessage("");
  };



const openEditForm = (product) => {
  setForm({
    name: product.name || "",
    category: product.category || "Salads",
    description: product.description || "",
    rating: product.rating ?? 4.5,
    calories: product.calories ?? 0,
    price: product.price ?? "",
    image: product.image || "",
    isAvailable: product.isAvailable ?? true,

    ingredients: Array.isArray(product.ingredients)
      ? product.ingredients.join(", ")
      : "",

    protein: product.nutrition?.protein ?? "",
    carbohydrates: product.nutrition?.carbohydrates ?? "",
    fat: product.nutrition?.fat ?? "",
    fiber: product.nutrition?.fiber ?? "",
  });

  setEditingId(product._id);
  setShowForm(true);
  setError("");
  setMessage("");
};
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? value === ""
              ? ""
              : Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
   
const {
  protein,
  carbohydrates,
  fat,
  fiber,
  ...productFields
} = form;

const payload = {
  ...productFields,
  name: form.name.trim(),
  description: form.description.trim(),
  price: Number(form.price),
  calories: Number(form.calories),
  rating: Number(form.rating),

  ingredients: form.ingredients
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter(Boolean),

  nutrition: {
    protein: protein === "" ? null : Number(protein),
    carbohydrates:
      carbohydrates === "" ? null : Number(carbohydrates),
    fat: fat === "" ? null : Number(fat),
    fiber: fiber === "" ? null : Number(fiber),
  },
};

      if (editingId) {
        await api.patch(`/products/${editingId}`, payload, {
          headers: getHeaders(),
        });
        setMessage("Product updated successfully!");
      } else {
        await api.post("/products", payload, {
          headers: getHeaders(),
        });
        setMessage("Product added successfully!");
      }

      setShowForm(false);
      setEditingId(null);
      setForm({ ...emptyForm });

      await fetchProducts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not save the product. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await api.delete(`/products/${product._id}`, {
        headers: getHeaders(),
      });

      setProducts((previous) =>
        previous.filter((item) => item._id !== product._id)
      );

      setMessage("Product deleted successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not delete the product."
      );
    }
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <main className="min-h-screen bg-[#FCFAF4] p-5 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#174D32] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-[#E7EFDC] p-3">
                <Leaf className="text-[#174D32]" size={25} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#6B9F45]">
                Healthy Diet Admin
              </span>
            </div>

            <h1 className="font-serif text-3xl font-bold text-[#183126] sm:text-4xl">
              Product Management
            </h1>

            <p className="mt-2 text-sm text-[#66736B]">
              Add, update, and manage your healthy food menu.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174D32] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#103C26]"
          >
            <Plus size={19} />
            Add Product
          </button>
        </header>

        {message && (
          <div className="mb-5 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
            <p className="text-sm text-[#66736B]">Total Products</p>
            <h2 className="mt-2 text-3xl font-bold text-[#183126]">
              {products.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
            <p className="text-sm text-[#66736B]">Available</p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">
              {products.filter((p) => p.isAvailable).length}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#EAE5D9] bg-white p-5">
            <p className="text-sm text-[#66736B]">Unavailable</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {products.filter((p) => !p.isAvailable).length}
            </h2>
          </div>
        </section>

        {showForm && (
          <section className="mb-8 rounded-2xl border border-[#EAE5D9] bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#183126]">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="mt-1 text-sm text-[#66736B]">
                  Enter the product details below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close product form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Product Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Fresh Garden Salad"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-600"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Describe the food and its ingredients..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={form.calories}
                    onChange={handleChange}
                    min="0"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Rating (0–5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                
<div className="sm:col-span-2">
  <label
    htmlFor="product-image"
    className="mb-2 block text-sm font-semibold text-gray-700"
  >
    Product Image URL
  </label>

  <input
    id="product-image"
    type="url"
    name="image"
    value={form.image}
    onChange={handleChange}
    placeholder="https://example.com/healthy-meal.jpg"
    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600"
  />

  <p className="mt-2 text-xs text-gray-500">
    Paste a publicly accessible image URL for your food product.
  </p>

  {form.image.trim() && (
    <div className="mt-4">
      <p className="mb-2 text-sm font-medium text-gray-700">
        Image preview
      </p>
      <img
        src={form.image}
        alt="Product preview"
        className="h-32 w-32 rounded-xl border border-gray-200 object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        onLoad={(e) => {
          e.currentTarget.style.display = "block";
        }}
      />
    </div>
  )}
</div>
              </div>

              {/* Ingredients */}
              <div className="rounded-2xl border border-[#E5E1D5] bg-[#FCFAF4] p-5 sm:p-6">
  <div className="mb-4 flex items-center gap-3">
    <div className="rounded-xl bg-[#E7EFDC] p-3">
      <Leaf size={22} className="text-[#174D32]" />
    </div>

    <div>
      <h3 className="font-bold text-[#183126]">
        Meal Ingredients
      </h3>
      <p className="text-sm text-[#66736B]">
        Separate each ingredient with a comma.
      </p>
    </div>
  </div>

  <textarea
    name="ingredients"
    value={form.ingredients}
    onChange={handleChange}
    rows={3}
    placeholder="Spinach, quinoa, avocado, cherry tomatoes"
    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-600"
  />
</div>

{/* Nutrition Facts */}
<div className="rounded-2xl border border-[#E5E1D5] bg-[#FCFAF4] p-5 sm:p-6">
  <h3 className="font-bold text-[#183126]">
    Nutrition Facts
  </h3>

  <p className="mt-1 text-sm text-[#66736B]">
    Enter verified values per serving in grams.
    Leave unknown values blank.
  </p>

  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
    {[
      { name: "protein", label: "Protein (g)" },
      { name: "carbohydrates", label: "Carbohydrates (g)" },
      { name: "fat", label: "Fat (g)" },
      { name: "fiber", label: "Fiber (g)" },
    ].map((item) => (
      <div key={item.name}>
        <label
          htmlFor={`nutrition-${item.name}`}
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          {item.label}
        </label>

        <input
          id={`nutrition-${item.name}`}
          type="number"
          name={item.name}
          value={form[item.name]}
          onChange={handleChange}
          min="0"
          step="0.1"
          placeholder="e.g. 12"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-600"
        />
      </div>
    ))}
  </div>
</div>
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={form.isAvailable}
                  onChange={handleChange}
                  className="h-4 w-4 accent-green-700"
                />
                Available for customers to order
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#174D32] px-6 py-3 font-semibold text-white hover:bg-[#103C26] disabled:opacity-60"
                >
                  {saving && (
                    <LoaderCircle className="animate-spin" size={18} />
                  )}
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                  className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#183126]">
                Your Products
              </h2>
              <p className="mt-1 text-sm text-[#66736B]">
                Manage your menu items and availability.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-600"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 p-12 text-gray-500">
              <LoaderCircle className="animate-spin" size={22} />
              Loading products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="mx-auto mb-3 text-gray-300" size={40} />
              <h3 className="font-semibold text-gray-800">
                No products found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Add a product or try another search.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Availability</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-12 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                              <Package
                                size={22}
                                className="text-green-700"
                              />
                            </div>
                          )}

                          <div className="max-w-xs">
                            <p className="font-semibold text-gray-900">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {product.calories} kcal
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {product.category}
                      </td>

                      <td className="px-5 py-4 font-semibold text-gray-900">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.isAvailable
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {product.isAvailable
                            ? "Available"
                            : "Unavailable"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditForm(product)}
                            aria-label={`Edit ${product.name}`}
                            className="rounded-lg bg-blue-50 p-2.5 text-blue-700 hover:bg-blue-100"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() => handleDelete(product)}
                            aria-label={`Delete ${product.name}`}
                            className="rounded-lg bg-red-50 p-2.5 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}