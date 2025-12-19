import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsSticky(window.scrollY > 72);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <nav className={`w-full z-50 transition-all duration-300 bg-white ${isSticky ? "sticky top-0 shadow-md" : "relative"}`}>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          TravelBook
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          
          {/* Public */}
          <Link to="/" className={isActive("/")}>
            Packages
          </Link>

          {/* Guest */}
          {!user && (
            <>
              <Link to="/login" className={isActive("/login")}>
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* User */}
          {user && user.role === "user" && (
            <>
              <Link to="/dashboard" className={isActive("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/my-bookings" className={isActive("/my-bookings")}>
                My Bookings
              </Link>
            </>
          )}

          {/* Admin */}
          {user && user.role === "admin" && (
            <>
              <Link to="/admin" className={isActive("/admin")}>
                Dashboard
              </Link>
              <Link to="/admin/packages/create" className={isActive("/admin/packages/create")}>
                Create Package
              </Link>
              <Link to="/admin/packages" className={isActive("/admin/packages")}>
                Manage Packages
              </Link>
              <Link to="/admin/bookings" className={isActive("/admin/bookings")}>
                Bookings
              </Link>
            </>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-md border text-gray-600 hover:bg-red-100 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
