import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-ui text-2xl tracking-[0.08em] leading-none">
              <span className="text-cream">HOLIDAY</span>
              <span className="text-gold">HOTEL</span>
            </span>
            <p className="mt-3 text-sm text-cream/50">
              Book stays you'll actually want to leave a review about.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-ui text-xs tracking-[0.2em] uppercase text-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-cream/60 hover:text-cream hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  className="text-cream/60 hover:text-cream hover:underline"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/my-hotels"
                  className="text-cream/60 hover:text-cream hover:underline"
                >
                  My Hotels
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-ui text-xs tracking-[0.2em] uppercase text-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-cream/60">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href="mailto:support@holidayhotel.com"
                  className="hover:text-cream hover:underline"
                >
                  support@holidayhotel.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-cream/60">
                <Phone className="h-4 w-4 shrink-0" />
                <a
                  href="tel:+442079460001"
                  className="hover:text-cream hover:underline"
                >
                  +44 20 7946 0001
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-ui text-xs tracking-[0.2em] uppercase text-gold">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <p className="text-cream/60 hover:text-cream hover:underline cursor-pointer">
                  Privacy Policy
                </p>
              </li>
              <li>
                <p className="text-cream/60 hover:text-cream hover:underline cursor-pointer">
                  Terms of Service
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gold/10 pt-6 text-center text-sm text-cream/40">
          © {year} HolidayHotel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
