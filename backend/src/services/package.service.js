const PackageModel = require("../models/package.model");

class PackageService {
  static async createPackage(data, adminId) {
    await PackageModel.create(data, adminId);
  }

  static async getAllPackages(query) {
    return PackageModel.findAll(query);
  }

  static async getPackageById(id) {
    const pkg = await PackageModel.findById(id);

    if (!pkg) {
      throw new Error("Package not found");
    }

    return pkg;
  }

  static async updatePackage(id, data) {
    await PackageModel.update(id, data);
  }

  static async deletePackage(id) {
    await PackageModel.softDelete(id);
  }

  static async getAllDestinations() {
    return PackageModel.getAllDestinations();
  }
}

module.exports = PackageService;
