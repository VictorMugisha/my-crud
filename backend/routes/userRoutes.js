const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/create", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
