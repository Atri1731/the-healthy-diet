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
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { token } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit state
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete state
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchCustomers = useCallback(async () => {
    if (!token) {
      setError("Please log in with your admin account.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get("/auth/customers", {
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

  // ================= EDIT =================

  const openEditModal = (customer) => {
    setEditingCustomer(customer);

    setEditForm({
      name: customer.name || "",
      email: customer.email || "",
    });

    setEditError("");
  };

  const closeEditModal = () => {
    if (editLoading) return;

    setEditingCustomer(null);
    setEditError("");
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdateCustomer = async (event) => {
    event.preventDefault();

    const name = editForm.name.trim();
    const email = editForm.email.trim().toLowerCase();

    if (!name || !email) {
      setEditError("Name and email are required.");
      return;
    }

    if (name.length < 2) {
      setEditError("Name must contain at least 2 characters.");
      return;
    }

    try {
      setEditLoading(true);
      setEditError("");

      const response = await api.put(
        `/auth/customers/${editingCustomer._id}`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCustomer = response.data.customer;

      setCustomers((previousCustomers) =>
        previousCustomers.map((customer) =>
          customer._id === editingCustomer._id
            ? {
                ...customer,
                ...updatedCustomer,
              }
            : customer
        )
      );

      closeEditModal();
    } catch (err) {
      setEditError(
        err.response?.data?.message ||
          "Unable to update customer. Please try again."
      );
    } finally {
      setEditLoading(false);
    }
  };

  // ================= DELETE =================

  const openDeleteModal = (customer) => {
    setDeletingCustomer(customer);
    setDeleteError("");
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;

    setDeletingCustomer(null);
    setDeleteError("");
  };

  const handleDeleteCustomer = async () => {
    if (!deletingCustomer) return;

    try {
      setDeleteLoading(true);
      setDeleteError("");

      await api.delete(
        `/auth/customers/${deletingCustomer._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers((previousCustomers) =>
        previousCustomers.filter(
          (customer) => customer._id !== deletingCustomer._id
        )
      );

      closeDeleteModal();
    } catch (err) {
      setDeleteError(
        err.response?.data?.message ||
          "Unable to remove customer. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-7 text-[#183126]">
      {/* Back */}
      <Link
        to="/admin/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#47775B] transition hover:text-[#174D32]"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      {/* Header */}
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
              View and manage registered customers.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchCustomers}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E5E9DD] bg-white px-4 py-3 text-sm font-semibold transition hover:bg-[#F0F4E9] disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </header>

      {/* Stats */}
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

      {/* Customer Table */}
      <section className="overflow-hidden rounded-2xl border border-[#E5E9DD] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#E5E9DD] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Registered Customers</h2>

            <p className="mt-1 text-sm text-[#66736B]">
              Edit or remove customer accounts.
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

        {/* Error */}
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

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center gap-3 p-12 text-center">
            <RefreshCw
              size={25}
              className="animate-spin text-[#6B9F45]"
            />

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
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-[#F7F8F2] text-xs uppercase tracking-wider text-[#66736B]">
                <tr>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Email Address</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Registered</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="border-t border-[#E5E9DD] transition hover:bg-[#FCFAF4]"
                  >
                    {/* Customer */}
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

                    {/* Email */}
                    <td className="px-5 py-4 text-[#66736B]">
                      <div className="flex items-center gap-2">
                        <Mail size={15} />
                        {customer.email || "—"}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                        {customer.role || "user"}
                      </span>
                    </td>

                    {/* Registered */}
                    <td className="px-5 py-4 text-[#66736B]">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {formatDate(customer.createdAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(customer)}
                          title="Edit customer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE5D4] bg-white text-[#47775B] transition hover:bg-[#E7EFDC] hover:text-[#174D32]"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openDeleteModal(customer)}
                          title="Remove customer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 transition hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
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

      {/* ================= EDIT MODAL ================= */}

      {editingCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E9DD] p-5">
              <div>
                <h2 className="text-lg font-bold text-[#183126]">
                  Edit Customer
                </h2>

                <p className="mt-1 text-sm text-[#66736B]">
                  Update customer information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={editLoading}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="space-y-5 p-5">
              {editError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {editError}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#183126]">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  disabled={editLoading}
                  className="w-full rounded-xl border border-[#E5E9DD] px-4 py-3 text-sm outline-none transition focus:border-[#6B9F45] focus:ring-2 focus:ring-[#6B9F45]/15 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#183126]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  disabled={editLoading}
                  className="w-full rounded-xl border border-[#E5E9DD] px-4 py-3 text-sm outline-none transition focus:border-[#6B9F45] focus:ring-2 focus:ring-[#6B9F45]/15 disabled:bg-gray-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={editLoading}
                  className="rounded-xl border border-[#E5E9DD] px-5 py-3 text-sm font-semibold text-[#66736B] transition hover:bg-[#F7F8F2] disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="rounded-xl bg-[#174D32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123D28] disabled:opacity-60"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}

      {deletingCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="p-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 size={25} />
              </div>

              <div className="mt-5 text-center">
                <h2 className="text-xl font-bold text-[#183126]">
                  Remove Customer?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#66736B]">
                  Are you sure you want to remove{" "}
                  <span className="font-semibold text-[#183126]">
                    {deletingCustomer.name}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>

              {deleteError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {deleteError}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleteLoading}
                  className="flex-1 rounded-xl border border-[#E5E9DD] px-5 py-3 text-sm font-semibold text-[#66736B] transition hover:bg-[#F7F8F2] disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteCustomer}
                  disabled={deleteLoading}
                  className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                  {deleteLoading ? "Removing..." : "Remove Customer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}