const UserModel = require("../models/User.js");

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

// Updating a user
async function updateUser(req, res) {
  const { id } = req.params;
  const body = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(id, body);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error, message: "Failed to find and update a user" });
  }
}

// Deleting a user
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await UserModel.deleteOne(user);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error(error); // log the error on the server-side
    res.status(500).send({ message: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
