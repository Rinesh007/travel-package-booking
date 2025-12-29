const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const RefreshTokenModel = require("../models/refreshToken.model");
const TokenUtil = require("../utils/token.util");
const {
  refreshTokenExpiry
} = require("../config/env");

class AuthService {
  static async registerUser(name, email, password) {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.createUser({
      name,
      email,
      password: hashedPassword
    });

    return true;
  }

  static async loginUser(email, password) {
    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    // 🔑 Generate tokens
    const accessToken = TokenUtil.generateAccessToken(payload);
    const refreshToken = TokenUtil.generateRefreshToken(payload);

    // 🗓 Calculate refresh token expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    // 💾 Store refresh token in DB
    await RefreshTokenModel.create({
      userId: user.id,
      token: refreshToken,
      expiresAt
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
  static async refreshAccessToken(refreshToken) {
  if (!refreshToken) {
    throw new Error("Refresh token missing");
  }

  // 1️⃣ Verify refresh token signature
  let decoded;
  try {
    decoded = TokenUtil.verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  // 2️⃣ Check token exists in DB
  const storedToken = await RefreshTokenModel.findByToken(refreshToken);
  if (!storedToken) {
    throw new Error("Refresh token not found");
  }

  // 3️⃣ Check expiry from DB
  if (new Date(storedToken.expires_at) < new Date()) {
    await RefreshTokenModel.deleteByToken(refreshToken);
    throw new Error("Refresh token expired");
  }

  // 4️⃣ Generate new access token
  const newAccessToken = TokenUtil.generateAccessToken({
    id: decoded.id,
    email: decoded.email,
    role: decoded.role
  });

  return {
    accessToken: newAccessToken
  };
}

}

module.exports = AuthService;
