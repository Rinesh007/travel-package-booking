const packageService = require("../services/package.service");

const createPackage = async (req, res) => {
  try {
    const adminId = req.user.id;

    await packageService.createPackage(req.body, adminId);

    res.status(201).json({
      success: true,
      message: "Travel package created successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getPackages = async (req, res) => {
  try {
    const packages = await packageService.getAllPackages(req.query);

    res.json({
      success: true,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch packages"
    });
  }
};



const getPackageById = async (req, res) => {
  try {
    const pkg = await packageService.getPackageById(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.json({
      success: true,
      data: pkg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch package"
    });
  }
};



const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    await packageService.updatePackage(id, req.body);

    res.json({
      success: true,
      message: "Package updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getDestinations = async (req, res) => {
  try {
    const destinations = await packageService.getAllDestinations();
    res.json({
      success: true,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch destinations"
    });
  }
};


const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    await packageService.deletePackage(id);

    res.json({
      success: true,
      message: "Package removed successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};



module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getDestinations
};

