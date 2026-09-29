
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Leaf,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoriteContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites } = useFavorites();

  const favoriteCount = favorites.length;

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const links = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm transition ${
      isActive
        ? "font-semibold text-[#174D32]"
        : "text-[#46564D] hover:text-[#174D32]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `rounded-xl px-4 py-3 text-sm transition ${
      isActive
        ? "bg-[#E7EFDC] font-semibold text-[#174D32]"
        : "text-[#46564D] hover:bg-[#E7EFDC]"
    }`;

  // Compact navbar for Login and Register
  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-50 border-b border-[#E5E1D5] bg-[#FCFAF4]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFDC]">
              <Leaf size={25} className="text-[#174D32]" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-[#183126] sm:text-xl">
                The Healthy Diet
              </h1>
              <p className="mt-1 text-[8px] font-bold uppercase tracking-[2px] text-[#6B9F45]">
                Good Food · Better You
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#174D32] transition hover:bg-[#E7EFDC]"
          >
            <span className="inline-flex items-center gap-2">
              <Leaf size={16} />
              Home
            </span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E1D5] bg-[#FCFAF4]/95 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFDC]">
              <Leaf size={25} className="text-[#174D32]" />
            </div>

            <div>
              <h1 className="text-[18px] font-bold leading-none text-[#183126] sm:text-[20px]">
                The Healthy Diet
              </h1>
              <p className="mt-1 text-[7px] font-bold uppercase tracking-[2px] text-[#6B9F45] sm:text-[8px]">
                Good Food · Better You
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={navLinkClass}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#6B9F45]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#46564D] transition hover:bg-[#E7EFDC] hover:text-[#174D32]"
            >
              <Search size={19} />
            </button>

            {/* Favorites: authenticated users only */}
            {isAuthenticated && (
              <Link
                to="/favorites"
                aria-label={`Favorites with ${favoriteCount} saved meals`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#46564D] transition hover:bg-[#E7EFDC] hover:text-[#174D32]"
              >
                <Heart
                  size={20}
                  className={
                    favoriteCount > 0
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />

                {favoriteCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                    {favoriteCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart: authenticated users only */}
            {isAuthenticated && (
              <Link
                to="/cart"
                aria-label={`Shopping cart with ${cartCount} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#46564D] transition hover:bg-[#E7EFDC] hover:text-[#174D32]"
              >
                <ShoppingCart size={20} />

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6B9F45] px-1 text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Authentication Actions */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="rounded-full bg-[#E7EFDC] px-4 py-2 text-sm font-semibold text-[#174D32] transition hover:bg-[#D8E7C9]"
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  to="/orders"
                  className="text-sm font-medium text-[#46564D] transition hover:text-[#174D32]"
                >
                  Orders
                </Link>

                <Link
                  to="/profile"
                  aria-label="My Profile"
                  className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-[#E7EFDC]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7EFDC] font-semibold text-[#174D32]">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <span className="text-sm font-medium text-[#183126]">
                    {user?.name || "User"}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="text-sm font-medium text-red-600 transition hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-[#46564D] transition hover:text-[#174D32]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-[#174D32] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0D3522]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#174D32] transition hover:bg-[#E7EFDC] md:hidden"
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t border-[#E5E1D5] py-5 md:hidden">
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass}
                >
                  {link.name}
                </NavLink>
              ))}

              {isAuthenticated && (
                <NavLink
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass}
                >
                  My Orders
                </NavLink>
              )}

              {isAuthenticated && (
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass}
                >
                  My Profile
                </NavLink>
              )}
            </nav>

            {/* Mobile Favorites: authenticated users only */}
            {isAuthenticated && (
              <Link
                to="/favorites"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-between rounded-xl border border-[#E5E1D5] bg-white px-4 py-3 text-sm font-semibold text-[#174D32] transition hover:bg-[#E7EFDC]"
              >
                <span className="flex items-center gap-2">
                  <Heart
                    size={18}
                    className={
                      favoriteCount > 0
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />
                  Favorite Meals
                </span>

                {favoriteCount > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs text-white">
                    {favoriteCount}
                  </span>
                )}
              </Link>
            )}

            {/* Mobile Cart: authenticated users only */}
            {isAuthenticated && (
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-between rounded-xl bg-[#E7EFDC] px-4 py-3 text-sm font-semibold text-[#174D32] transition hover:bg-[#D8E7C9]"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Shopping Cart
                </span>

                {cartCount > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#174D32] px-1.5 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Mobile Authentication */}
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#E5E1D5] pt-4">
              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="rounded-full bg-[#E7EFDC] px-4 py-2.5 text-sm font-semibold text-[#174D32] transition hover:bg-[#D8E7C9]"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <div className="flex items-center gap-2 px-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7EFDC] font-semibold text-[#174D32]">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <span className="text-sm font-medium text-[#183126]">
                      Hi, {user?.name || "User"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="rounded-full px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-full px-4 py-2 text-sm font-medium text-[#183126] transition hover:bg-[#E7EFDC]"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-[#174D32] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0D3522]"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;