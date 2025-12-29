const AdminModel = require("../models/admin.model");

class AdminService {
  static async getAdminStats() {
    const bookingStats = await AdminModel.getBookingStats();
    const totalPackages = await AdminModel.getActivePackageCount();

    return {
      ...bookingStats,
      totalPackages
    };
  }
}

module.exports = AdminService;
