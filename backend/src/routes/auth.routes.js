const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/middleware");
const authorizeRoles = require("../middleware/role.middleware");
const { loginValidator, registerValidator } = require("../validators/auth.validator");



console.log("auth.routes.js loaded");


const {
  register,
  login,
  refreshToken,
  getProfile,
  adminTest
} = require("../controllers/auth.controller");


router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/refresh-token", refreshToken);

router.get("/me", authenticate, getProfile);
router.get(
  "/admin-test",
  authenticate,
  authorizeRoles("admin"),
  adminTest
);



module.exports = router;
