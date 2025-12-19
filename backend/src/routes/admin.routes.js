const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/middleware");
const authorizeRoles = require("../middleware/role.middleware");
const { getStats } = require("../controllers/admin.controller");

router.get(
  "/stats",
  authenticate,
  authorizeRoles("admin"),
  getStats
);

module.exports = router;
