
import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  ShieldCheck,
  Camera,
  Save,
  LockKeyhole,
  Leaf,
  Pencil,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function AdminProfile() {
  const { user } = useAuth();

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);

  // Current form values
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  // Last successfully saved values
  const [originalForm, setOriginalForm] = useState({
    name: "",
    email: "",
  });

  // Loading and message states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // Fetch profile details from the backend
  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("healthyDietToken");

        if (!token) {
          throw new Error(
            "Please log in again to view your profile."
          );
        }

        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (cancelled) return;

        const profile = response.data.user;

        const profileData = {
          name: profile.name || "",
          email: profile.email || "",
        };

        setForm(profileData);
        setOriginalForm(profileData);
      } catch (error) {
        if (!cancelled) {
          setMessage({
            type: "error",
            text:
              error.response?.data?.message ||
              error.message ||
              "Unable to load your profile.",
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  // Enable editing
  const handleEdit = () => {
    setMessage({
      type: "",
      text: "",
    });

    setIsEditing(true);
  };

  // Cancel editing and restore saved values
  const handleCancel = () => {
    setForm({ ...originalForm });

    setIsEditing(false);

    setMessage({
      type: "",
      text: "",
    });
  };

  // Save profile changes to the backend
  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setMessage({
        type: "error",
        text: "Please enter your name and email address.",
      });

      return;
    }

    setSaving(true);

    setMessage({
      type: "",
      text: "",
    });

    try {
      const token = localStorage.getItem("healthyDietToken");

      if (!token) {
        throw new Error(
          "Please log in again to save your profile."
        );
      }

      const response = await api.patch(
        "/profile",
        {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      const updatedProfile = {
        name: updatedUser.name || "",
        email: updatedUser.email || "",
      };

      // Update the form with the saved values
      setForm(updatedProfile);
      setOriginalForm(updatedProfile);

      // Update the cached user details
      localStorage.setItem(
        "healthyDietUser",
        JSON.stringify(updatedUser)
      );

      // Show success message
      setMessage({
        type: "success",
        text:
          response.data.message ||
          "Profile updated successfully!",
      });

      // Exit edit mode only after a successful save
      setIsEditing(false);
    } catch (error) {
      // Keep edit mode open if saving fails
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to update your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Generate initials for the profile avatar
  const initials =
    form.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";

  return (
    <div className="min-h-screen bg-gray-50/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-7">

        {/* Page heading */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <Leaf size={17} />
            The Healthy Diet
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your administrator account and personal information.
          </p>
        </div>

        {/* Profile banner */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-emerald-800 via-emerald-600 to-green-400 sm:h-40" />

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end">

              {/* Profile avatar */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-emerald-50 text-3xl font-bold text-emerald-800 shadow-md sm:h-28 sm:w-28">
                {initials}
{/* 
                <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white">
                  <Camera size={15} />
                </span> */}
              </div>

              {/* Profile name and email */}
              <div className="flex-1 pb-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {form.name || "Administrator"}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {form.email || "Admin account"}
                </p>
              </div>

              {/* Role badge */}
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold capitalize text-emerald-700">
                <ShieldCheck size={17} />
                {user?.role || "Administrator"}
              </span>
            </div>
          </div>
        </div>

        {/* Account information */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Personal information form */}
          <div className="space-y-4 lg:col-span-2">
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
            >
              {/* Form heading and buttons */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update the details displayed on your profile.
                  </p>
                </div>

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Pencil size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {loading ? (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-5 text-sm text-emerald-800">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700" />
                  Loading your profile...
                </div>
              ) : (
                <>
                  <div className="space-y-5">

                    {/* Full name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Full name
                      </label>

                      <div className="relative">
                        <UserRound
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          required
                          maxLength={80}
                          autoComplete="name"
                          className={`w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 ${
                            isEditing
                              ? "bg-white"
                              : "cursor-default bg-gray-50"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Email address
                      </label>

                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          required
                          autoComplete="email"
                          className={`w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 ${
                            isEditing
                              ? "bg-white"
                              : "cursor-default bg-gray-50"
                          }`}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Success and error messages */}
                  {message.text && (
                    <div
                      role={
                        message.type === "success"
                          ? "status"
                          : "alert"
                      }
                      className={`mt-5 rounded-xl border p-3 text-sm ${
                        message.type === "success"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  {/* Save button only appears in edit mode */}
                  {isEditing && (
                    <div className="mt-7 flex justify-end border-t border-gray-100 pt-5">
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Save size={17} />
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>

          {/* Account summary */}
          <div className="space-y-4">

            {/* Account overview card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-gray-900">
                Account Overview
              </h3>

              <div className="mt-5 space-y-4">

                {/* Account role */}
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Account role
                    </p>

                    <p className="mt-1 text-xs capitalize text-gray-500">
                      {user?.role || "Administrator"}
                    </p>
                  </div>
                </div>

                {/* Account security */}
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
                    <LockKeyhole size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Account security
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Protected account access
                    </p>
                  </div>
                </div>

                {/* Workspace */}
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-green-50 p-2.5 text-green-700">
                    <Leaf size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Workspace
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      The Healthy Diet
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Healthy Diet promotional card */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-600 p-5 text-white shadow-sm">
              <Leaf size={25} />

              <h3 className="mt-4 text-lg font-bold">
                Eat well. Live well.
              </h3>

              <p className="mt-2 text-sm leading-6 text-emerald-50">
                Manage your healthy food business from one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}