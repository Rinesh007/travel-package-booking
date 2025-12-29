const pool = require("../config/db");

class PackageModel {
  static async create(data, adminId) {
    const {
      title,
      destination,
      price,
      duration_days,
      description,
      image_url
    } = data;

    return pool.query(
      `INSERT INTO packages
       (title, destination, price, duration_days, description, image_url, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        destination,
        price,
        duration_days,
        description,
        image_url,
        adminId
      ]
    );
  }

  static async findAll({ destination, sort, order }) {
    let sql = `
      SELECT *
      FROM packages
      WHERE is_active = true
    `;
    const values = [];

    if (destination) {
      sql += " AND destination = ?";
      values.push(destination);
    }

    const allowedSortFields = ["price", "duration_days"];
    const sortField = allowedSortFields.includes(sort)
      ? sort
      : "created_at";

    const sortOrder = order === "asc" ? "ASC" : "DESC";

    sql += ` ORDER BY ${sortField} ${sortOrder}`;

    const [rows] = await pool.query(sql, values);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT *
       FROM packages
       WHERE id = ? AND is_active = true`,
      [id]
    );
    return rows[0];
  }

  static async update(id, data) {
    const {
      title,
      destination,
      price,
      duration_days,
      description,
      image_url
    } = data;

    return pool.query(
      `UPDATE packages SET
        title = ?,
        destination = ?,
        price = ?,
        duration_days = ?,
        description = ?,
        image_url = ?
       WHERE id = ?`,
      [
        title,
        destination,
        price,
        duration_days,
        description,
        image_url,
        id
      ]
    );
  }

  static async softDelete(id) {
    return pool.query(
      "UPDATE packages SET is_active = false WHERE id = ?",
      [id]
    );
  }

  static async getAllDestinations() {
    const [rows] = await pool.query(
      `SELECT DISTINCT destination
       FROM packages
       WHERE is_active = true`
    );
    return rows.map(row => row.destination);
  }

  static async getActivePackagePrice(packageId) {
    const [rows] = await pool.query(
      `SELECT price
       FROM packages
       WHERE id = ? AND is_active = true`,
      [packageId]
    );
    return rows[0];
  }
}

module.exports = PackageModel;
