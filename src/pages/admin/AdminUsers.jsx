
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Search,
  RefreshCw,
  Mail,
  CalendarDays,
  UserRound,
} from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { token } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = useCallback(async () => {
    if (!token) {
      setError("Please log in with your admin account.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(response.data.customers || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load customers. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = customers.filter((customer) => {
    const query = search.trim().toLowerCase();

    return (
      (customer.name || "").toLowerCase().includes(query) ||
      (customer.email || "").toLowerCase().includes(query)
    );
  });

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-7 text-[#183126]">
      <Link
        to="/admin/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#47775B] transition hover:text-[#174D32]"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E7EFDC] text-[#174D32]">
            <Users size={27} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B9F45]">
              Healthy Diet Admin
            </p>

            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Customer Management
            </h1>

            <p className="mt-1 text-sm text-[#66736B]">
              View registered customers and their details.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchCustomers}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E5E9DD] bg-white px-4 py-3 text-sm font-semibold transition hover:bg-[#F0F4E9] disabled:opacity-60"
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#E5E9DD] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#66736B]">
              Total Customers
            </p>

            <div className="rounded-xl bg-purple-50 p-3 text-purple-700">
              <Users size={21} />
            </div>
          </div>

          <p className="mt-4 text-3xl font-bold">
            {loading ? "—" : customers.length}
          </p>

          <p className="mt-1 text-xs text-[#66736B]">
            Registered customer accounts
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5E9DD] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#66736B]">
              Search Results
            </p>

            <div className="rounded-xl bg-green-50 p-3 text-green-700">
              <Search size={21} />
            </div>
          </div>

          <p className="mt-4 text-3xl font-bold">
            {loading ? "—" : filteredCustomers.length}
          </p>

          <p className="mt-1 text-xs text-[#66736B]">
            Customers matching your search
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E5E9DD] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#E5E9DD] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Registered Customers</h2>
            <p className="mt-1 text-sm text-[#66736B]">
              Customer information from your database.
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-[#E5E9DD] bg-[#FCFAF4] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#6B9F45] focus:ring-2 focus:ring-[#6B9F45]/15"
            />
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
            <button
              type="button"
              onClick={fetchCustomers}
              className="ml-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center gap-3 p-12 text-center">
            <RefreshCw size={25} className="animate-spin text-[#6B9F45]" />
            <p className="text-sm text-[#66736B]">
              Loading registered customers...
            </p>
          </div>
        ) : !error && filteredCustomers.length === 0 ? (
          <div className="flex flex-col items-center p-12 text-center">
            <div className="rounded-full bg-[#F0F4E9] p-4 text-[#47775B]">
              <UserRound size={28} />
            </div>

            <h3 className="mt-4 font-semibold">
              {customers.length === 0
                ? "No customers registered yet"
                : "No matching customers"}
            </h3>

            <p className="mt-2 max-w-sm text-sm text-[#66736B]">
              {customers.length === 0
                ? "Registered customer accounts will appear here."
                : "Try searching with a different name or email."}
            </p>
          </div>
        ) : !error ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#F7F8F2] text-xs uppercase tracking-wider text-[#66736B]">
                <tr>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Email Address</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Registered</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="border-t border-[#E5E9DD] transition hover:bg-[#FCFAF4]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7EFDC] font-bold text-[#174D32]">
                          {(customer.name || "U")
                            .trim()
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span className="font-semibold text-[#183126]">
                          {customer.name || "Unnamed customer"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-[#66736B]">
                      <div className="flex items-center gap-2">
                        <Mail size={15} />
                        {customer.email || "—"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                        {customer.role || "user"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-[#66736B]">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {formatDate(customer.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && customers.length > 0 && (
          <div className="border-t border-[#E5E9DD] px-5 py-4 text-xs text-[#66736B]">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
        )}
      </section>
    </div>
  );
}