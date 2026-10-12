import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  X,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const STATUS_OPTIONS = ["new", "read", "replied"];

const statusStyles = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  read: "bg-amber-50 text-amber-700 border-amber-200",
  replied: "bg-green-50 text-green-700 border-green-200",
};

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminContactMessages() {
  const { token } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchContacts = useCallback(async () => {
    if (!token) {
      setError("Please log in with your admin account.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get("/contact/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(response.data.contacts || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return contacts;

    return contacts.filter((contact) => {
      return (
        contact.name?.toLowerCase().includes(query) ||
        contact.email?.toLowerCase().includes(query) ||
        contact.subject?.toLowerCase().includes(query) ||
        contact.message?.toLowerCase().includes(query)
      );
    });
  }, [contacts, search]);

  const stats = useMemo(() => {
    return {
      total: contacts.length,
      newMessages: contacts.filter(
        (contact) => contact.status === "new"
      ).length,
      read: contacts.filter(
        (contact) => contact.status === "read"
      ).length,
      replied: contacts.filter(
        (contact) => contact.status === "replied"
      ).length,
    };
  }, [contacts]);

  const updateStatus = async (contactId, status) => {
    try {
      setUpdatingId(contactId);

      await api.patch(
        `/contact/admin/${contactId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContacts((current) =>
        current.map((contact) =>
          contact._id === contactId
            ? { ...contact, status }
            : contact
        )
      );

      setSelectedContact((current) =>
        current?._id === contactId
          ? { ...current, status }
          : current
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to update message status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteMessage = async (contactId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/contact/admin/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((current) =>
        current.filter((contact) => contact._id !== contactId)
      );

      if (selectedContact?._id === contactId) {
        setSelectedContact(null);
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete this message."
      );
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
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7EFDC] text-[#174D32]">
            <MessageSquare size={27} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B9F45]">
              Healthy Diet Admin
            </p>

            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Contact Messages
            </h1>

            <p className="mt-1 text-sm text-[#66736B]">
              View and manage customer enquiries and feedback.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchContacts}
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
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#E5E9DD] bg-white p-5 shadow-sm">
          <p className="text-sm text-[#66736B]">Total Messages</p>
          <p className="mt-2 text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#66736B]">New</p>
          <p className="mt-2 text-3xl font-bold text-blue-700">
            {stats.newMessages}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#66736B]">Read</p>
          <p className="mt-2 text-3xl font-bold text-amber-700">
            {stats.read}
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-[#66736B]">Replied</p>
          <p className="mt-2 text-3xl font-bold text-green-700">
            {stats.replied}
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="rounded-2xl border border-[#E5E9DD] bg-white p-4 shadow-sm sm:p-5">
        <div className="relative">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A958D]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, subject or message..."
            className="w-full rounded-xl border border-[#E5E9DD] bg-[#FAFBF8] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#6B9F45] focus:ring-4 focus:ring-[#6B9F45]/10"
          />
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Messages */}
      <section className="overflow-hidden rounded-2xl border border-[#E5E9DD] bg-white shadow-sm">
        <div className="border-b border-[#EEF0EA] p-5 sm:p-6">
          <h2 className="text-xl font-bold">Customer Messages</h2>
          <p className="mt-1 text-sm text-[#66736B]">
            Showing {filteredContacts.length} of {contacts.length} messages
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw
              size={30}
              className="mx-auto mb-3 animate-spin text-[#174D32]"
            />
            <p className="font-semibold">Loading messages...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare
              size={42}
              className="mx-auto mb-3 text-gray-300"
            />

            <h3 className="text-lg font-bold">
              No contact messages found
            </h3>

            <p className="mt-2 text-sm text-[#66736B]">
              Customer messages will appear here when they submit
              the contact form.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#EEF0EA]">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className="p-5 transition hover:bg-[#FCFDF9] sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedContact(contact);

                      if (contact.status === "new") {
                        updateStatus(contact._id, "read");
                      }
                    }}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-bold">
                        {contact.subject}
                      </h3>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                          statusStyles[contact.status] ||
                          statusStyles.new
                        }`}
                      >
                        {contact.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#66736B]">
                      <span className="inline-flex items-center gap-2">
                        <UserRound size={15} />
                        {contact.name}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <Mail size={15} />
                        {contact.email}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <Clock size={15} />
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#66736B]">
                      {contact.message}
                    </p>
                  </button>

                  <div className="flex shrink-0 items-center gap-2">
                    <select
                      value={contact.status}
                      disabled={updatingId === contact._id}
                      onChange={(event) =>
                        updateStatus(
                          contact._id,
                          event.target.value
                        )
                      }
                      className="rounded-xl border border-[#E5E9DD] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#6B9F45]"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() +
                            status.slice(1)}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => deleteMessage(contact._id)}
                      aria-label="Delete message"
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Message modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#EAEDE5] p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B9F45]">
                  Contact Message
                </p>

                <h2 className="mt-2 break-words text-xl font-bold sm:text-2xl">
                  {selectedContact.subject}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#66736B] transition hover:bg-[#F0F3EC]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-[#F7F9F4] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#8A958D]">
                    Name
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedContact.name}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F7F9F4] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#8A958D]">
                    Email
                  </p>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="mt-1 block break-all font-semibold text-[#397447] hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-[#E5E9DD] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8A958D]">
                  Message
                </p>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#46564D]">
                  {selectedContact.message}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-[#8A958D]">
                    Received
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>

                <select
                  value={selectedContact.status}
                  disabled={updatingId === selectedContact._id}
                  onChange={(event) =>
                    updateStatus(
                      selectedContact._id,
                      event.target.value
                    )
                  }
                  className="rounded-xl border border-[#E5E9DD] bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#6B9F45]"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() +
                        status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#EEF0EA] pt-5">
                <button
                  type="button"
                  onClick={() => setSelectedContact(null)}
                  className="rounded-xl border border-[#E5E9DD] px-5 py-3 text-sm font-semibold text-[#46564D] transition hover:bg-[#F5F7F2]"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteMessage(selectedContact._id)
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <Trash2 size={17} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}