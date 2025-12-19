const authService = require("../services/auth.service");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

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
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const result = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    res.status(401).json({
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
  getProfile,
  adminTest
};

