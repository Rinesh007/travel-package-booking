const BookingModel = require("../models/booking.model");
const PackageModel = require("../models/package.model");

class BookingService {
  static async createBooking(userId, packageId) {
    const packageData = await PackageModel.getActivePackagePrice(packageId);

    if (!packageData) {
      throw new Error("Package not found");
    }

    await BookingModel.create({
      userId,
      packageId,
      totalAmount: packageData.price
    });
  }

  static async getUserBookings(userId) {
    return BookingModel.findByUser(userId);
  }

  static async getAllBookings() {
    return BookingModel.findAll();
  }

  static async cancelBooking(bookingId, userId) {
    const affectedRows = await BookingModel.updateStatusByUser(
      bookingId,
      userId,
      "CANCELLED"
    );

    if (affectedRows === 0) {
      throw new Error("Booking cannot be cancelled");
    }
  }

  static async confirmBookingPayment(bookingId, userId) {
    const affectedRows = await BookingModel.confirmPayment(
      bookingId,
      userId
    );

    if (affectedRows === 0) {
      throw new Error("Booking cannot be confirmed");
    }
  }

  static async updateBookingStatus(bookingId, status) {
    const affectedRows = await BookingModel.updateStatus(bookingId, status);

    if (affectedRows === 0) {
      throw new Error("Booking not found");
    }
  }
}

module.exports = BookingService;
