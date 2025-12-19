const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/middleware");
const authorizeRoles = require("../middleware/role.middleware");

console.log("auth.routes.js loaded");


const { register, login, getProfile, adminTest} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getProfile);
router.get(
  "/admin-test",
  authenticate,
  authorizeRoles("admin"),
  adminTest
);



module.exports = router;
