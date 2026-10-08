import api from "../services/api";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();
  const { login } = useAuth();

const location = useLocation();
const { addToCart } = useCart();

const redirectTo = location.state?.redirectTo || "/";
const pendingCartItem = location.state?.addToCart;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
  }));

  setError("");
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email.trim() || !formData.password) {
    setError("Please enter your email and password.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await api.post("/auth/login", {
      email: formData.email.trim(),
      password: formData.password,
    });

    if (!response.data?.success) {
      setError(response.data?.message || "Unable to login.");
      return;
    }

    const { token, user } = response.data;

    if (!token || !user) {
      setError("Invalid login response. Please try again.");
      return;
    }

    // Verify that the selected role matches the account.
    if (user.role !== selectedRole) {
      setError(
        `This account is not registered as ${
          selectedRole === "admin" ? "an admin" : "a customer"
        }. Please select the correct role.`
      );
      return;
    }

    // Save the authenticated user and token.
   login(user, token);

if (user.role === "admin") {
  navigate("/admin", { replace: true });
} else {
  if (pendingCartItem) {
    addToCart(pendingCartItem);
  }

  navigate(redirectTo, { replace: true });
}
  } catch (error) {
    console.error("Login error:", error);

    setError(
      error.response?.data?.message ||
        "Unable to login. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#FCFAF4]">
      

      <main className="flex w-full items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[30px] border border-[#E5E1D5] bg-white shadow-[0_20px_60px_rgba(24,49,38,0.08)] lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative hidden overflow-hidden bg-[#174D32] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6B9F45]/20" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#6B9F45]/10" />

            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Leaf size={28} />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#BFD5A8]">
                Welcome Back
              </p>

              <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                Good To See You Again
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                Login to continue exploring delicious meals and making
                healthier choices every day.
              </p>
            </div>

            <div className="relative z-10">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold">
                  "Good food · Better you"
                </p>

                <p className="mt-2 text-xs leading-5 text-white/60">
                  Your healthy food journey continues here.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">

            {/* Mobile Logo */}
            <div className="flex justify-center lg:hidden">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E7EFDC]">
                <Leaf
                  size={28}
                  className="text-[#174D32]"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="mt-6 text-center lg:mt-0 lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B9F45]">
                Welcome Back
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#183126]">
                Login To Your Account
              </h2>

              <p className="mt-2 text-sm text-[#66736B]">
                Enter your details to continue.
              </p>
            </div>

{/* Select Login Role */}
<div className="mt-6">
  <label className="mb-3 block text-sm font-semibold text-[#183126]">
    Login As
  </label>

  <div className="grid grid-cols-2 gap-3">
    <button
      type="button"
      onClick={() => setSelectedRole("user")}
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
      onClick={() => setSelectedRole("admin")}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        selectedRole === "admin"
          ? "border-[#174D32] bg-[#E7EFDC] text-[#174D32]"
          : "border-[#E5E1D5] bg-white text-[#66736B]"
      }`}
    >
      Admin
    </button>
  </div>
</div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
               >

              {error && (
  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
    {error}
  </div>
)}
           

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
                    required
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
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#183126]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#6B9F45] hover:text-[#174D32]"
                  >
                    Forgot Password?
                  </Link>
                </div>

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
                    placeholder="Enter your password"
                    required
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
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66736B] hover:text-[#174D32]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#174D32]"
                />

                <span className="text-xs text-[#66736B]">
                  Remember me
                </span>
              </label>

              {/* Login Button */}
           <button
  type="submit"
  disabled={loading}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-full
    bg-[#174D32]
    px-5
    py-3.5
    text-sm
    font-semibold
    text-white
    transition
    hover:bg-[#0D3522]
    active:scale-[0.99]
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {loading ? "Logging in..." : "Login"}

  {!loading && <ArrowRight size={17} />}
</button>

<div className="relative my-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-[#E5E1D5]" />
  </div>

  <div className="relative flex justify-center">
    <span className="bg-white px-4 text-xs font-medium text-[#66736B]">
      OR
    </span>
  </div>
</div>

{selectedRole === "user" && (
  <div className="flex justify-center">
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          setLoading(true);
          setError("");

          const response = await api.post("/auth/google", {
            credential: credentialResponse.credential,
          });

          if (!response.data?.success) {
            setError(
              response.data?.message ||
                "Unable to login with Google."
            );
            return;
          }

          const { token, user } = response.data;

          if (!token || !user) {
            setError(
              "Invalid Google login response."
            );
            return;
          }

          login(user, token);

          if (user.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.error(
            "Google login error:",
            error
          );

          setError(
            error.response?.data?.message ||
              "Unable to login with Google."
          );
        } finally {
          setLoading(false);
        }
      }}
      onError={() => {
        setError("Google login failed. Please try again.");
      }}
      useOneTap={false}
      theme="outline"
      size="large"
      text="continue_with"
      shape="rectangular"
      
    />
  </div>
)}

            </form>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-[#66736B]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-[#174D32] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;