const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const packageRoutes = require("./package.routes");
const bookingRoutes = require("./booking.routes");
const adminRoutes = require("./admin.routes");

router.use("/auth", authRoutes);
router.use("/packages", packageRoutes);
router.use("/bookings", bookingRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
