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

// Getting a single user
async function getSingleUser(req, res) {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Creating a new user
async function createUser(req, res) {
  const body = req.body;
  try {
    const user = new UserModel(body);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
};
