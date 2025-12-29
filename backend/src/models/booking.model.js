const pool = require("../config/db");

class BookingModel {
  static async create({ userId, packageId, totalAmount }) {
    return pool.query(
      `INSERT INTO bookings (user_id, package_id, total_amount)
       VALUES (?, ?, ?)`,
      [userId, packageId, totalAmount]
    );
  }

  static async findByUser(userId) {
    const [rows] = await pool.query(
      `SELECT b.*, p.title, p.destination
       FROM bookings b
       JOIN packages p ON b.package_id = p.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    );
    return rows;
  }

  static async findAll() {
    const [rows] = await pool.query(
      `SELECT b.*, u.name AS user_name, p.title AS package_title
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN packages p ON b.package_id = p.id
       ORDER BY b.created_at DESC`
    );
    return rows;
  }

  static async updateStatusByUser(bookingId, userId, status) {
    const [result] = await pool.query(
      `UPDATE bookings
       SET booking_status = ?
       WHERE id = ? AND user_id = ? AND booking_status = 'PENDING'`,
      [status, bookingId, userId]
    );
    return result.affectedRows;
  }

  static async confirmPayment(bookingId, userId) {
    const [result] = await pool.query(
      `UPDATE bookings
       SET booking_status = 'CONFIRMED',
           payment_status = 'PAID'
       WHERE id = ? AND user_id = ? AND booking_status = 'PENDING'`,
      [bookingId, userId]
    );
    return result.affectedRows;
  }

  static async updateStatus(bookingId, status) {
    const [result] = await pool.query(
      `UPDATE bookings
       SET booking_status = ?
       WHERE id = ?`,
      [status, bookingId]
    );
    return result.affectedRows;
  }
}

module.exports = BookingModel;
