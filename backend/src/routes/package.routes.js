const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/middleware");
const authorizeRoles = require("../middleware/role.middleware");

const {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getDestinations
} = require("../controllers/package.controller");


// Admin-only: create package
router.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  createPackage
);

router.get("/destinations", getDestinations);
router.get("/", getPackages);
router.get("/:id", getPackageById);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  updatePackage
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  deletePackage
);




module.exports = router;
