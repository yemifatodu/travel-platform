import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-ink-mid py-6 border-b border-gold/20">
      <div className="container mx-auto flex justify-between items-center px-4">
        <span className="font-ui text-2xl tracking-[0.08em] leading-none">
          <Link
            to="/"
            className="transition-opacity hover:opacity-90"
          >
            <span className="text-cream">HOLIDAY</span>
            <span className="text-gold">HOTEL</span>
          </Link>
        </span>
        <span className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <Link className="nav-link px-3 py-2" to="/my-bookings">
                My Bookings
              </Link>
              <Link className="nav-link px-3 py-2" to="/my-hotels">
                My Hotels
              </Link>
              <span className="ml-2">
                <SignOutButton />
              </span>
            </>
          ) : (
            <Link to="/sign-in" className="btn-solid">
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;