require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Base test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
const packageRoutes = require("./routes/package.routes");
app.use("/api/packages", packageRoutes);
const bookingRoutes = require("./routes/booking.routes");
app.use("/api/bookings", bookingRoutes);



// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const deletePackage = async (id) => {
  await pool.query(
    "UPDATE packages SET is_active = false WHERE id = ?",
    [id]
  );
};

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);

