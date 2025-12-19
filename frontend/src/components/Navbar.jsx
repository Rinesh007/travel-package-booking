import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "16px",
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
        alignItems: "center"
      }}
    >
      {/* Public */}
      <Link to="/">Packages</Link>

      {/* Guest */}
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {/* User */}
      {user && user.role === "user" && (
        <Link to="/my-bookings">My Bookings</Link>
      )}

      {user && user.role === "user" && (
  <>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/my-bookings">My Bookings</Link>
  </>
)}


      {/* Admin */}
      {user && user.role === "admin" && (
        <>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/packages/create">Create Package</Link>
          <Link to="/admin/packages">Manage Packages</Link>
          <Link to="/admin/bookings">All Bookings</Link>
        </>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Logout */}
      {user && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
