const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await authService.registerUser(name, email, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    const { accessToken, refreshToken, user } = result;

    // 🍪 Set refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        user
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};
const refreshToken = async (req, res) => {
  try {
    const refreshTokenFromCookie = req.cookies.refreshToken;

    const result = await authService.refreshAccessToken(
      refreshTokenFromCookie
    );

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: result
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};


const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: req.user
  });
};

const adminTest = (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin!",
    data: req.user
  });
};

module.exports = {
  register,
  login,
  refreshToken,
  getProfile,
  adminTest
};
