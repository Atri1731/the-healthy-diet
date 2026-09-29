import {ArrowRight, Eye, EyeOff, Leaf, Lock, Mail, User} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import api from "../services/api";
import Footer from "../components/Footer";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRole === "admin") {
  setError(
    "Admin accounts must be created by the website owner. Please register as a customer or contact the owner."
  );
  return;
}

    setError("");
    setSuccess("");

    const {name, email, password, confirmPassword} = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (response.data.success) {
        setSuccess("Account created successfully! Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#FCFAF4]">
      

      <main className="flex w-full items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[30px] border border-[#E5E1D5] bg-white shadow-[0_20px_60px_rgba(24,49,38,0.08)] lg:grid-cols-2">
          {/* ================= LEFT SIDE ================= */}
          <div className="relative hidden overflow-hidden bg-[#174D32] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6B9F45]/20" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#6B9F45]/10" />

            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Leaf size={28} />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#BFD5A8]">
                Welcome
              </p>

              <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                Start Your Healthy Journey
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                Create your account and discover delicious meals made for a
                healthier lifestyle.
              </p>
            </div>

            <div className="relative z-10">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold">
                  "Good food · Better you"
                </p>

                <p className="mt-2 text-xs leading-5 text-white/60">
                  Fresh ingredients, balanced meals and healthy choices made
                  simple.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Mobile Logo */}
            <div className="flex justify-center lg:hidden">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E7EFDC]">
                <Leaf size={28} className="text-[#174D32]" />
              </div>
            </div>

            {/* Heading */}
            <div className="mt-6 text-center lg:mt-0 lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B9F45]">
                Create Account
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#183126]">
                Join The Healthy Diet
              </h2>

              <p className="mt-2 text-sm text-[#66736B]">
                Create your account to get started.
              </p>
            </div>

            
{/* Select Account Role */}
<div className="mt-6">
  <label className="mb-3 block text-sm font-semibold text-[#183126]">
    Create Account As
  </label>

  <div className="grid grid-cols-2 gap-3">
    <button
      type="button"
      onClick={() => {
        setSelectedRole("user");
        setError("");
      }}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        selectedRole === "user"
          ? "border-[#174D32] bg-[#E7EFDC] text-[#174D32]"
          : "border-[#E5E1D5] bg-white text-[#66736B]"
      }`}
    >
      Customer
    </button>

    <button
      type="button"
      onClick={() => {
        setSelectedRole("admin");
        setError("");
      }}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        selectedRole === "admin"
          ? "border-[#174D32] bg-[#E7EFDC] text-[#174D32]"
          : "border-[#E5E1D5] bg-white text-[#66736B]"
      }`}
    >
      Admin
    </button>
  </div>

  {selectedRole === "admin" && (
    <p className="mt-2 text-xs leading-5 text-[#66736B]">
      Administrator accounts must be created or authorized by the website owner.
    </p>
  )}
</div>

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"
              >
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

{/* Name */}
<div>
  <label
    htmlFor="name"
    className="mb-2 block text-sm font-semibold text-[#183126]"
  >
    Full Name
  </label>

  <div className="relative">
    <User
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66736B]"
    />

    <input
      id="name"
      name="name"
      type="text"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your full name"
      minLength={2}
      required
      className="w-full rounded-xl border border-[#E5E1D5] bg-[#FCFAF4] py-3.5 pl-11 pr-4 text-sm text-[#183126] outline-none transition placeholder:text-[#9AA49E] focus:border-[#6B9F45] focus:ring-2 focus:ring-[#6B9F45]/10"
    />
  </div>
</div>


              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#183126]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66736B]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#E5E1D5]
                      bg-[#FCFAF4]
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      text-[#183126]
                      outline-none
                      transition
                      placeholder:text-[#9AA49E]
                      focus:border-[#6B9F45]
                      focus:ring-2
                      focus:ring-[#6B9F45]/10
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#183126]"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66736B]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#E5E1D5]
                      bg-[#FCFAF4]
                      py-3.5
                      pl-11
                      pr-12
                      text-sm
                      text-[#183126]
                      outline-none
                      transition
                      placeholder:text-[#9AA49E]
                      focus:border-[#6B9F45]
                      focus:ring-2
                      focus:ring-[#6B9F45]/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66736B] hover:text-[#174D32]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#183126]"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#66736B]"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#E5E1D5]
                      bg-[#FCFAF4]
                      py-3.5
                      pl-11
                      pr-12
                      text-sm
                      text-[#183126]
                      outline-none
                      transition
                      placeholder:text-[#9AA49E]
                      focus:border-[#6B9F45]
                      focus:ring-2
                      focus:ring-[#6B9F45]/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66736B] hover:text-[#174D32]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 accent-[#174D32]"
                />

                <span className="text-xs leading-5 text-[#66736B]">
                  I agree to the Terms & Conditions and Privacy Policy.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
    flex w-full items-center justify-center gap-2
    rounded-full bg-[#174D32] px-5 py-3.5
    text-sm font-semibold text-white transition
    hover:bg-[#0D3522] active:scale-[0.99]
    disabled:cursor-not-allowed disabled:opacity-60
  "
              >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-[#66736B]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#174D32] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Register;
