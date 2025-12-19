const pool = require("../config/db");

// CREATE BOOKING
const createBooking = async (userId, packageId) => {
  const [packages] = await pool.query(
    "SELECT price FROM packages WHERE id = ? AND is_active = true",
    [packageId]
  );

  if (packages.length === 0) {
    throw new Error("Package not found");
  }

  const price = packages[0].price;

  await pool.query(
    `INSERT INTO bookings (user_id, package_id, total_amount)
     VALUES (?, ?, ?)`,
    [userId, packageId, price]
  );
};

// USER BOOKINGS
const getUserBookings = async (userId) => {
  const [rows] = await pool.query(
    `SELECT b.*, p.title, p.destination
     FROM bookings b
     JOIN packages p ON b.package_id = p.id
     WHERE b.user_id = ?
     ORDER BY b.created_at DESC`,
    [userId]
  );
  return rows;
};

// ADMIN BOOKINGS
const getAllBookings = async () => {
  const [rows] = await pool.query(
    `SELECT b.*, u.name AS user_name, p.title AS package_title
     FROM bookings b
     JOIN users u ON b.user_id = u.id
     JOIN packages p ON b.package_id = p.id
     ORDER BY b.created_at DESC`
  );
  return rows;
};

// CANCEL BOOKING
const cancelBooking = async (bookingId, userId) => {
  const [result] = await pool.query(
    `UPDATE bookings
     SET booking_status = 'CANCELLED'
     WHERE id = ? AND user_id = ? AND booking_status = 'PENDING'`,
    [bookingId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Booking cannot be cancelled");
  }
};

// CONFIRM PAYMENT
const confirmBookingPayment = async (bookingId, userId) => {
  const [result] = await pool.query(
    `UPDATE bookings
     SET booking_status = 'CONFIRMED',
         payment_status = 'PAID'
     WHERE id = ? AND user_id = ? AND booking_status = 'PENDING'`,
    [bookingId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Booking cannot be confirmed");
  }
};

const updateBookingStatus = async (bookingId, status) => {
  const [result] = await pool.query(
    `UPDATE bookings SET booking_status = ? WHERE id = ?`,
    [status, bookingId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Booking not found");
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  confirmBookingPayment,
  updateBookingStatus,
};
