const pool = require("../config/db");

const getAdminStats = async () => {
  const [[bookingStats]] = await pool.query(`
    SELECT
      COUNT(*) AS totalBookings,
      SUM(booking_status = 'PENDING') AS pendingBookings,
      SUM(booking_status = 'CONFIRMED') AS confirmedBookings,
      SUM(booking_status = 'CANCELLED') AS cancelledBookings,
      SUM(
        CASE WHEN booking_status = 'CONFIRMED'
        THEN total_amount ELSE 0 END
      ) AS totalRevenue
    FROM bookings
  `);

  const [[packageStats]] = await pool.query(`
    SELECT COUNT(*) AS totalPackages
    FROM packages
    WHERE is_active = true
  `);

  return {
    ...bookingStats,
    totalPackages: packageStats.totalPackages
  };
};

module.exports = {
  getAdminStats
};
