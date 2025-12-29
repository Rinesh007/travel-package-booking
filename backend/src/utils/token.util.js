const jwt = require("jsonwebtoken");
const {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiry,
  refreshTokenExpiry
} = require("../config/env");

class TokenUtil {
  static generateAccessToken(payload) {
    return jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenExpiry
    });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenExpiry
    });
  }

  static verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
  }
}

module.exports = TokenUtil;
