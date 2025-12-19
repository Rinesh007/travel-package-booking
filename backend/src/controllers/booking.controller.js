const bookingService = require("../services/booking.service");

const createBooking = async (req, res) => {
  try {
    // ❌ Block admins from booking
    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admins cannot book packages"
      });
    }

    const userId = req.user.id;
    const { packageId } = req.body;

    if (!packageId) {
      return res.status(400).json({
        success: false,
        message: "Package ID is required"
      });
    }

    await bookingService.createBooking(userId, packageId);

    res.status(201).json({
      success: true,
      message: "Booking created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await bookingService.getUserBookings(userId);

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings"
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings"
    });
  }
};

const cancelMyBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await bookingService.cancelBooking(id, userId);

    res.json({
      success: true,
      message: "Booking cancelled successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await bookingService.confirmBookingPayment(id, userId);

    res.json({
      success: true,
      message: "Payment successful, booking confirmed"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["CONFIRMED", "CANCELLED"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status"
      });
    }

    await bookingService.updateBookingStatus(id, status);

    res.json({
      success: true,
      message: `Booking ${status.toLowerCase()} successfully`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelMyBooking,
  confirmPayment,
  updateBookingStatus
};

