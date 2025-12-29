const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/middleware");
const authorizeRoles = require("../middleware/role.middleware");
const {
  createBookingValidator,
  cancelBookingValidator
} = require("../validators/booking.validator");



const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelMyBooking,
  confirmPayment,
  updateBookingStatus
} = require("../controllers/booking.controller");


// User creates booking
router.post("/", authenticate, createBookingValidator, createBooking);


// User views own bookings
router.get("/me", authenticate, getMyBookings);

// Admin views all bookings
router.get(
  "/all",
  authenticate,
  authorizeRoles("admin"),
  getAllBookings
);

// User cancels booking
router.delete("/:id", authenticate, cancelBookingValidator, cancelMyBooking);


// User confirms booking via payment
router.post("/:id/pay", authenticate, confirmPayment);

router.put(
  "/:id/status",
  authenticate,
  authorizeRoles("admin"),
  updateBookingStatus
);



module.exports = router;
