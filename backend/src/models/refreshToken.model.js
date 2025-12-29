const pool = require("../config/db");

class RefreshTokenModel {
  static async create({ userId, token, expiresAt }) {
    return pool.query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES (?, ?, ?)`,
      [userId, token, expiresAt]
    );
  }

  static async findByToken(token) {
    const [rows] = await pool.query(
      `SELECT *
       FROM refresh_tokens
       WHERE token = ?`,
      [token]
    );

    return rows[0];
  }

  static async deleteByToken(token) {
    return pool.query(
      `DELETE FROM refresh_tokens
       WHERE token = ?`,
      [token]
    );
  }

  static async deleteByUserId(userId) {
    return pool.query(
      `DELETE FROM refresh_tokens
       WHERE user_id = ?`,
      [userId]
    );
  }
}

module.exports = RefreshTokenModel;
