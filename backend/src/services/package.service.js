const pool = require("../config/db");

const createPackage = async (data, adminId) => {
  const {
    title,
    destination,
    description,
    price,
    duration_days
  } = data;

  await pool.query(
    `INSERT INTO packages 
     (title, destination, description, price, duration_days, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, destination, description, price, duration_days, adminId]
  );

  return true;
};

const getAllDestinations = async () => {
  const [rows] = await pool.query(`
    SELECT DISTINCT destination
    FROM packages
    WHERE is_active = true
  `);

  return rows.map(row => row.destination);
};


const getAllPackages = async (query) => {
  let sql = `
    SELECT *
    FROM packages
    WHERE is_active = true
  `;
  const values = [];

  // FILTER by destination
  if (query.destination) {
    sql += " AND destination = ?";
    values.push(query.destination);
  }

  // SORTING
  const allowedSortFields = ["price", "duration_days"];
  const sortField = allowedSortFields.includes(query.sort)
    ? query.sort
    : "created_at";

  const sortOrder = query.order === "asc" ? "ASC" : "DESC";

  sql += ` ORDER BY ${sortField} ${sortOrder}`;

  const [rows] = await pool.query(sql, values);
  return rows;
};

module.exports = {
  getAllPackages
};

const getPackageById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM packages WHERE id = ? AND is_active = true",
    [id]
  );

  if (rows.length === 0) {
    throw new Error("Package not found");
  }

  return rows[0];
};

const updatePackage = async (id, data) => {
  const {
    title,
    destination,
    description,
    price,
    duration_days,
    is_active
  } = data;

  await pool.query(
    `UPDATE packages 
     SET title=?, destination=?, description=?, price=?, duration_days=?, is_active=?
     WHERE id=?`,
    [title, destination, description, price, duration_days, is_active, id]
  );

  return true;
};

const deletePackage = async (id) => {
  await pool.query(
    "UPDATE packages SET is_active = false WHERE id = ?",
    [id]
  );
};




module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getAllDestinations
};
