const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

// Generate JWT Token
exports.generateToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        mobile: user.mobile,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  };