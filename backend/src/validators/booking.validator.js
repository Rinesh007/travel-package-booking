const { body, param, validationResult } = require("express-validator");

const createBookingValidator = [
  body("packageId")
    .notEmpty()
    .withMessage("Package ID is required")
    .isInt({ gt: 0 })
    .withMessage("Package ID must be a valid number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(err => err.msg)
      });
    }
    next();
  }
];
const cancelBookingValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Booking ID must be a valid number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(err => err.msg)
      });
    }
    next();
  }
];


module.exports = {
  createBookingValidator,
  cancelBookingValidator
};
