const authService = require("../services/auth.service.js");

// Login a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { response} = await authService.loginUser(
      email,
      password
    );
    // Send back the user data and the token
    res.status(200).json({
      success: true,
      data: { response },
    });
  } catch (error) {
    next(error);
  }
};

// Logout a user
const logoutUser = async (req, res, next) => {
  try {
    const result = await authService.logoutUser(req); // Usually handled on the frontend
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
};