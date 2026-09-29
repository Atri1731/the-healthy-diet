
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Leaf,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Customers",
    path: "/admin/users",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="z-50 w-full shrink-0 border-b border-[#E5E9DD] bg-white md:sticky md:top-0 md:h-screen md:w-64 md:overflow-y-auto md:border-b-0 md:border-r">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:px-5 md:pb-6 md:pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#174D32] text-white">
            <Leaf size={24} />
          </div>

          <div>
            <h2 className="font-bold text-[#183126]">
              The Healthy Diet
            </h2>
            <p className="text-xs text-[#6B9F45]">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E9DD] text-[#174D32] transition hover:bg-[#F0F4E9] md:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Navigation */}
      <div
        className={`${menuOpen ? "block" : "hidden"} px-4 pb-4 md:block md:px-4 md:pb-5`}
      >
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
          Management
        </p>

        <nav className="flex flex-col gap-2">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin/dashboard"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#174D32] text-white shadow-sm"
                    : "text-[#66736B] hover:bg-[#F0F4E9] hover:text-[#174D32]"
                }`
              }
            >
              <Icon size={19} />
              {name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-5 border-t border-[#E5E9DD] pt-4 md:mt-8">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#66736B] transition hover:bg-[#F0F4E9] hover:text-[#174D32]"
          >
            <ArrowLeft size={18} />
            Back to Website
          </NavLink>
        </div>
      </div>
    </aside>
  );
}