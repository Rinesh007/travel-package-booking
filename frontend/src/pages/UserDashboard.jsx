import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking.api";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, color, icon }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
);

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
        pending: bookings.filter(
          (b) => b.booking_status === "PENDING"
        ).length,
        confirmed: bookings.filter(
          (b) => b.booking_status === "CONFIRMED"
        ).length,
        cancelled: bookings.filter(
          (b) => b.booking_status === "CANCELLED"
        ).length
      });
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        User Dashboard
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Bookings"
          value={stats.total}
          color="text-blue-600"
          icon="📦"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          color="text-yellow-600"
          icon="⏳"
        />
        <StatCard
          title="Confirmed"
          value={stats.confirmed}
          color="text-green-600"
          icon="✅"
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          color="text-red-600"
          icon="❌"
        />
      </div>

      {/* ACTION */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Manage your bookings
        </h3>
        <p className="text-gray-600 mb-4">
          View details, confirm payments, or cancel your bookings.
        </p>

        <Link
          to="/my-bookings"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
