const adminService = require("../services/admin.service");

const getStats = async (req, res) => {
  try {
    const stats = await adminService.getAdminStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats"
    });
  }
};

module.exports = {
  getStats
};
