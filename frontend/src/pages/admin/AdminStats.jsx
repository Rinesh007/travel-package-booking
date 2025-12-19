import { useEffect, useState } from "react";
import { getAdminStats } from "../../api/admin.api";

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

  if (loading) return <p>Loading stats...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <ul>
        <li>Total Packages: {stats.totalPackages}</li>
        <li>Total Bookings: {stats.totalBookings}</li>
        <li>Pending Bookings: {stats.pendingBookings}</li>
        <li>Confirmed Bookings: {stats.confirmedBookings}</li>
        <li>Cancelled Bookings: {stats.cancelledBookings}</li>
        <li>Total Revenue: ₹{stats.totalRevenue}</li>
      </ul>
    </div>
  );
};

export default AdminStats;
