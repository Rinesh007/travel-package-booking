import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking.api";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0
  });

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await getMyBookings();
      const bookings = res.data;

      setStats({
        total: bookings.length,
        pending: bookings.filter(b => b.booking_status === "PENDING").length,
        confirmed: bookings.filter(b => b.booking_status === "CONFIRMED").length,
        cancelled: bookings.filter(b => b.booking_status === "CANCELLED").length
      });
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>

      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <div>📦 Total Bookings: {stats.total}</div>
        <div>⏳ Pending: {stats.pending}</div>
        <div>✅ Confirmed: {stats.confirmed}</div>
        <div>❌ Cancelled: {stats.cancelled}</div>
      </div>

      <Link to="/my-bookings">View My Bookings</Link>
    </div>
  );
};

export default UserDashboard;
