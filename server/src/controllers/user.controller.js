const userService = require("../services/user.service.js");

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const { response, user } = await userService.createUser(req.body);
    console.info(
      "User id:" + `${user._id}` + " has been registered successfully"
    );
    res.status(201).json({
      success: true,
      data: { response },
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUserById,
};