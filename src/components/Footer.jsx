import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-[#0D3522] text-white">
      {/* Main Footer */}
      <div className="w-full px-5 py-12 sm:px-8 sm:py-14 lg:px-12 xl:px-16 2xl:px-20">
        <div
          className="
            grid
            grid-cols-1
            gap-10

            sm:grid-cols-2

            lg:grid-cols-[1.5fr_0.8fr_0.9fr_1.2fr]
            lg:gap-12

            xl:gap-20
          "
        >
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFDC]">
                <span className="text-xl text-[#174D32]">🌿</span>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold">
                  The Healthy Diet
                </h2>

                <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[2px] text-[#8EB96A]">
                  Good Food · Better You
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
              Fresh, nutritious and delicious food made to support a healthier
              and happier lifestyle.
            </p>

            {/* Social */}
<div className="mt-6 flex gap-3">

  {/* Instagram */}
  <a
    href="#"
    aria-label="Instagram"
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      bg-white/10
      text-xs
      font-bold
      text-white
      transition
      hover:bg-[#6B9F45]
    "
  >
    IG
  </a>

  {/* Facebook */}
  <a
    href="#"
    aria-label="Facebook"
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      bg-white/10
      text-sm
      font-bold
      text-white
      transition
      hover:bg-[#6B9F45]
    "
  >
    f
  </a>

  {/* X */}
  <a
    href="#"
    aria-label="X"
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      bg-white/10
      text-xs
      font-bold
      text-white
      transition
      hover:bg-[#6B9F45]
    "
  >
    𝕏
  </a>

</div>
          </div>

         
{/* QUICK LINKS */}
<div>
  <h3 className="text-sm font-bold">Quick Links</h3>

  <div className="mt-5 flex flex-col gap-3">
    <Link to="/" className="text-sm text-white/60 transition hover:text-white">
      Home
    </Link>

    <Link to="/menu" className="text-sm text-white/60 transition hover:text-white">
      Menu
    </Link>

    <Link to="/about" className="text-sm text-white/60 transition hover:text-white">
      About Us
    </Link>

    <Link to="/contact" className="text-sm text-white/60 transition hover:text-white">
      Contact
    </Link>
  </div>
</div>

          
{/* CUSTOMER */}
<div>
  <h3 className="text-sm font-bold">Customer</h3>

  <div className="mt-5 flex flex-col gap-3">
    <Link to="/login" className="text-sm text-white/60 transition hover:text-white">
      Login
    </Link>

    <Link to="/register" className="text-sm text-white/60 transition hover:text-white">
      Create Account
    </Link>

    <Link to="/orders" className="text-sm text-white/60 transition hover:text-white">
      My Orders
    </Link>

    <Link to="/cart" className="text-sm text-white/60 transition hover:text-white">
      Shopping Cart
    </Link>
  </div>
</div>
          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold">Contact Us</h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#8EB96A]" />

                <span className="text-sm text-white/60">Gujarat, India</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-[#8EB96A]" />

                <span className="text-sm text-white/60">+91 00000 00000</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-[#8EB96A]" />

                <span className="break-words text-sm text-white/60">
                  hello@thehealthydiet.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div
          className="
            flex
            w-full
            flex-col
            gap-4
            px-5
            py-5
            text-center

            sm:px-8

            md:flex-row
            md:items-center
            md:justify-between
            md:text-left

            lg:px-12
            xl:px-16
            2xl:px-20
          "
        >
          <p className="text-xs text-white/40">
            © 2026 The Healthy Diet. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40 md:justify-end">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>

            <a href="#" className="transition hover:text-white">
              Refund Policy
            </a>
          </div>

          {/* Back To Top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="
              fixed
              bottom-5
              right-5
              z-40
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#174D32]
              text-white
              shadow-lg
              transition
              hover:bg-[#6B9F45]
            "
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
