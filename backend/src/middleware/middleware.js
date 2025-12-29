const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config/env");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing."
      });
    }

    const token = authHeader.split(" ")[1];

    // ✅ VERIFY WITH ACCESS TOKEN SECRET
    const decoded = jwt.verify(token, accessTokenSecret);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = authenticate;
