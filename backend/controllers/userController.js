const User = require("../models/User.js");

// Getting all users
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
    getAllUsers,
}