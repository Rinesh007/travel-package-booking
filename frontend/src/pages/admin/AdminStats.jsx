import { useEffect, useState } from "react";
import { getAdminStats } from "../../api/admin.api";

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getAdminStats();
      setStats(res.data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h2>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Packages"
          value={stats.totalPackages}
          color="text-blue-600"
        />

        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          color="text-indigo-600"
        />

        <StatCard
          title="Pending Bookings"
          value={stats.pendingBookings}
          color="text-yellow-600"
        />

        <StatCard
          title="Confirmed Bookings"
          value={stats.confirmedBookings}
          color="text-green-600"
        />

        <StatCard
          title="Cancelled Bookings"
          value={stats.cancelledBookings}
          color="text-red-600"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue}`}
          color="text-emerald-600"
        />
      </div>
    </div>
  );
};

export default AdminStats;
